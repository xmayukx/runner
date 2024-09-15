"use client";
import WorkflowForm from "@/components/forms/workflow-form";
import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import { Plus, Workflow } from "lucide-react";
import React from "react";

function WorkflowButton() {
  const { setOpen, setClose } = useModal();
  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a workflow automation"
        subheading="Workflows are powerful that help you automate tasks"
      >
        <WorkflowForm />
      </CustomModal>,
    );
  };
  return (
    <Button size={"icon"} onClick={handleClick}>
      <Plus />
    </Button>
  );
}

export default WorkflowButton;
