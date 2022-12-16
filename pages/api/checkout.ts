// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Error from 'next/error'
import Stripe from 'stripe'

type Data = {
  message?: string
  session?: Stripe.Response<Stripe.Checkout.Session>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method !== "POST") return res.status(405).json({message: "Method not supported"})

  const body = JSON.parse(req.body)

  if(body.lineItems.length === 0) return res.status(405).json({message: "Product not selected"})

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2022-11-15"
    })

    // Stripe session
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}`,
      line_items: body.lineItems,
      mode: "payment"
    })

    res.status(201).json({session})
    
  } catch (error) {
    console.log(error);
    
    res.status(400).json({message: "error"})
  }
  
}
