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

export type Feature = {
  name: string;
  disabled: boolean;
};

// Define the PricingPlan type
export type PricingPlan = {
  title: string;
  price: string;
  features: Feature[];
};

export const pricing: PricingPlan[] = [
  {
    title: "Basic",
    price: "$9.99",
    features: [
      {
        name: "Unlimited Projects",
        disabled: false,
      },
      {
        name: "Unlimited Storage",
        disabled: false,
      },
      {
        name: "Priority Support",
        disabled: true,
      },
      {
        name: "Unlimited Users",
        disabled: false,
      },
    ],
  },
  {
    title: "Pro",
    price: "$19.99",
    features: [
      {
        name: "Unlimited Projects",
        disabled: false,
      },
      {
        name: "Unlimited Storage",
        disabled: false,
      },
      {
        name: "Priority Support",
        disabled: false,
      },
      {
        name: "Unlimited Users",
        disabled: false,
      },
    ],
  },
];

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

export const EditorCanvasDefaultCardTypes = {
  Email: { description: "Send and email to a user", type: "Action" },
  Condition: {
    description: "Boolean operator that creates different conditions lanes.",
    type: "Action",
  },
  AI: {
    description:
      "Use the power of AI to summarize, respond, create and much more.",
    type: "Action",
  },
  Slack: { description: "Send a notification to slack", type: "Action" },
  "Google Drive": {
    description:
      "Connect with Google drive to trigger actions or to create files and folders.",
    type: "Trigger",
  },
  Notion: { description: "Create entries directly in notion.", type: "Action" },
  "Custom Webhook": {
    description:
      "Connect any app that has an API key and send data to your applicaiton.",
    type: "Action",
  },
  Discord: {
    description: "Post messages to your discord server",
    type: "Action",
  },
  "Google Calendar": {
    description: "Create a calendar invite.",
    type: "Action",
  },
  Trigger: {
    description: "An event that starts the workflow.",
    type: "Trigger",
  },
  Action: {
    description: "An event that happens after the workflow begins",
    type: "Action",
  },
  Wait: {
    description: "Delay the next action step by using the wait timer.",
    type: "Action",
  },
};

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
