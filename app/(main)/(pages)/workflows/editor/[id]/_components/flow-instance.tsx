"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNodeConnections } from "@/providers/connection-provider";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import {
  onCreateNodeEdges,
  onFlowPublish,
} from "../_actions/workflow-connections";

type Props = {
  children: React.ReactNode;
  edges: any[];
  nodes: any[];
};

export default function FlowInstance({ children, edges, nodes }: Props) {
  const { toast } = useToast();
  const pathname = usePathname();
  const [isFlow, setIsFlow] = useState([]);
  const { nodeConnection } = useNodeConnections();

  const onFlowAutomation = useCallback(async () => {
    const flow = await onCreateNodeEdges(
      pathname.split("/").pop()!,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow),
    );

    if (flow)
      toast({
        title: "Flow Automation",
        description: flow.message,
      });
  }, [nodeConnection]);

  const onPublishWorkflow = useCallback(async () => {
    const response = await onFlowPublish(pathname.split("/").pop()!, true);
    if (response)
      toast({
        title: "Flow Automation",
        description: response.message,
      });
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div className=" flex gap-3 p-4">
        <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
          Save
        </Button>
        <Button onClick={onPublishWorkflow} disabled={isFlow.length < 1}>
          Publish
        </Button>
      </div>
      {children}
    </div>
  );
}
