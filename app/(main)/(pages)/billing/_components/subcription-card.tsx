"use client";
import React from "react";

type Props = {
  onPayment(id: string): void;
  products: any[];
  tier: string;
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SubscriptionCard = ({ onPayment, products, tier }: Props) => {
  console.log(products);
  return (
    <section className="flex w-full justify-center md:flex-row flex-col gap-6">
      {products &&
        products.map((product: any) => (
          <Card className="p-3" key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <CardDescription>
                {product.name === "Pro"
                  ? "Experience a monthly surge of credits to supercharge your automation efforts. Ideal for small to medium-sized projects seeking consistent support."
                  : product.name === "Free" &&
                    "Get a monthly wave of credits to automate your tasks with ease. Perfect for starters looking to dip their toes into Runner's automation capabilities."}
              </CardDescription>
              <div className="flex justify-between">
                <p>{product.name === "Free" ? "10" : "100"} credits</p>
                <p className="font-bold">
                  {product.name === "Free" ? "Free" : "$19.99"}/mo
                </p>
              </div>
              {product.name === tier ? (
                <Button disabled variant="outline">
                  Active
                </Button>
              ) : (
                <Button
                  onClick={() => onPayment(product.default_price)}
                  variant="outline"
                >
                  Purchase
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
    </section>
  );
};
