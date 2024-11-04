"use client";
import { useBilling } from "@/providers/billing-provider";
import React from "react";

type Props = {};

function BillingDashboard({}: Props) {
  const { credits, tier } = useBilling();
  const [stripeProducts, setStripeProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  return <>{loading ? "" : ""}</>;
}

export default BillingDashboard;
