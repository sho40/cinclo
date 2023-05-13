import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY ?? '', { apiVersion: '2022-11-15' });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { currency, amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: "Order from PaymentIntents API",
    })

    return res.status(201).json({
      client_secret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message
    });
  }
}