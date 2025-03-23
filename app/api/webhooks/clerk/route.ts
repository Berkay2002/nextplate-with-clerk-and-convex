import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  try {
    // Get the webhook signature from the headers
    const headerList = headers();
    const svix_id = headerList.get("svix-id");
    const svix_timestamp = headerList.get("svix-timestamp");
    const svix_signature = headerList.get("svix-signature");

    // If there are no headers, return an error
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse("Missing svix headers", { status: 400 });
    }

    // Get the body of the request
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Webhook instance with your webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

    let evt: WebhookEvent;

    // Verify the webhook
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Webhook verification error:", err);
      return new NextResponse("Error verifying webhook", { status: 400 });
    }

    // Handle the webhook event
    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, image_url, first_name, last_name } = evt.data;

      const email = email_addresses?.[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ");
      
      try {
        // Example call to Convex
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/mutation/users/createOrUpdateUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id,
            email,
            name: name || undefined,
            imageUrl: image_url || undefined,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update user in Convex");
        }
      } catch (error) {
        console.error("Error updating user in Convex:", error);
        // Continue anyway, don't fail the webhook
      }
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Unexpected error in webhook handler:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  return new NextResponse("Webhook endpoint is working!", { status: 200 });
} 