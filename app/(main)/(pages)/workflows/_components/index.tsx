import React from "react";
import Workflow from "./workflow";

type Props = {};

export default function Workflows({}: Props) {
  return (
    <div className=" relative flex flex-col gap-4">
      <section className=" flex flex-col m-2">
        <Workflow name="Test" id="1" description="Test" publish={true} />
      </section>
    </div>
  );
}
