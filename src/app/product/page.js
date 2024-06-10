"use client"
import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react'; 

export default function Home() {
  

  // Extraer los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + `products/${id}`;
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        
        // Establecer los datos obtenidos en el estado
        setProductData({
          title: data.title,
          description: data.description,
          price: data.regular_price,
          image: data.picture,
          size: data.size || [],
          stock: data.stock_quantity,
          sku: data.sku
        });
        

      } catch (error) {
        setError(error.message);
      }
    };

    fetchData()
  }, []);


  // Función para agregar un producto al carrito
  const addToCart = () => {
    if (!selectedSize) {
      alert('Por favor, seleccione un tamaño antes de agregar al carrito.');
      return;
    }
  
    // Verifica si hay productos en el carrito
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Verifica si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.sku === productData.sku && item.size === selectedSize);
  
    // Obtener el stock disponible para el SKU específico
    const availableStock = productData.stock || 0;
  
    // Verificar si el SKU ya está en el carrito y si hay suficiente stock disponible
    const existingStock = cart.reduce((acc, item) => {
      if (item.sku === productData.sku) {
        acc += item.quantity;
      }
      return acc;
    }, 0);
  
    if (existingStock >= availableStock) {
      alert(`El stock para el producto con SKU ${productData.sku} ya está agotado.`);
      return;
    }
  
    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito con el mismo tamaño, aumenta la cantidad y el precio total
      cart[existingProductIndex].quantity += 1;
      cart[existingProductIndex].totalPrice += productData.price;
    } else {
      // Si el producto no está en el carrito o tiene un tamaño diferente, agrégalo al carrito
      cart.push({ ...productData, size: selectedSize, quantity: 1, totalPrice: productData.price });
    }
  
    // Actualiza el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  



  
  return (
    <main>
        <NavBar></NavBar>
        <section className="w-full mt-[2rem] h-auto">
      <h1
        id="big-title"
        className="text-center font-semibold md:text-5xl min-[320px]:text-sm text-[#ffffff] uppercase shadow-md bg-[#FB823B] py-1 mb-9"
      >
        Product Details
      </h1>
    </section>

    <div className="md:w-[65%] min-[320px]:w-[90%] min-[320px]:h-[900px] sm:h-fit md:min-w-90 sm:max-h-96 md:h-[600px] overflow-hidden lg:max-h-fit bg-slate-100 px-1 sm:block md:flex mx-auto my-auto mb-12 border md:space-x-2">
      {/* Image */}
      <div className="md:w-1/2 sm:w-full md:h-full sm:h-[200px] flex justify-center content-center mx-auto my-auto px-5 py-5">
        <div className="md:h-full h-full bg-slate-700 md:flex sm:w-full justify-center">
        {productData && (
          <>
          <img
            id="image"
            className="object-cover w-full h-full min-[320px]:mi-h-[250px]"
            src={productData.image}
            alt=""
          />
          </>
        )}
          
        </div>
      </div>

      {/* Text and buttons */}
      <div className="md:w-1/2 sm:w-full md:h-full lg:h-90 bg-slate-100 px-9 md:py-0 lg:py-2 mx-auto my-auto">
      {productData && (
        <>
          <h1
            id="title"
            className="text-slate-800 font-bold lg:text-[2rem] lg:mt-9 md:mt-9 md:text-2xl sm:text-sm min-[320px]:text-[24px] sm:my-2 border-b-[2px] pb-2 border-dashed text-center"
          >
            {productData.title}
          </h1>
        
        <h1
          id="price"
          className="text-gray-600 font-semibold lg:my-6 md:my-2 md:text-lg sm:text-sm sm:mt-2 min-[320px]:mt-3 min-[320px]:mb-2 underline"
        >
          USD {productData.price}
        </h1>
        <span id="id" className="text-slate-400 md:text-base min-[320px]:text-sm ">
          SKU: {productData.sku}
        </span>
        <p
          id="description"
          className="2xl:h-[150px] xl:h-[150px] lg:h-[200px] md:h-[70px] min-[320px]:h-[100px] overflow-scroll text-slate-700 lg:font-medium md:font-medium sm:font-light my-2 text-center lg:text-sm xl:text-base md:text-[10px] sm:text-[14px] content-center xl:py-2 lg:py-6 md:py-1 border-y-2 text-wrap overflow-y-auto overflow-x-hidden"
        >
          {productData.description}
        </p>
        </>)}

        <div className="w-full 2xl:h-[270px] xl:h-[215px] lg:h-[180px] md:h-[150px] min-[320px]:h-[350px]">
          
        {productData && typeof productData.size === 'string' && (
          <div className="inline-flex rounded-md justify-center w-full space-x-2" role="group">
            {productData.size.split(',').map((size, index) => (
              <button key={index} type="button" onClick={() => setSelectedSize(size)} className={`inline-flex items-center justify-center min-[320px]:h-5 md:h-3 lg:h-7 w-9 text-center md:text-[6px] lg:text-[8px] min-[320px]:text-[7px] text-sm font-medium border border-[#161616] ${
                selectedSize === size ? 'bg-[#FB823B] text-white' : 'bg-[#161616] text-white'
              } hover:border-[#FB823B] hover:text-white focus:z-10 focus:ring-1 focus:ring-[#161616] focus:text-white hover:bg-[#FB823B] focus:bg-[#FB823B] sizeBTN`}
            >
            {size}
            </button>
            ))}
          </div>
)}
          <div className="w-full 2xl:h-[180px] xl:h-[150px] lg:h-[120px] md:h-[80px] min-[320px]:h-[160px] 2xl:mt-2 xl:mt-2 lg:mt-2 md:mt-2 min-[320px]:mt-2 lg:flex lg:flex-wrap md:justify-center md:content-center min-[320px]:content-center min-[320px]:space-y-2 lg:space-x-2 xl:space-x-2 2xl:space-x-9 md:space-y-2 lg:space-y-2 xl:space-y-2 2xl:space-y-0 border-y-2 border-dashed">
            <button id="buy-btn" className="bg-[#FB823B] hover:bg-[#fa955a] scale-90 hover:scale-95 duration-100 text-white min-[320px]:w-[150px] xl:px-5 xl:py-2 lg:px-5 lg:py-2 md:px-2 md:py-1 min-[320px]:px-2 min-[320px]:py-1 min-[320px]:justify-center min-[320px]:text-[20px] xl:text-base md:text-xs rounded-md flex min-[320px]:mx-auto md:mx-auto xl:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"
                    className="xl:w-4 xl:h-4 md:w-[0.7rem] md:h-[0.7rem] min-[320px]:w-[1rem] min-[320px]:h-[32px] my-auto mr-1">
                <path fillRule="evenodd"
                  d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
                  clipRule="evenodd"/>
                </svg>
                Buy
            </button>

            <button id="add-big-btn" onClick={addToCart} className="text-gray-500 hover:text-[#FB823B] scale-90 hover:scale-95 duration-100 xl:px-5 xl:py-2 lg:px-5 lg:py-2 md:px-2 md:py-1 min-[320px]:px-2 min-[320px]:text-[12px] rounded-sm min-[320px]:hidden md:flex xl:text-base md:text-[8px] md:mx-auto">
                Add to Cart
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="xl:w-5 xl:h-4 lg:w-4 md:w-[0.7rem] md:h-[0.7rem] my-auto ml-1">
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"/>
                </svg>
            </button>
            <button id="add-small-btn" onClick={addToCart} className="text-gray-500 hover:text-[#FB823B] scale-90 hover:scale-95 duration-100  xl:px-5 xl:py-2 lg:px-5 lg:py-2 md:px-2 md:py-1 min-[320px]:flex min-[320px]:px-2 min-[320px]:py-1 min-[320px]:text-[20px] min-[320px]:justify-center min-[320px]:w-[150px]  rounded-full md:hidden xl:text-base md:text-xs min-[320px]:mx-auto md:mx-auto">
            Add
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="xl:w-4 xl:h-4 lg:w-4 md:w-[0.7rem] md:h-[0.7rem] min-[320px]:w-4 min-[320px]:h-[32px] my-auto ml-1">
                    <path
                      d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                    />
                </svg>
            </button>

            {/* More buttons */}
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </main>
  );
};
