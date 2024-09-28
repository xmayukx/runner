import { useEditor } from "@/providers/editor-provider";
import { Handle, HandleProps, useStore } from "@xyflow/react";
import React from "react";

type Props = HandleProps & { style?: React.CSSProperties };

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = (props: Props) => {
  const { state } = useEditor();

  return (
    <Handle
      {...props}
      isValidConnection={(e) => {
        const sourcesHandleInState = state.editor.edges.filter(
          (edge) => edge.source === e.source,
        ).length;
        const sourceNode = state.editor.elements.find(
          (node) => node.id === e.source,
        );
        const targetFromHandleInState = state.editor.edges.filter(
          (edge) => edge.target === e.target,
        ).length;

        if (targetFromHandleInState === 1) return false;
        if (sourceNode?.type === "Condition") return true;
        if (sourcesHandleInState < 1) return true;
        return false;
      }}
      className=" !-bottom-0 !h-4 !w-4 dark:bg-neutral-800"
    />
  );
};

export default CustomHandle;
