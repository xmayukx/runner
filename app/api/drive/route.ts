import { google } from "googleapis";
import { auth, getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("🔴 GET request received");

  // Initialize Clerk client
  const ctx = clerkClient();

  // Set up OAuth2 client for Google APIs
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI,
  );

  // Authenticate the user with Clerk
  const { userId, sessionId, sessionClaims } = await auth();
  if (!userId) {
    console.error("❌ User not found");
    return NextResponse.json({ message: "User not found" });
  }
  console.log(`✅ Authenticated user ID: ${userId}`);

  try {
    // Get OAuth access token from Clerk for Google integration
    console.log("🔑 Retrieving OAuth access token from Clerk...");
    const clerkResponse = await (
      await ctx
    ).users.getUserOauthAccessToken(userId, "oauth_google");

    const accessToken = clerkResponse.data[0].token;
    console.log("🔑 Access token:", accessToken);
    if (!accessToken) {
      console.error("❌ No access token found for user");
      return NextResponse.json({ message: "Access token not found" });
    }
    console.log("✅ Successfully retrieved access token from Clerk");
    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    // Initialize Google Drive client
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // List files in Google Drive
    console.log("📄 Fetching files from Google Drive...");
    const response = await drive.files.list();

    if (response?.data?.files && response.data.files.length > 0) {
      console.log("✅ Files successfully retrieved");
      return NextResponse.json(
        {
          message: response.data,
        },
        {
          status: 200,
        },
      );
    } else {
      console.warn("⚠️ No files found in Google Drive");
      return NextResponse.json(
        {
          message: "No files found",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("🔥 An error occurred:", error);
      return NextResponse.json(
        {
          message: "Something went wrong",
          error: error.message,
        },
        { status: 500 },
      );
    }
  }
}
