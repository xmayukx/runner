"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { onFlowPublish } from "../editor/[id]/_actions/workflow-connections";
import { toast } from "@/hooks/use-toast";

type Props = {
  name: string;
  description: string;
  id: string;
  publish: boolean | null;
};

export default function Workflow({ name, id, description, publish }: Props) {
  const onPublishFlow = async (event: any) => {
    const response = await onFlowPublish(
      id,
      event.target.ariaChecked === "false",
    );
    if (response)
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
  };

  return (
    <Card className=" flex w-full items-center justify-between">
      <CardHeader className=" flex flex-col gap-4">
        <Link href={`/workflows/editor/${id}`}>
          <div className=" flex  gap-2">
            <Image
              src={"/googleDrive.png"}
              height={30}
              width={30}
              className="object-contain"
              alt="Google Drive"
            />
            <Image
              src={"/notion.png"}
              height={30}
              width={30}
              className="object-contain"
              alt="notion"
            />
            <Image
              src={"/discord.png"}
              height={30}
              width={30}
              className="object-contain"
              alt="discord"
            />
          </div>
          <div className="">
            <CardTitle className=" text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </Link>
      </CardHeader>
      <div className=" flex flex-col item-center gap-2 p-4">
        <Label htmlFor="airplane-mode" className=" text-muted-foreground">
          {publish! ? "On" : "Off"}
        </Label>
        <Switch
          id="airplane-mode"
          onClick={onPublishFlow}
          defaultChecked={publish!}
        ></Switch>
      </div>
    </Card>
  );
}
