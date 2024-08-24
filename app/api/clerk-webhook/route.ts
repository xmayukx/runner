import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Webhook received");
  try {
    const body = await req.json();
    console.log(body);
    const { id, email_addresses, first_name, image_url } = body?.data;
    const email = email_addresses[0]?.email_address;

    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email,
        name: first_name || "",
        profileImage: image_url || "",
      },
    });

    return new NextResponse("User updated in the database successfully ✅", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error Updating database ❌", { status: 500 });
  }
}
