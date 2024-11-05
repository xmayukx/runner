import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: "2024-10-28.acacia",
  });

  const products = await stripe.products.list({
    limit: 3,
  });

  return NextResponse.json(products.data);
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: "2024-10-28.acacia",
  });

  const data = await req.json();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_URL}/billing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
  });

  return NextResponse.json(session.url);
}
