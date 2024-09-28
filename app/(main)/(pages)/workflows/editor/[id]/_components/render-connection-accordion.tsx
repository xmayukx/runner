"use client";
import { Connection } from "@/lib/types";
import { useNodeConnections } from "@/providers/connection-provider";
import { EditorState } from "@/providers/editor-provider";
import { useRunnerStore } from "@/store";
import React from "react";

type Props = {
  connection: Connection;
  state: EditorState;
};

function RenderConnectionAccordion({ connection, state }: Props) {
  const {
    title,
    description,
    connectionKey,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection;

  const { nodeConnection } = useNodeConnections();
  const {
    googleFile,
    setGoogleFile,
    slackChannels,
    setSlackChannels,
    selectedSlackChannel,
    setSelectedSlackChannel,
  } = useRunnerStore();

  const connectionData = (nodeConnection as any)[connectionKey];

  const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionData[accessTokenKey]);
  return <div>RenderConnectionAccordion</div>;
}

export default RenderConnectionAccordion;
