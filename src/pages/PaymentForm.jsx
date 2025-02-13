import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm"; // Ensure the correct import path

const stripePromise = loadStripe("your_stripe_publishable_key"); // Replace with your actual Stripe publishable key

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}



// import React, {useState} from 'react';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from "axios";

// const CARD_OPTIONS = {
//     iconStyle: "solid",
//     style:{
//         base:{
//             iconColor: "#c4f0ff",
//             color:"fff",
//             fontWeight: 500,
//             fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//             fontSize: "16px",
//             fontSmoothing: "antialiased",
//             ":-webkit-autofill": {color: "#fce883"},
//             "::placeholder": {color: "#87bbfd"}
//         },
//         invalid:{
//             iconColor:"ffc7ee",
//             color: "#ffc7ee"
//         }
//     }
// }

// export default function Payment(){
//     const [success, setSuccess] = useState(false)
//     const stripe = useStripe();
//     const elements = useElements()

//     const handleSubmit = async(e) =>{
//         e.preventDefault()
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//             type:"card",
//             card:elements.getElement(CardElement)
//         })
    

//     if(!error){
//         try{
//             const {id} = paymentMethod
//             const response = await axios.post("http://localhost:4000/payment", {
//                 amount:1000,
//                 id
//             })

//             if(response.data.success){
//                 console.log("Successful payment")
//                 setSuccess(true)
//             }
//         } catch (error){
//             console.log("Error", error)
//         }
//     } else{
//         console.log(error.message)
//     }
// }

// return (
//     <div>
//         {!success ? (
//             <form onSubmit={handleSubmit}>
//                 <fieldset className="FormGroup">
//                     <div className="FormRow">
//                         <CardElement options={CARD_OPTIONS} />
//                     </div>
//                 </fieldset>
//                 <button>Pay</button>
//             </form>
//         ) : null}
//         <div>
//             <h2>You just booked a room!</h2>
//         </div>
//     </div>
// );

// }
