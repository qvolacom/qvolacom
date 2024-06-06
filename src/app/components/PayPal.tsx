"use client";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "ASDvioRGb8pblvHK5Ir-0k5u0eJQJLCpeZh6NK5IzGMzWjZ1BygU55sZa2AtOn8_3v5N0ZhTAeH_BRpV",
  currency: "USD",
  intent: "capture",
};

export default function Home() {
  return (
    <div className="bg-slate-800 w-full h-screen flex justify-center items-center">
      <div className="text-gray-300 mb-4">Pagos</div>
      <div>
        <PayPalScriptProvider
          options={initialOptions}
        >
          <PayPalButtons
            style={{ layout: "vertical", color: 'gold' }}

          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}