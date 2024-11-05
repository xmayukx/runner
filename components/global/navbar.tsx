import { ArrowRightIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HoverBorderGradient } from "./hover-border-gradient";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

type Props = {};

export const Navbar = async (props: Props) => {
  const user = await currentUser();
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center justify-between">
      <aside className=" flex items-center gap-[2px]">
        {/* <Image 
        width={15}
        height={15}
        src={""}
        alt="runner logo"
        className=" shadow-sm" /> */}
        <h1 className="text-2xl font-bold text-white">Runner</h1>
      </aside>

      <aside className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant={"ghost"} className="group flex items-center">
            {/* Display either "Dashboard" or "Get Started" based on user state */}
            {user ? "Dashboard" : "Get Started"}

            {/* Arrow icon with hover animation */}
            <ArrowRightIcon className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1 size-3" />
          </Button>
        </Link>
        {user ? <UserButton afterSwitchSessionUrl="/" /> : null}
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  );
};
