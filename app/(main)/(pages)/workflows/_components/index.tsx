import React from "react";
import Workflow from "./workflow";
import { onGetWorkflows } from "../_actions/workflow-connections";

type Props = {};

export default async function Workflows({}: Props) {
  const workflows = await onGetWorkflows();
  return (
    <div className="relative flex flex-col gap-4">
      <section className=" flex flex-col m-2">
        <div className="flex flex-col gap-4">
          {workflows?.length ? (
            workflows.map((workflow, key) => (
              <Workflow key={key} {...workflow} />
            ))
          ) : (
            <div className=" text-center mt-28 text-muted-foreground">
              No workflows found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
