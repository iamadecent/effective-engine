import Stripe from "stripe";

// Note: I cannot install `stripe`, so this code is for demonstration.
// A developer would need to run `npm install stripe`.

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});
