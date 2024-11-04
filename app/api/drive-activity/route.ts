import { google } from "googleapis";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export async function GET() {
  console.log("🚀 Starting GET request...");

  // Initialize Clerk client
  const ctx = clerkClient();

  // Set up OAuth2 client for Google APIs
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI,
  );

  // Authenticate the user with Clerk
  const { userId } = auth();
  if (!userId) {
    console.error("❌ User not found");
    return NextResponse.json({ message: "User not found" });
  }
  console.log(`✅ Authenticated user ID: ${userId}`);

  try {
    // Get OAuth access token from Clerk for Google integration
    console.log("🔑 Retrieving OAuth access token from Clerk...");
    const clerkResponse = await ctx.users.getUserOauthAccessToken(
      userId,
      "oauth_google",
    );
    const accessToken = clerkResponse?.data?.[0]?.token;

    if (!accessToken) {
      console.error("❌ No access token found for user");
      return NextResponse.json({ message: "Access token not found" });
    }

    console.log("✅ Successfully retrieved access token from Clerk");
    oauth2Client.setCredentials({ access_token: accessToken });

    // Initialize Google Drive client
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // Generate a unique channel ID
    const channelId = uuidv4();
    console.log(`🔗 Generated channel ID: ${channelId}`);

    // Retrieve the start page token for Google Drive changes
    console.log("📄 Retrieving start page token...");
    const startPageTokenRes = await drive.changes.getStartPageToken({});
    const startPageToken = startPageTokenRes?.data?.startPageToken;

    if (!startPageToken) {
      throw new Error("startPageToken is unexpectedly null");
    }

    console.log(`✅ Retrieved start page token: ${startPageToken}`);

    // Create a watch request to listen for changes on Google Drive
    console.log("👂 Setting up change listener...");
    const listener = await drive.changes.watch({
      pageToken: startPageToken,
      supportsAllDrives: true,
      supportsTeamDrives: true,
      requestBody: {
        id: channelId,
        type: "web_hook",
        address: `${process.env.NGROK_URI}/api/drive-activity/notification`,
        kind: "api#channel",
      },
    });

    if (listener.status === 200) {
      console.log("🎉 Successfully created change listener");

      // Store the listener's resource ID in the database
      console.log("💾 Storing channel ID in the database...");
      const channelStored = await db.user.updateMany({
        where: { clerkId: userId },
        data: { googleResourceId: listener.data.resourceId },
      });

      if (channelStored) {
        console.log("✅ Successfully stored channel ID in the database");
        return new NextResponse("Listening to changes...");
      } else {
        console.error("❌ Failed to store channel ID in the database");
      }
    } else {
      console.error(
        "❌ Listener creation failed with status:",
        listener.status,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("🔥 An error occurred:", error.message);
      return NextResponse.json({ message: "Error: " + error.message });
    }

    console.error("🔥 An unknown error occurred: ", error);
  }

  console.log("⚠️ Request completed with an error");
  return new NextResponse("Oops! something went wrong, try again");
}
