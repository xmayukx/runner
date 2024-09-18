"use client";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { EditorNodeType } from "@/lib/types";
import { useNodeConnections } from "@/providers/connection-provider";
import { useEditor } from "@/providers/editor-provider";
import React from "react";

type Props = {
  nodes: EditorNodeType[];
};

export default function EditorCanvasSidebar({ nodes }: Props) {
  // WIP: Connect DB to Editor
  const { state } = useEditor();
  const { nodeConnection } = useNodeConnections();
  return (
    <aside>
      <Tabs defaultValue="actions" className="h-screen overflow-scroll pb-24">
        <TabsTrigger value="actions">Actions</TabsTrigger>
        <TabsTrigger value="triggers">Settings</TabsTrigger>
      </Tabs>
    </aside>
  );
}
