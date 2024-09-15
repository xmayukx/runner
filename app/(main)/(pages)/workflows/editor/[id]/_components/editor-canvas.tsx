"use client";
import React, { useCallback, useMemo, useState } from "react";
import { ReactFlow, ReactFlowInstance } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { EditorCanvasCardType, EditorNodeType } from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";
import EditorCanvasCardSingle from "./editor-canvas-card-single";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { toast, useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";
type Props = {};

const initialNodes: EditorNodeType[] = [];
const initialEdges: { id: string; source: string; target: string }[] = [];

export default function EditorCanvas({}: Props) {
  const { dispatch, state } = useEditor();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const pathName = usePathname();
  const { toast } = useToast();
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type: EditorCanvasCardType["type"] = event.dataTransfer.getData(
        "application/reactflow",
      );
      if (typeof type === "undefined" || !type) {
        return;
      }

      const triggerAlreadyExists = state.editor.elements.find(
        (node) => node.type === "Trigger",
      );

      if (type === "Trigger" && triggerAlreadyExists) {
        toast({
          description: "You can only have one trigger node",
        });
        return;
      }

      if (!reactFlowInstance) return;
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: v4(),
      };
    },
    [dispatch, state.editor.position],
  );
  const nodeTypes = useMemo(
    () => ({
      Action: EditorCanvasCardSingle,
      Trigger: EditorCanvasCardSingle,
      Condition: EditorCanvasCardSingle,
      AI: EditorCanvasCardSingle,
      Slack: EditorCanvasCardSingle,
      "Google Drive": EditorCanvasCardSingle,
      Notion: EditorCanvasCardSingle,
      Discord: EditorCanvasCardSingle,
      "Custom Webhook": EditorCanvasCardSingle,
      "Google Calender": EditorCanvasCardSingle,
      Wait: EditorCanvasCardSingle,
    }),
    [],
  );

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={70}>
        <div className=" flex h-full items-center justify-center">
          <div
            style={{ width: "100%", height: "100%", paddingBottom: "70px" }}
            className=" relative"
          >
            <ReactFlow className=" w-[300px]"></ReactFlow>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
