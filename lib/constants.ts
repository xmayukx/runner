import React from "react";
import { GoHomeFill } from "react-icons/go";
import { MdOutlinePayment } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { HiTemplate } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { LuWorkflow } from "react-icons/lu";
import { Connection } from "./types";

export const clients = [...new Array(10)].map((client, index) => ({
  href: `/${index + 1}.png`,
}));

export const menuOptions = [
  {
    name: "Dashboard",
    Component: React.createElement(GoHomeFill),
    href: "/dashboard",
  },
  {
    name: "Workflows",
    Component: React.createElement(LuWorkflow),
    href: "/workflows",
  },
  {
    name: "Settings",
    Component: React.createElement(RiSettings4Fill),
    href: "/settings",
  },
  {
    name: "Connections",
    Component: React.createElement(BiSolidCategory),
    href: "/connections",
  },
  {
    name: "Billing",
    Component: React.createElement(MdOutlinePayment),
    href: "/billing",
  },
  {
    name: "Templates",
    Component: React.createElement(HiTemplate),
    href: "/templates",
  },
  {
    name: "Logs",
    Component: React.createElement(IoDocumentText),
    href: "/logs",
  },
];

export const CONNECTIONS: Connection[] = [
  {
    title: "Google Drive",
    description: "Connect your google drive to listen to folder changes",
    image: "/googleDrive.png",
    connectionKey: "googleNode",
    alwaysTrue: true,
  },
  {
    title: "Discord",
    description: "Connect your discord to send notification and messages",
    image: "/discord.png",
    connectionKey: "discordNode",
    accessTokenKey: "webhookURL",
  },
  {
    title: "Notion",
    description: "Create entries in your notion dashboard and automate tasks.",
    image: "/notion.png",
    connectionKey: "notionNode",
    accessTokenKey: "accessToken",
  },
  {
    title: "Slack",
    description:
      "Use slack to send notifications to team members through your own custom bot.",
    image: "/slack.png",
    connectionKey: "slackNode",
    accessTokenKey: "slackAccessToken",
    slackSpecial: true,
  },
];
