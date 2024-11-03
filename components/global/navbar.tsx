import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HoverBorderGradient } from "./hover-border-gradient";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

type Props = {};

export const Navbar = async (props: Props) => {
  const user = await currentUser();
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      <aside className=" flex items-center gap-[2px]">
        {/* <Image 
        width={15}
        height={15}
        alt="runner logo"
        className=" shadow-sm" /> */}
        <h1 className="text-2xl font-bold text-white">Runner</h1>
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">Clients</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">Documentation</Link>
          </li>
          <li>
            <Link href="#">Enterprise</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link href="/dashboard">
          <HoverBorderGradient>
            {
              //WIP: wire up auth state
              user ? "Dashboard" : "Get Started"
            }
          </HoverBorderGradient>
        </Link>
        {user ? <UserButton afterSwitchSessionUrl="/" /> : null}
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  );
};
