import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ConnectionType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  type: ConnectionType;
  icon: string;
  title: ConnectionType;
  description: string;
  callback?: () => void;
  //   connected: {} & any;
};

export const ConnectionCard = ({
  type,
  icon,
  title,
  description,
  callback,
  //   connected,
}: Props) => {
  return (
    <Card className=" flex w-full item-center justify-between">
      <CardHeader className=" flex flex-col gap-4">
        <div className=" flex flex-col gap-2">
          <Image
            src={icon}
            alt={title}
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div className=" flex flex-col items-center gap-2 p-4">
        {/* {connected[type] ? (
          <>
            {" "}
            <Button>Connected</Button>{" "}
          </>
        ) : (
          <> */}
        <Link
          className=" my-auto"
          href={
            title == "Discord"
              ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
              : title == "Notion"
                ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
                : title == "Slack"
                  ? process.env.NEXT_PUBLIC_SLACK_REDIRECT!
                  : "#"
          }
        >
          <Button>Connect</Button>
        </Link>{" "}
        {/* </>
        )} */}
      </div>
    </Card>
  );
};