import { SecondayHeader } from "@/components/global/secondary-header";
import React from "react";
import WorkflowButton from "./_components/workflow-button";
import Workflows from "./_components";

function page() {
  return (
    <div className=" flex flex-col relative">
      <SecondayHeader>
        Workflows
        <WorkflowButton />
      </SecondayHeader>
      <Workflows />
    </div>
  );
}

export default page;
