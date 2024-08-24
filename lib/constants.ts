import React from "react";
import { GoHomeFill } from "react-icons/go";
import { MdOutlinePayment } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { HiTemplate } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { LuWorkflow } from "react-icons/lu";

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
