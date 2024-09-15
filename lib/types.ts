import { ConnectionProviderProps } from "@/providers/connection-provider";
import { EditorNode } from "@/providers/editor-provider";
import { z } from "zod";

export const EditUserProfileSchema = z.object({
  email: z.string().email("Required"),
  name: z.string().min(3, "Required"),
});

export const WorkflowSchema = z.object({
  name: z.string().min(2, "Required"),
  description: z.string().min(3, "Required"),
});

export const UserSchema = z.object({
  id: z.number(),
  clerkId: z.string(),
  name: z.string().nullable().optional(), // Allowing null for the `name` field
  email: z.string().email(),
  profileImage: z.string().nullable().optional(), // Allowing null for the `profileImage` field
  tier: z.string().nullable().optional().default("Free"), // Allowing null for the `tier` field
  credits: z.string().nullable().optional().default("10"), // Allowing null for the `credits` field
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  localGoogleId: z.string().nullable().optional(), // Allowing null for the `localGoogleId` field
  googleResourceId: z.string().nullable().optional(), // Allowing null for the `googleResourceId` field
});

// Allow `null` for the User type:

export type User = z.infer<typeof UserSchema>;

export const LocalGoogleCredentialSchema = z.object({
  id: z.string().optional(),
  accessToken: z.string(),
  folderId: z.string().nullable().optional(),
  pageToken: z.string().nullable().optional(),
  channelId: z.string().optional(),
  subscribed: z.boolean().optional().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.number(),
});

export type LocalGoogleCredential = z.infer<typeof LocalGoogleCredentialSchema>;

export const DiscordWebhookSchema = z.object({
  id: z.string().optional(),
  webhookId: z.string(),
  url: z.string(),
  name: z.string(),
  guildName: z.string(),
  guildId: z.string(),
  channelId: z.string(),
  userId: z.string(),
});

export type DiscordWebhook = z.infer<typeof DiscordWebhookSchema>;

export const SlackSchema = z.object({
  id: z.string().optional(),
  appId: z.string(),
  authedUserId: z.string(),
  authedUserToken: z.string(),
  slackAccessToken: z.string(),
  botUserId: z.string(),
  teamId: z.string(),
  teamName: z.string(),
  userId: z.string(),
});

export type Slack = z.infer<typeof SlackSchema>;

export const NotionSchema = z.object({
  id: z.string().optional(),
  accessToken: z.string(),
  workspaceId: z.string(),
  databaseId: z.string(),
  workspaceName: z.string(),
  workspaceIcon: z.string(),
  userId: z.string(),
});

export type Notion = z.infer<typeof NotionSchema>;

export type ConnectionType = "Google Drive" | "Discord" | "Notion" | "Slack";

export type Connection = {
  title: ConnectionType;
  description: string;
  image: string;
  connectionKey: keyof ConnectionProviderProps;
  alwaysTrue?: boolean;
  accessTokenKey?: string;
  slackSpecial?: boolean;
};

export type EditorCanvasTypes =
  | "Email"
  | "Condition"
  | "AI"
  | "Slack"
  | "Google Drive"
  | "Notion"
  | "Custom Webhook"
  | "Google Calendar"
  | "Trigger"
  | "Action"
  | "Wait";

export type EditorCanvasCardType = {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  metadata: any;
  type: EditorCanvasTypes;
};

export type EditorNodeType = {
  id: string;
  type: EditorCanvasCardType["type"];
  position: {
    x: number;
    y: number;
  };
  data: EditorCanvasCardType;
};

export type EditorActions =
  | {
      type: "LOAD_DATA";
      payload: {
        elements: EditorNode[];
        edges: {
          id: string;
          source: string;
          target: string;
        }[];
      };
    }
  | {
      type: "UPDATE_NODE";
      payload: {
        elements: EditorNode[];
      };
    }
  | {
      type: "REDO";
    }
  | {
      type: "UNDO";
    }
  | {
      type: "SELECT_ELEMENT";
      payload: {
        element: EditorNode;
      };
    };
