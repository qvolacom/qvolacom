"use client";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ModalAlert from '../components/ModalAlert';

const initialOptions = {
  clientId: "AV3QygzcPl4VJh097qxHh60C5SvdRGjGohwsbPBrAfui1TlweD_t_owGK-QAbVEDq7GCdb5aD486VWZr",
  currency: "USD",
  intent: "capture",
};

interface Product {
  sku: string;
  title: string;
  size: string;
  price: number;
  totalPrice: number;
  quantity: number;
}

const MAX_DESCRIPTION_LENGTH = 100; // Limitamos la longitud de la descripción

const PayPal: React.FC = () => {
  const [totalValue, setTotalValue] = useState<string>("0");
  const [productDetails, setProductDetails] = useState<string>("");

  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    // Obtener productos del carrito desde el localStorage
    const cartItems: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Calcular el total sumando los totalPrice de los productos en el carrito
    const totalPrice: number = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    
    // Obtener detalles de los productos
    const details: string = cartItems.map(item => `x${item.quantity} - ${item.size} - ${item.title} - ${item.totalPrice.toFixed(2)} USD`).join(', ');

    // Limitar la longitud de la descripción si es demasiado larga
    const truncatedDetails = details.length > MAX_DESCRIPTION_LENGTH
      ? details.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
      : details;

    // Establecer el total como string formateado con dos decimales
    setTotalValue(totalPrice.toFixed(2));

    // Establecer los detalles de los productos
    setProductDetails(truncatedDetails);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: totalValue,
        },
        description: productDetails, // Utilizar detalles de los productos como descripción
        shippingPreference: "GET_FROM_FILE", // Obtener la dirección de envío del comprador
      }],
    });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(async function(details) {
      // Obtener los datos necesarios de la respuesta
      const buyerDetails = details.payer;
      const shippingAddress = details.purchase_units[0].shipping;
      const paymentStatus = details.status;
      const paymentMethod = "PayPal"; // Asumido como PayPal

      // Construir los datos de la orden para enviar a la API
      const orderDataSecond = {
        "billingFirstName": String(buyerDetails.name.given_name),
        "billingLastName": String(buyerDetails.name.surname),
        "billingAddress": String(buyerDetails.address.address_line_1),
        "billingCity": String(buyerDetails.address.admin_area_2),
        "billingState": String(shippingAddress.address.admin_area_1),
        "billingZipCode": String(buyerDetails.address.postal_code),
        "billingCountry": String(buyerDetails.address.country_code),
        "billingEmail": String(buyerDetails.email_address),
        "billingPhone": String(buyerDetails.phone ? buyerDetails.phone.phone_number.national_number : ""),
        "shippingFirstName": String(shippingAddress.name.full_name.split(' ')[0]),
        "shippingLastName": String(shippingAddress.name.full_name.split(' ').slice(1).join(' ')),
        "shippingAddress": String(shippingAddress.address.address_line_1),
        "shippingCity": String(shippingAddress.address.admin_area_2),
        "shippingState": String(shippingAddress.address.admin_area_1),
        "shippingZipCode": String(shippingAddress.address.postal_code),
        "shippingCountry": String(shippingAddress.address.country_code),
        "shippingEmail": String(buyerDetails.email_address),
        "shippingPhone": String(shippingAddress.phone ? shippingAddress.phone.phone_number.national_number : ""),
        "orderStatus": "PENDING", //String(paymentStatus)
        "paymentMethod": paymentMethod,
        "totalAmount": String(details.purchase_units[0].amount.value),
        "items": JSON.parse(localStorage.getItem("cart") || "[]").map(item => ({
          "sku": String(item.sku),
          "name": String(item.title),
          "quantity": String(item.quantity),
          "price": String(item.totalPrice)
        })),
      };

      console.log(shippingAddress.phone)

      // Enviar los datos de la orden a la API
      try {
        const response = await fetch( process.env.NEXT_PUBLIC_API_URL + "order/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDataSecond),
        });
        
        if (response.ok) {
          console.log("Orden creada exitosamente");
          
        } else {
          console.error("Error al crear la orden");
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error al enviar la orden:", error);
        setShowAlert(true);
      }
    });
  };

  return (
    <>
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "vertical", color: "gold" }}
        createOrder={createOrder}
        onApprove={handleApprove} // Agregar el manejador de eventos para el evento onApprove
      />
      </PayPalScriptProvider>
      <div>
        {showAlert && <ModalAlert message="Error: The operation could not be completed. Please try again later or contact technical support for assistance." onClose={handleClose} />}
        <div className={showAlert ? 'pointer-events-none' : ''}>
          {/* Aquí va el resto del contenido de tu aplicación */}
        </div>
      </div>
    </>
      
        
  );
}

export default PayPal;