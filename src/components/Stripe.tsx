"use client"

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const StripeComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const makePayment = async () => {
    setLoading(true);

    const response = await fetch('/api/create-checkout-session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to create checkout session');
      setLoading(false);
      return;
    }

    const session = await response.json();

    const stripe = await stripePromise;

    if (session.id) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Stripe checkout error', error);
      }
    } else {
      console.error('Failed to create checkout session');
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={makePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Stripe'}
      </button>
    </div>
  );
};

export default StripeComponent;

