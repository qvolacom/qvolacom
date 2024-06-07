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
    <div className="w-full h-screen justify-center items-center">
      <div className="text-[#ffffff] mb-4 text-center text-2xl mt-[5rem] w-full bg-[#FB823B]">Payment</div>
      <div className="">
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