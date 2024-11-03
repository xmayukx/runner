import { postContentToWebHook } from "@/app/(main)/(pages)/connections/_actions/discord-connection";
import { onCreateNewPageInDatabase } from "@/app/(main)/(pages)/connections/_actions/notion-connection";
import { postMessageToSlack } from "@/app/(main)/(pages)/connections/_actions/slack-connection";
import { db } from "@/lib/db";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("🔴 POST request received.");

    const headersList = headers();
    let channelResourceId;

    // Extract x-goog-resource-id from headers
    headersList.forEach((value, key) => {
      if (key === "x-goog-resource-id") {
        channelResourceId = value;
      }
    });

    if (!channelResourceId) {
      console.warn("⚠️ No Google Resource ID found in headers.");
      return Response.json({ message: "No resource ID" }, { status: 400 });
    }

    console.log(`🟢 Channel Resource ID found: ${channelResourceId}`);

    const user = await db.user.findFirst({
      where: { googleResourceId: channelResourceId },
      select: { clerkId: true, credits: true },
    });

    if (!user) {
      console.warn(
        `⚠️ No user found with Google Resource ID: ${channelResourceId}`,
      );
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    if (parseInt(user.credits!) <= 0 && user.credits !== "Unlimited") {
      console.warn("⚠️ User does not have sufficient credits.");
      return Response.json(
        { message: "Insufficient credits" },
        { status: 403 },
      );
    }

    console.log(`🟢 User found: ${user.clerkId}, Credits: ${user.credits}`);

    const workflows = await db.workflows.findMany({
      where: { userId: user.clerkId },
    });

    if (!workflows.length) {
      console.warn("⚠️ No workflows found for user.");
      return Response.json({ message: "No workflows" }, { status: 404 });
    }

    for (const flow of workflows) {
      let flowPath = JSON.parse(flow.flowPath!);
      let current = 0;

      console.log(
        `🔵 Starting workflow ID: ${flow.id} for user: ${user.clerkId}`,
      );
      console.log(`🔵 Workflow steps: ${flowPath}`);
      while (current < flowPath.length) {
        try {
          const step = flowPath[current];
          console.log(`🔄 Processing ${step} for workflow ID: ${flow.id}`);

          if (step === "Discord") {
            const discordMessage = await db.discordWebhook.findFirst({
              where: { userId: flow.userId },
              select: { url: true },
            });
            if (discordMessage) {
              await postContentToWebHook(
                flow.discordTemplate!,
                discordMessage.url,
              );
              console.log("✅ Message sent to Discord");
            } else {
              console.warn("⚠️ Discord webhook URL not found for user.");
            }
          }

          if (step === "Slack") {
            const channels = flow.slackChannels.map((channel) => ({
              label: "",
              value: channel,
            }));
            await postMessageToSlack(
              flow.slackAccessToken!,
              channels,
              flow.slackTemplate!,
            );
            console.log("✅ Message sent to Slack");
          }

          if (step === "Notion") {
            await onCreateNewPageInDatabase(
              flow.notionDbId!,
              flow.notionAccessToken!,
              JSON.parse(flow.notionTemplate!),
            );
            console.log("✅ Page created in Notion");
          }

          if (step === "Wait") {
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
              console.log("✅ Wait step scheduled with cron job.");
              await db.workflows.update({
                where: { id: flow.id },
                data: { cronPath: JSON.stringify(flowPath) },
              });
              break;
            }
          }
        } catch (error) {
          console.error(
            `❌ Error processing step ${flowPath[current]} in workflow ID: ${flow.id}`,
            error,
          );
        }
        current++;
      }

      try {
        await db.user.update({
          where: { clerkId: user.clerkId },
          data: { credits: `${parseInt(user.credits!) - 1}` },
        });
        console.log("🟢 User credits updated successfully.");
      } catch (error) {
        console.error("❌ Error updating user credits.", error);
      }
    }

    return Response.json({ message: "Flow completed" }, { status: 200 });
  } catch (error) {
    console.error("❌ Unexpected error in POST handler", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
