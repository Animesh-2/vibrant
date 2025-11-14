// /app/api/razorpay/preferences/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const key_id = process.env.RAZORPAY_KEY_ID!;
    const key_secret = process.env.RAZORPAY_KEY_SECRET!;

    const authString = Buffer.from(`${key_id}:${key_secret}`).toString("base64");

    const response = await fetch(
      "https://api.razorpay.com/v1/standard_checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: body.amount,
          currency: "INR",
          description: "Rental demo payment",
          prefill: {
            name: body.name,
            email: body.email,
            contact: body.contact,
          },
          notes: {
            bookingCode: body.bookingCode,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
