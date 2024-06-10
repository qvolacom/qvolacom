"use client"
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "ASDvioRGb8pblvHK5Ir-0k5u0eJQJLCpeZh6NK5IzGMzWjZ1BygU55sZa2AtOn8_3v5N0ZhTAeH_BRpV",
  currency: "USD",
  intent: "capture",
};

export default function Home() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Aquí podrías obtener o generar los datos de la orden antes de crearla
    const orderData = {
      billingFirstName: "John",
      billingLastName: "Doe",
      // Aquí puedes agregar más campos según sea necesario
    };
    setOrderData(orderData);
  }, []);

  const createOrder = async (orderData) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }

      const responseData = await response.json();
      console.log('Orden creada exitosamente:', responseData);
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  const handleCreateOrder = () => {
    if (orderData) {
      createOrder(orderData);
    } else {
      console.error('No se encontraron datos de la orden para crear.');
    }
  };

  return (
    <div className="w-full h-screen justify-center items-center">
      <div className="text-[#ffffff] mb-4 text-center text-6xl mt-[5rem] w-full bg-[#FB823B]">Payment</div>
      <div className="flex flex-wrap justify-center items-center h-full">
        <div className="flex justify-center items-center space-x-96 w-[90%] h-screen">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              className="justify-center w-[500px] shadow ml-2"
              style={{ layout: "vertical", color: 'gold' }}
              createOrder={handleCreateOrder}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

