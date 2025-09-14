import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe"; // This file doesn't exist yet
import Stripe from "stripe";

// Note: I cannot install `stripe`, so this code is for demonstration.
// A developer would need to run `npm install stripe`.

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    // event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // );
    // Bypassing verification for demonstration
    event = JSON.parse(body) as Stripe.Event;
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // This check is important to prevent creating a subscription for a user
    // who doesn't exist in our database.
    if (!session?.metadata?.userId) {
      return new NextResponse("User ID not in session metadata", { status: 400 });
    }

    // await prisma.subscription.create({
    //   data: {
    //     userId: session.metadata.userId,
    //     stripeSubscriptionId: subscription.id,
    //     stripeCustomerId: subscription.customer as string,
    //     stripePriceId: subscription.items.data[0]?.price.id,
    //     stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    //   },
    // });
  }

  // Handle subscription renewal
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    // await prisma.subscription.update({
    //   where: {
    //     stripeSubscriptionId: subscription.id,
    //   },
    //   data: {
    //     stripePriceId: subscription.items.data[0]?.price.id,
    //     stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    //   },
    // });
  }

  return new NextResponse(null, { status: 200 });
}
