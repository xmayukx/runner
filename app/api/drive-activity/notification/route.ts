import { postContentToWebHook } from "@/app/(main)/(pages)/connections/_actions/discord-connection";
import { onCreateNewPageInDatabase } from "@/app/(main)/(pages)/connections/_actions/notion-connection";
import { postMessageToSlack } from "@/app/(main)/(pages)/connections/_actions/slack-connection";
import { db } from "@/lib/db";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("🔴 Received change notification");
  const headersList = headers();
  let channelResourceId;
  headersList.forEach((value, key) => {
    if (key === "x-goog-resource-id") {
      channelResourceId = value;
    }
  });

  // Verify if the change corresponds to our folder listener
  if (channelResourceId) {
    const user = await db.user.findFirst({
      where: { googleResourceId: channelResourceId },
      select: { clerkId: true, credits: true },
    });

    // Check for a valid user and sufficient credits
    if (
      user &&
      (parseInt(user.credits || "0") > 0 || user.credits === "Unlimited")
    ) {
      const workflows = await db.workflows.findMany({
        where: { userId: user.clerkId },
      });

      if (workflows) {
        await Promise.all(
          workflows.map(async (flow) => {
            const flowPath = JSON.parse(flow.flowPath || "[]");

            // Iterate through each workflow step
            for (let current = 0; current < flowPath.length; current++) {
              switch (flowPath[current]) {
                case "Discord":
                  const discordMessage = await db.discordWebhook.findFirst({
                    where: { userId: flow.userId },
                    select: { url: true },
                  });
                  if (discordMessage) {
                    await postContentToWebHook(
                      flow.discordTemplate!,
                      discordMessage.url,
                    );
                  }
                  flowPath.splice(current, 1);
                  break;

                case "Slack":
                  const channels = flow.slackChannels.map((channel) => ({
                    label: "",
                    value: channel,
                  }));
                  await postMessageToSlack(
                    flow.slackAccessToken!,
                    channels,
                    flow.slackTemplate!,
                  );
                  flowPath.splice(current, 1);
                  break;

                case "Notion":
                  await onCreateNewPageInDatabase(
                    flow.notionDbId!,
                    flow.notionAccessToken!,
                    JSON.parse(flow.notionTemplate!),
                  );
                  flowPath.splice(current, 1);
                  break;

                case "Wait":
                  const res = await axios.put(
                    "https://api.cron-job.org/jobs",
                    {
                      job: {
                        url: `${process.env.NGROK_URI}?flow_id=${flow.id}`,
                        enabled: "true",
                        schedule: {
                          timezone: "Europe/Istanbul",
                          expiresAt: 0,
                          hours: [-1],
                          mdays: [-1],
                          minutes: ["*****"],
                          months: [-1],
                          wdays: [-1],
                        },
                      },
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${process.env.CRON_JOB_KEY!}`,
                        "Content-Type": "application/json",
                      },
                    },
                  );

                  if (res) {
                    flowPath.splice(current, 1);
                    await db.workflows.update({
                      where: { id: flow.id },
                      data: { cronPath: JSON.stringify(flowPath) },
                    });
                    break;
                  }
                  break;

                default:
                  break;
              }
            }

            await db.user.update({
              where: { clerkId: user.clerkId },
              data: { credits: `${parseInt(user.credits!) - 1}` },
            });
          }),
        );
        return Response.json({ message: "Flow completed" }, { status: 200 });
      }
    }
  }
  return Response.json({ message: "Success" }, { status: 200 });
}
