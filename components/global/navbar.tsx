// Navbar component
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
    <header className="fixed right-0 left-0 top-[25px] py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center justify-between">
      {" "}
      {/* Adjust top to give space for NotificationBar */}
      <aside className=" flex items-center gap-[2px]">
        <Image
          width={15}
          height={15}
          src={"/runner-logo.svg"}
          alt="runner logo"
          className="invert size-7"
        />
        <h1 className="text-xl font-medium text-white ml-2">Runner</h1>
      </aside>
      <aside className="flex items-center gap-4">
        <Link href="/workflows">
          <Button
            variant={"ghost"}
            className="group flex items-center rounded-3xl"
          >
            {/* Display either "Dashboard" or "Get Started" based on user state */}
            {user ? "Launch" : "Get Started"}

            {/* Arrow icon with hover animation */}
            <ArrowRightIcon className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1 size-3" />
          </Button>
        </Link>
        {user ? <UserButton afterSwitchSessionUrl="/" /> : null}
      </aside>
    </header>
  );
};
