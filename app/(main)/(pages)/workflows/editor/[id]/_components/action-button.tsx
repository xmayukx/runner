"use client";
import { postContentToWebHook } from "@/app/(main)/(pages)/connections/_actions/discord-connection";
import { Button } from "@/components/ui/button";
import { ConnectionProviderProps } from "@/providers/connection-provider";
import { Option } from "@/store/store";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";
import { onCreateNodeTemplate } from "../../../_actions/workflow-connections";
import { toast } from "@/hooks/use-toast";
import { onCreateNewPageInDatabase } from "@/app/(main)/(pages)/connections/_actions/notion-connection";
import { postMessageToSlack } from "@/app/(main)/(pages)/connections/_actions/slack-connection";

type Props = {
  currentService: string;
  nodeConnection: ConnectionProviderProps;
  channels?: Option[];
  setChannels?: (value: Option[]) => void;
};

export default function ActionButton({
  currentService,
  nodeConnection,
  channels,
  setChannels,
}: Props) {
  const pathName = usePathname();

  const onCreateLocalNodeTemplate = useCallback(async () => {
    if (currentService === "Discord") {
      const response = await onCreateNodeTemplate(
        nodeConnection.discordNode.content,
        currentService,
        pathName.split("/").pop()!,
      );

      if (response) {
        toast({
          title: "Template Saved",
          description: response,
        });
      }
    }

    if (currentService === "Slack") {
      const response = await onCreateNodeTemplate(
        nodeConnection.slackNode.content,
        currentService,
        pathName.split("/").pop()!,
        channels,
        nodeConnection.slackNode.slackAccessToken,
      );

      if (response) {
        toast({
          title: "Template Saved",
          description: response,
        });
      }
    }

    if (currentService === "Notion") {
      const response = await onCreateNodeTemplate(
        nodeConnection.notionNode.content,
        currentService,
        pathName.split("/").pop()!,
        [],
        nodeConnection.notionNode.accessToken,
        nodeConnection.notionNode.databaseId,
      );

      if (response) {
        toast({
          title: "Template Saved",
          description: response,
        });
      }
    }
  }, [nodeConnection, channels]);

  const onSendDiscordMessage = useCallback(async () => {
    const response = await postContentToWebHook(
      nodeConnection.discordNode.content,
      nodeConnection.discordNode.webhookURL,
    );

    if (response.message == "success") {
      toast({
        description: "Message sent successfully",
      });
      nodeConnection.setDiscordNode((prev: any) => ({
        ...prev,
        content: "",
      }));
    }
  }, [nodeConnection.discordNode]);

  const onStoreNotionContent = useCallback(async () => {
    const response = await onCreateNewPageInDatabase(
      nodeConnection.notionNode.databaseId,
      nodeConnection.notionNode.accessToken,
      nodeConnection.notionNode.content,
    );

    if (response) {
      nodeConnection.setNotionNode((prev: any) => ({
        ...prev,
        content: {
          name: "",
          kind: "",
          type: "",
        },
      }));
    }
  }, [nodeConnection.notionNode]);

  const onStoreSlackContent = useCallback(async () => {
    const response = await postMessageToSlack(
      nodeConnection.slackNode.slackAccessToken,
      channels!,
      nodeConnection.slackNode.content,
    );
    console.log(response);
    if (response.message === "Success") {
      toast({
        title: "Message Sent",
        description: "Message sent successfully",
      });

      nodeConnection.setSlackNode((prev: any) => ({
        ...prev,
        content: "",
      }));

      setChannels!([]);
    } else {
      toast({
        title: "Message not sent",
        description: "Message not sent",
      });
    }
  }, [nodeConnection.slackNode, channels]);

  // const renderActionButton = () => {
  switch (currentService) {
    case "Discord":
      return (
        <>
          <Button variant={"outline"} onClick={onSendDiscordMessage}>
            Test message
          </Button>
          <Button variant={"outline"} onClick={onCreateLocalNodeTemplate}>
            Save Template
          </Button>
        </>
      );

    case "Notion":
      return (
        <>
          <Button variant={"outline"} onClick={onStoreNotionContent}>
            Test message
          </Button>
          <Button variant={"outline"} onClick={onCreateLocalNodeTemplate}>
            Save Template
          </Button>
        </>
      );

    case "Slack":
      return (
        <>
          <Button variant={"outline"} onClick={onStoreSlackContent}>
            Test message
          </Button>
          <Button variant={"outline"} onClick={onCreateLocalNodeTemplate}>
            Save Template
          </Button>
        </>
      );

    default:
      return null;
  }
  // };
}
