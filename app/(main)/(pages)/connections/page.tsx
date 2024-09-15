import { SecondayHeader } from "@/components/global/secondary-header";
import { CONNECTIONS } from "@/lib/constants";
import React from "react";
import { ConnectionCard } from "./_components/connection-card";

type Props = {
  searchParams?: {
    [key: string]: string | undefined;
  };
};

function Page({ searchParams }: Props) {
  return (
    <div className=" relative flex flex-col gap-4">
      <SecondayHeader>Connections</SecondayHeader>
      <div className="  relative flex flex-col gap-4">
        <section className=" flex flex-col gap-4 p-6 text-muted-foreground">
          Connect all your apps directly from here. You may need to connect
          these apps regurarly to refresh verification.
          {CONNECTIONS.map((connection, key) => (
            <ConnectionCard
              key={connection.title}
              title={connection.title}
              description={connection.description}
              type={connection.title}
              icon={connection.image}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Page;
