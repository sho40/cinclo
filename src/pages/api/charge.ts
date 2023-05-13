import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY ?? '', { apiVersion: '2022-11-15' });

export default async function handler(req: any, res: any) {
  const {token, currency, amount} = req.body;
  const result = await stripe.charges.create({
    amount,
    currency,
    source: token,
    description: 'Order using Charge API'
  });

  res.status(201).json({
    order_id: result.id
  })
}