import React, { useState,useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from './lib/getStripe';
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY = "pk_test_51Q2iK8Cs3w6cneavhZNzddYb4OlcMFwAUKyLyelyLNonblhQcj3tP0A2l9hvTs6wqzwaQvrSMpCUoSuiyTc4hLO800H4J7PVm4"
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function PaymentPage() {

  // const [checkoutError, setCheckoutError] = useState(null);

  // async function handleCheckout() {
  //   const stripe = await getStripe();
  //   const { error } = await stripe.redirectToCheckout({
  //     lineItems: [
  //       {
  //         price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'subscription',
  //     successUrl: `http://localhost:3000/success`,
  //     cancelUrl: `http://localhost:3000/cancel`,
  //     customerEmail: 'customer@email.com',
  //   });
  //   console.warn(error.message);
  // }

  return (
    <Elements sripe={stripeTestPromise}>
      <PaymentsForm/>
    </Elements>
  );
}

{/* <button onClick={handleCheckout}>Pay</button> */}
