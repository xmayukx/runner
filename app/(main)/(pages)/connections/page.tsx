import { SecondayHeader } from "@/components/global/secondary-header";
import { CONNECTIONS } from "@/lib/constants";
import React from "react";
import { ConnectionCard } from "./_components/connection-card";
import { currentUser } from "@clerk/nextjs/server";
import { onDiscordConnect } from "./_actions/discord-connection";
import { onNotionConnect } from "./_actions/notion-connection";
import { onSlackConnect } from "./_actions/slack-connection";
import { getUserData } from "./_actions/get-user";

type Props = {
  searchParams?: {
    [key: string]: string | undefined;
  };
};

async function Page({ searchParams }: Props) {
  const {
    webhook_id,
    webhook_name,
    webhook_url,
    guild_id,
    guild_name,
    channel_id,
    access_token,
    workspace_name,
    workspace_icon,
    workspace_id,
    database_id,
    app_id,
    authed_user_id,
    authed_user_token,
    slack_access_token,
    bot_user_id,
    team_id,
    team_name,
  } = searchParams ?? {
    webhook_id: "",
    webhook_name: "",
    webhook_url: "",
    guild_id: "",
    guild_name: "",
    channel_id: "",
    access_token: "",
    workspace_name: "",
    workspace_icon: "",
    workspace_id: "",
    database_id: "",
    app_id: "",
    authed_user_id: "",
    authed_user_token: "",
    slack_access_token: "",
    bot_user_id: "",
    team_id: "",
    team_name: "",
  };
  const user = await currentUser();
  if (!user) return null;

  const onUserConnections = async () => {
    console.log(database_id);
    await onDiscordConnect(
      channel_id!,
      webhook_id!,
      webhook_name!,
      webhook_url!,
      user.id,
      guild_name!,
      guild_id!,
    );
    await onNotionConnect(
      access_token!,
      workspace_id!,
      workspace_icon!,
      workspace_name!,
      database_id!,
      user.id,
    );

    await onSlackConnect(
      app_id!,
      authed_user_id!,
      authed_user_token!,
      slack_access_token!,
      bot_user_id!,
      team_id!,
      team_name!,
      user.id,
    );

    const connections: any = {};

    const user_info = await getUserData(user.id);

    //get user info with all connections
    user_info?.connections.map((connection) => {
      connections[connection.type] = true;
      return (connections[connection.type] = true);
    });

    // Google Drive connection will always be true
    // as it is given access during the login process
    return { ...connections, "Google Drive": true };
  };

  const connections = await onUserConnections();

  return (
    <div className=" relative flex flex-col gap-4">
      <SecondayHeader>Connections</SecondayHeader>
      <div className="  relative flex flex-col gap-4">
        <section className=" flex flex-col gap-4 p-6 text-muted-foreground">
          Connect all your apps directly from here. You may need to connect
          these apps regurarly to refresh verification.
          {CONNECTIONS.map((connection, key) => (
            <ConnectionCard
              key={connection.title}
              title={connection.title}
              description={connection.description}
              type={connection.title}
              icon={connection.image}
              connected={connections}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Page;
