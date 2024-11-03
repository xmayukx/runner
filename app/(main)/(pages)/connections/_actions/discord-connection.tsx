"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export const onDiscordConnect = async (
  channel_id: string,
  webhook_id: string,
  webhook_name: string,
  webhook_url: string,
  id: string,
  guild_name: string,
  guild_id: string,
) => {
  if (webhook_id) {
    // Check if a webhook with the same channelId exists
    const existingWebhook = await db.discordWebhook.findUnique({
      where: {
        channelId: channel_id,
      },
    });

    if (!existingWebhook) {
      // Proceed with creating a new webhook since no duplicate exists
      await db.discordWebhook.create({
        data: {
          userId: id,
          webhookId: webhook_id,
          channelId: channel_id,
          guildId: guild_id,
          name: webhook_name,
          url: webhook_url,
          guildName: guild_name,
          connections: {
            create: {
              userId: id,
              type: "Discord",
            },
          },
        },
      });
    } else {
      console.log(`Webhook with channelId ${channel_id} already exists.`);
      // Optionally handle the case where the webhook already exists (e.g., update or log it)
    }
  }
};

export const getDiscordConnectionUrl = async () => {
  const user = await currentUser();
  if (user) {
    const webhook = await db.discordWebhook.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        url: true,
        name: true,
        guildName: true,
      },
    });

    return webhook;
  }
};

export const postContentToWebHook = async (content: string, url: string) => {
  console.log(content);
  if (content != "") {
    const posted = await axios.post(url, { content });
    if (posted) {
      return { message: "success" };
    }
    return { message: "failed request" };
  }
  return { message: "String empty" };
};
