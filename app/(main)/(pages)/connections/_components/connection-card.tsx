import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
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
  connected: {} & any;
};

export const ConnectionCard = ({
  type,
  icon,
  title,
  description,
  callback,
  connected,
}: Props) => {
  return (
    <Card className=" flex flex-col lg:flex-row items-center lg:justify-between">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
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
      <CardFooter className=" flex flex-col justify-center items-center p-4">
        {connected[type] ? (
          <Button size={"lg"} className="" variant={"outline"}>
            <span className="relative flex h-2 w-2 mr-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 blur-sm"></span>
              <span className="absolute inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Connected</span>
          </Button>
        ) : (
          <Link
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
            <Button className="" size={"lg"}>
              <span>Connect</span>
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
