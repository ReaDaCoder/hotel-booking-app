import React, { useEffect } from "react";

export default function PaymentPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const payWithPaystack = () => {
    let handler = window.PaystackPop.setup({
      key: 'your_public_key', // Replace with your Paystack public key
      email: document.querySelector("input[name=email]").value,
      amount: document.querySelector("input[name=amount]").value * 100, // in kobo
      currency: "NGN",
      ref: '' + Math.floor(Math.random() * 1000000000 + 1), // generates a random reference
      callback: function(response) {
        alert('Payment successful. Transaction reference: ' + response.reference);
      },
      onClose: function() {
        alert('Payment window closed.');
      }
    });
    handler.openIframe();
  };

  return (
    <div>
      <form>
        <label>Full Name</label>
        <input type="text" name="full_name" />
        <label>Email</label>
        <input type="text" name="email" />
        <label>Amount (NGN)</label>
        <input type="number" name="amount" placeholder="Min Amount 1000" />
        <button type="button" onClick={payWithPaystack}>Pay</button>
      </form>
    </div>
  );
}
