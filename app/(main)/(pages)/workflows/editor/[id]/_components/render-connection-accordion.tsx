"use client";
import { Connection } from "@/lib/types";
import { useNodeConnections } from "@/providers/connection-provider";
import { EditorState } from "@/providers/editor-provider";
import { useRunnerStore } from "@/store/store";
import React from "react";
import { ConnectionCard } from "@/app/(main)/(pages)/connections/_components/connection-card";
import { AccordionContent } from "@/components/ui/accordion";
import MultipleSelector from "@/components/ui/multiple-selector";

type Props = {
  connection: Connection;
  state: EditorState;
};

function RenderConnectionAccordion({ connection, state }: Props) {
  const {
    title,
    image,
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
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useRunnerStore();

  const connectionData = (nodeConnection as any)[connectionKey];

  const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionData[accessTokenKey]);
  return (
    <AccordionContent key={title}>
      {state.editor.selectedNode.data.title === title && (
        <>
          <ConnectionCard
            title={title}
            icon={image}
            description={description}
            type={title}
            connected={{ [title]: isConnected }}
          />
          {slackSpecial && isConnected && (
            <div className="p-6">
              {slackChannels?.length ? (
                <>
                  <div className="mb-4 ml-1">
                    Select the slack channels to send notification and messages:
                  </div>
                  <MultipleSelector
                    value={selectedSlackChannels}
                    onChange={setSelectedSlackChannels}
                    defaultOptions={slackChannels}
                    placeholder="Select channels"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </>
              ) : (
                "No Slack channels found. Please add your Slack bot to your Slack channel"
              )}
            </div>
          )}
        </>
      )}
    </AccordionContent>
  );
}

export default RenderConnectionAccordion;
