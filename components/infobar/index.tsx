"use client";
import { Book, Headphones, Search } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import { useBilling } from "@/providers/billing-provider";
import { onPaymentDetails } from "@/app/(main)/(pages)/billing/_actions/payment-connections";

function InfoBar() {
  const { credits, tier, setCredits, setTier } = useBilling();
  const onGetPayment = async () => {
    const response = await onPaymentDetails();
    if (response) {
      setCredits(response.credits!);
      setTier(response.tier!);
    }
  };

  useEffect(() => {
    onGetPayment();
  }, []);
  return (
    <div className=" flex flex-grow justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-gray-300">Credits</p>
        <span>
          {credits}/{tier == "Free" ? "10" : tier == "Pro" && "100"}
        </span>
      </span>

      <UserButton />
    </div>
  );
}

export default InfoBar;
