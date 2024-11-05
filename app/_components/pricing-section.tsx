import PricingCards from "@/components/pricingCards";
import { pricing } from "@/lib/constants";
import React from "react";

type Props = {};

function PricingSeciton({}: Props) {
  return (
    <>
      {pricing.map((price, key) => (
        <PricingCards
          key={key}
          title={price.title}
          price={price.price}
          features={price.features}
        />
      ))}
    </>
  );
}

export default PricingSeciton;
