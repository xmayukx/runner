import { postContentToWebHook } from "@/app/(main)/(pages)/connections/_actions/discord-connection";
import { onCreateNewPageInDatabase } from "@/app/(main)/(pages)/connections/_actions/notion-connection";
import { postMessageToSlack } from "@/app/(main)/(pages)/connections/_actions/slack-connection";
import { db } from "@/lib/db";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("🔴 [POST] Incoming request received");

  try {
    // Extract headers
    const headersList = headers();
    let channelResourceId: string | undefined;

    headersList.forEach((value, key) => {
      if (key.toLowerCase() === "x-goog-resource-id") {
        channelResourceId = value;
      }
    });

    if (!channelResourceId) {
      console.log("⚠️ [POST] 'x-goog-resource-id' header not found");
      return NextResponse.json(
        { message: "Missing 'x-goog-resource-id' header" },
        { status: 400 },
      );
    }

    console.log(`🔍 [POST] Found channelResourceId: ${channelResourceId}`);

    // Fetch user from the database
    let user;
    try {
      user = await db.user.findFirst({
        where: {
          googleResourceId: channelResourceId,
        },
        select: { clerkId: true, credits: true },
      });
      if (!user) {
        console.log(
          `⚠️ [POST] No user found with googleResourceId: ${channelResourceId}`,
        );
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
        );
      }
      console.log(
        `✅ [POST] User found: ${user.clerkId}, Credits: ${user.credits}`,
      );
    } catch (error) {
      console.error("❌ [POST] Error fetching user:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );
    }

    // Check if the user has sufficient credits
    const hasCredits =
      (user.credits && parseInt(user.credits) > 0) ||
      user.credits === "Unlimited";
    if (!hasCredits) {
      console.log(`⚠️ [POST] User ${user.clerkId} has insufficient credits`);
      return NextResponse.json(
        { message: "Insufficient credits" },
        { status: 403 },
      );
    }

    // Fetch workflows associated with the user
    let workflows;
    try {
      workflows = await db.workflows.findMany({
        where: {
          userId: user.clerkId,
        },
      });
      if (!workflows || workflows.length === 0) {
        console.log(`⚠️ [POST] No workflows found for user ${user.clerkId}`);
        return NextResponse.json(
          { message: "No workflows found" },
          { status: 404 },
        );
      }
      console.log(
        `✅ [POST] Found ${workflows.length} workflows for user ${user.clerkId}`,
      );
    } catch (error) {
      console.error("❌ [POST] Error fetching workflows:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );
    }

    // Process each workflow sequentially
    for (const flow of workflows) {
      console.log(`🔄 [Workflow] Processing workflow ID: ${flow.id}`);

      try {
        const flowPath: string[] = JSON.parse(flow.flowPath!);
        let current = 0;

        while (current < flowPath.length) {
          const step = flowPath[current];
          console.log(`➡️ [Workflow ${flow.id}] Current step: ${step}`);

          switch (step) {
            case "Discord":
              try {
                const discordWebhook = await db.discordWebhook.findFirst({
                  where: {
                    userId: flow.userId,
                  },
                  select: { url: true },
                });

                if (!discordWebhook) {
                  console.log(
                    `⚠️ [Workflow ${flow.id}] Discord webhook not found for user ${flow.userId}`,
                  );
                  break;
                }

                await postContentToWebHook(
                  flow.discordTemplate!,
                  discordWebhook.url,
                );
                console.log(
                  `✅ [Workflow ${flow.id}] Posted content to Discord webhook`,
                );
                flowPath.splice(current, 1); // Remove current step
              } catch (error) {
                console.error(
                  `❌ [Workflow ${flow.id}] Error posting to Discord:`,
                  error,
                );
                // Optionally, decide whether to continue or abort
                // For now, continue to next step
              }
              break;

            case "Slack":
              try {
                const channels = flow.slackChannels.map((channel) => ({
                  label: "",
                  value: channel,
                }));

                await postMessageToSlack(
                  flow.slackAccessToken!,
                  channels,
                  flow.slackTemplate!,
                );
                console.log(
                  `✅ [Workflow ${flow.id}] Posted message to Slack channels`,
                );
                flowPath.splice(current, 1); // Remove current step
              } catch (error) {
                console.error(
                  `❌ [Workflow ${flow.id}] Error posting to Slack:`,
                  error,
                );
              }
              break;

            case "Notion":
              try {
                await onCreateNewPageInDatabase(
                  flow.notionDbId!,
                  flow.notionAccessToken!,
                  JSON.parse(flow.notionTemplate!),
                );
                console.log(
                  `✅ [Workflow ${flow.id}] Created new page in Notion database`,
                );
                flowPath.splice(current, 1); // Remove current step
              } catch (error) {
                console.error(
                  `❌ [Workflow ${flow.id}] Error creating Notion page:`,
                  error,
                );
              }
              break;

            case "Wait":
              try {
                const cronJobData = {
                  job: {
                    url: `${process.env.NGROK_URI}?flow_id=${flow.id}`,
                    enabled: "true",
                    schedule: {
                      timezone: "Asia/Kolkata",
                      expiresAt: 0,
                      hours: [-1],
                      mdays: [-1],
                      minutes: ["*****"],
                      months: [-1],
                      wdays: [-1],
                    },
                  },
                };

                const res = await axios.put(
                  "https://api.cron-job.org/jobs",
                  cronJobData,
                  {
                    headers: {
                      Authorization: `Bearer ${process.env.CRON_JOB_KEY!}`,
                      "Content-Type": "application/json",
                    },
                  },
                );

                if (res.status === 200 || res.status === 201) {
                  console.log(
                    `✅ [Workflow ${flow.id}] Scheduled cron job successfully`,
                  );
                  flowPath.splice(current, 1); // Remove current step

                  // Update the workflow's cronPath
                  await db.workflows.update({
                    where: {
                      id: flow.id,
                    },
                    data: {
                      cronPath: JSON.stringify(flowPath),
                    },
                  });
                  console.log(
                    `📝 [Workflow ${flow.id}] Updated cronPath in database`,
                  );
                  break; // Exit the while loop after scheduling
                } else {
                  console.error(
                    `❌ [Workflow ${flow.id}] Failed to schedule cron job, status: ${res.status}`,
                  );
                }
              } catch (error) {
                console.error(
                  `❌ [Workflow ${flow.id}] Error scheduling cron job:`,
                  error,
                );
              }
              break;

            default:
              console.log(`ℹ️ [Workflow ${flow.id}] Unknown step: ${step}`);
              flowPath.splice(current, 1); // Remove unknown step
              break;
          }

          current++;
        }

        // After processing all steps, update the workflow's flowPath
        try {
          await db.workflows.update({
            where: { id: flow.id },
            data: { flowPath: JSON.stringify(flowPath) },
          });
          console.log(`🗂️ [Workflow ${flow.id}] Updated flowPath in database`);
        } catch (error) {
          console.error(
            `❌ [Workflow ${flow.id}] Error updating flowPath:`,
            error,
          );
        }
      } catch (error) {
        console.error(
          `❌ [Workflow ${flow.id}] Error processing workflow:`,
          error,
        );
      }

      // Deduct user credits if not unlimited
      if (user.credits !== "Unlimited") {
        try {
          const newCredits = parseInt(user.credits!) - 1;
          await db.user.update({
            where: { clerkId: user.clerkId },
            data: { credits: `${newCredits}` },
          });
          console.log(
            `💳 [User ${user.clerkId}] Deducted 1 credit, new credits: ${newCredits}`,
          );
        } catch (error) {
          console.error(
            `❌ [User ${user.clerkId}] Error deducting credits:`,
            error,
          );
        }
      } else {
        console.log(
          `🔓 [User ${user.clerkId}] Unlimited credits, no deduction needed`,
        );
      }
    }

    return NextResponse.json(
      { message: "Flow(s) completed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ [POST] Unexpected error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
