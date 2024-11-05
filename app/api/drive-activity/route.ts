import { google } from "googleapis";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("🚀 Starting GET request to set up Google Drive folder watch...");

  // Authenticate the user with Clerk
  const { userId } = await auth();
  if (!userId) {
    console.error("❌ User not found");
    return NextResponse.json({ message: "User not found" });
  }

  try {
    const ctx = clerkClient();

    // Retrieve the user's Google OAuth access token from Clerk
    console.log("🔑 Retrieving OAuth access token from Clerk...");
    const clerkResponse = await (
      await ctx
    ).users.getUserOauthAccessToken(userId, "oauth_google");
    const accessToken = clerkResponse?.data?.[0]?.token;

    if (!accessToken) {
      console.error("❌ No access token found for user");
      return NextResponse.json({ message: "Access token not found" });
    }

    // Initialize Google OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.OAUTH2_REDIRECT_URI,
    );
    oauth2Client.setCredentials({ access_token: accessToken });

    // Initialize Google Drive client
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // Generate a unique channel ID and get the start page token
    const channelId = uuidv4();
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID; // Set your specific folder ID in environment variables

    console.log("📄 Retrieving start page token...");
    const startPageTokenRes = await drive.changes.getStartPageToken({});
    const startPageToken = startPageTokenRes?.data?.startPageToken;

    if (!startPageToken) throw new Error("startPageToken is unexpectedly null");

    // Set up a change listener for the specific folder
    console.log("👂 Setting up change listener...");
    const listener = await drive.changes.watch({
      pageToken: startPageToken,
      requestBody: {
        id: channelId,
        type: "web_hook",
        address: `${process.env.NGROK_URI}/api/drive-activity/notification`,
      },
    });

    if (listener.status === 200) {
      // Store the listener's resource ID in the database
      await db.user.updateMany({
        where: { clerkId: userId },
        data: { googleResourceId: listener.data.resourceId },
      });
      console.log("✅ Successfully set up folder change listener");
      return new NextResponse("Listening to changes in specified folder...");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("🔥 Error occurred:", error);
      return NextResponse.json({ message: "Error: " + error.message });
    }
  }

  return new NextResponse("Oops! Something went wrong, try again.");
}
