import { ConnectionProviderProps } from "@/providers/connection-provider";
import { Option } from "@/store";
import React from "react";

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
  return <div>ActionButton</div>;
}
