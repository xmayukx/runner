"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { menuOptions } from "@/lib/constants";
import { clsx } from "clsx";
import { Separator } from "../ui/separator";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";

type Props = {};

const MenuOptions = (props: Props) => {
  const pathName = usePathname();
  return (
    <nav className=" dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2">
      <div className=" flex items-center justify-center flex-col gap-6">
        <Link href={"/"} className="flex font-bold flex-row">
          rnnr
        </Link>
        <TooltipProvider>
          <ul className=" flex flex-col gap-y-3 transition-all delay-100">
            {menuOptions.map((option) => (
              <Tooltip key={option.name} delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={option.href}
                      className={clsx(
                        ` group flex items-center justify-center text-md scale-[1.5] delay-75 transition-all rounded-md p-[4px] m-1 cursor-pointer dark:hover:text-purple-300 hover:text-purple-500`,
                        {
                          "dark:bg-[#2F006B] dark:text-purple-300 text-purple-500 transition-all delay-100 bg-[#EEE0FF] hover:text-purple-300":
                            pathName === option.href,
                        },
                      )}
                    >
                      {option.Component}
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className=" bg-black/10 backdrop-blur-xl"
                >
                  <p>{option.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </ul>
        </TooltipProvider>
        <Separator />

        <ModeToggle />
      </div>
    </nav>
  );
};

export default MenuOptions;
