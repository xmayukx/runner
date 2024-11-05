"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";

export const getFileMetaData = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI,
  );

  const { userId } = await auth();

  if (!userId) {
    return { message: "User not found" };
  }

  const clerkResponse = (await clerkClient()).users.getUserOauthAccessToken(
    userId,
    "oauth_google",
  );

  const accessToken = (await clerkResponse).data[0].token;

  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const response = await drive.files.list();

  if (response) {
    return response.data;
  }
};

async function fetchAllFoldersInMyDrive(oauth2Client: any) {
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const folders = [];
  let pageToken: string | null | undefined = null;

  try {
    do {
      // Fetch folders in the root "My Drive" with pagination
      const res: any = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and 'root' in parents",
        fields: "nextPageToken, files(id, name)",
        spaces: "drive",
        pageToken: pageToken || undefined,
      });

      if (res.data.files) {
        folders.push(...res.data.files);
      }
      pageToken = res.data.nextPageToken;
    } while (pageToken);

    return folders;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw new Error("Failed to retrieve folders.");
  }
}
