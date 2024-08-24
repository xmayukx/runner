import { Book, Headphones, Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { UserButton } from "@clerk/nextjs";

function InfoBar() {
  return (
    <div className=" flex flex-grow justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
      <span className=" flex items-center bg-muted px-4 rounded-full">
        <Search />
        <Input
          placeholder="Quick Search"
          className=" border-none bg-transparent"
        />
      </span>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Headphones />
          </TooltipTrigger>
          <TooltipContent>
            <p className="">Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Book />
          </TooltipTrigger>
          <TooltipContent>
            <p className="">Guide</p>
          </TooltipContent>
          <UserButton />
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default InfoBar;
