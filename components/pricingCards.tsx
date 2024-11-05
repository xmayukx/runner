import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/lib/constants";

function PricingCards({ title, price, features }: PricingPlan) {
  return (
    <Card
      className={cn(
        " w-full mx-auto rounded-2xl border  border-zinc-600  bg-gradient-to-tr from-neutral-900 from-[50%] to-neutral-800",
        {
          " border border-white": title === "Pro",
        },
      )}
    >
      <CardHeader>
        <CardTitle className=" flex justify-between">
          <span className=" text-4xl font-sans tracking-tight">{title}</span>
          <span>
            {price}
            <span className="text-sm">/mo</span>
          </span>{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <ul>
          {features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex justify-between text-neutral-400 font-normal",
                {
                  "line-through text-stone-500": feature.disabled,
                },
              )}
            >
              <span>- {feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default PricingCards;
