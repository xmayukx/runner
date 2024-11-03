import { ConnectionProviderProps } from "@/providers/connection-provider";
import { EditorState } from "@/providers/editor-provider";
import { useRunnerStore } from "@/store/store";
import React from "react";
import ContentBasedTitle from "./content-based-title";

type Props = {
  state: EditorState;
  nodeConnection: ConnectionProviderProps;
};

function RenderOutputAccordion({ state, nodeConnection }: Props) {
  const {
    googleFile,
    setGoogleFile,
    slackChannels,
    setSlackChannels,
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useRunnerStore();

  return (
    <ContentBasedTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  );
}

export default RenderOutputAccordion;
