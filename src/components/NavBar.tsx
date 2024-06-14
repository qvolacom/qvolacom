"use client";

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import isologo from '../../public/images/isologo.png';
import ModalAlert from '../components/ModalAlert';
import { LanguageContext } from '../context/LanguageContext';
import usFlag from '../../public/us.svg';
import esFlag from '../../public/es.svg';


import '../app/styles/fonts.css';

const NavBar: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { language, toggleLanguage } = useContext(LanguageContext);
  

  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {

    


    const updateList = () => {
      const storedArray = localStorage.getItem('cart');
      if (storedArray) {
        setProductsList(JSON.parse(storedArray));
        setTotalPrice(calculateTotalPrice(JSON.parse(storedArray)));

        // Obtener la cantidad total de productos en el carrito desde localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setTotalItems(totalItems);
        //console.log('Actualizado')
      } else {
        //console.log("No hay datos en localStorage con la clave 'Cart'.");
      }
    };

    updateList();

    const handleClick = () => {
      updateList();
    };

    

    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar && window.scrollY > 1) {
        navbar.classList.add('fixed', 'top-0', 'left-0');
      } else {
        navbar?.classList.remove('fixed', 'top-0', 'left-0');
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  
  // Función para calcular el precio total del carrito
  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.totalPrice;
    });
    return totalPrice;
  };

  
  const buyNowcart = () =>{
    if (totalItems <= 0){
      setShowAlert(true);
    }else{
      window.location.href = "/checkout";
    }
    
  }

  const removeFromCart = (index) => {
    const updatedList = [...productsList];
    updatedList.splice(index, 1);
    setProductsList(updatedList);
    localStorage.setItem('cart', JSON.stringify(updatedList));
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    setCartVisible(false);
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
    setMenuVisible(false);
    document.body.style.overflow = cartVisible ? 'auto' : 'hidden';
  };

  return (
    <nav className="bg-[#161616] border-black border-opacity-20 border-b-2 w-full shadow content-center z-10" id="navbar">
      <div className="px-20 flex mdflex-wrap items-center md:justify-center lg:justify-start min-[320px]:justify-center space-x-8 mx-auto p-4">
        <Link href="/" className="flex items-center md:mr-6 min-[320px]:mr-0">
          <Image src={isologo} width={56} height={56} alt="Isologo" className="rounded-lg" />
          <span className="text-[#ffffff] font-semibold text-xl">Vola.Com</span>
        </Link>
        <div className="md:flex items-center space-x-7">
            {language.startsWith('es') ? (
            <>
            <Link href="/" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base min-[320px]:hidden md:flex md:text-[10px]">Inicio</Link>
            <Link href="/category" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base min-[320px]:hidden md:flex md:text-[10px]">Categorias</Link>
            <Link href="/products" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base min-[320px]:hidden md:flex md:text-[10px]">Productos</Link>
            <Link href="/contact" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base min-[320px]:hidden md:flex md:text-[10px]">Contacto</Link>
            </>
          ) : (
            <>
            <Link href="/" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base min-[320px]:hidden md:flex md:text-[10px]">Home</Link>
            <Link href="/category" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base min-[320px]:hidden md:flex md:text-[10px]">Category</Link>
            <Link href="/products" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base min-[320px]:hidden md:flex md:text-[10px]">Products</Link>
            <Link href="/contact" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base min-[320px]:hidden md:flex md:text-[10px]">Contact-us</Link>
            </>
          )}
          <div className="absolute md:block min-[320px]:top-[30px] min-[320px]:right-[260px] min-[321px]:top-[30px] min-[321px]:right-[70px] md:right-[20px] lg:right-16 xl:right-20">
            <button onClick={toggleCart} className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {totalItems > 0 && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-5 h-5 bg-red-500 text-white rounded-full text-xs animate-pulse">
                  {totalItems}
                </div>
              )}
            </button>


            {cartVisible && (
              <div className="w-full h-full z-50 fixed bg-black bg-opacity-50 justify-center items-center top-0 left-0">
              <div className="bg-white 2xl:w-1/5 xl:w-[30%] lg:w-[32%] md:w-[50%] min-[320px]:w-[80%] h-[520px] text-center p-2 border-2 shadow-md absolute top-10 md:right-0 min-[320px]:right-10" style={{animation: "slideRight 0.5s forwards"}}>
                <div className="flex justify-start content-center px-5 flex-wrap w-full h-20 space-x-3 border-b-2 border-dashed">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="md:size-6 min-[320px]:size-5 my-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  {language.startsWith('es') ? (
                    <>
                    <h1 className="text-[#161616] font-semibold min-[320px]:font-bold min-[320px]:text-sm md:text-xl">Carrito de Compras</h1>
                    </>
                  ):(
                    <>
                    <h1 className="text-[#161616] font-semibold min-[320px]:font-bold min-[320px]:text-sm md:text-xl">Shopping Cart</h1>
                    
                    </>
                  )}
                  
                  <svg onClick={toggleCart} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="md:size-6 min-[320px]:size-5 absolute right-2 top-3 my-auto hover:rotate-90 hover:stroke-gray-600 hover:cursor-pointer transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
        
                <ul id='cart-list' className="h-[280px] py-2 mt-2 overflow-y-scroll border-dashed border-b-2">
                {productsList.map((product, index) => (
                  <li key={index} className='text-gray-600 md:text-sm min-[320px]:text-xs text-left ml-2 mb-1'>
                  <button onClick={() => removeFromCart(index)} className='mr-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  </button>$
                  {product.totalPrice} - x{product.quantity} - {product.size} - {product.title}
                  
                </li>
                ))}
                </ul>
        
                <div className="flex w-full">
                  <span id="total-price" className="w-full text-end px-5 mt-1">Total: {totalPrice}$</span>
                </div>
        
                <div className="h-[100px]">
                  <button id="cart-buy-now" onClick={buyNowcart} className="bg-[#FB823B] my-2 w-64 h-[48px] rounded-sm text-white hover:bg-[#fd9559] duration-75">
                  {language.startsWith('es') ? (
                    <>
                    Comprar Ahora
                    </>
                  ):(
                    <>
                    Buy Now
                    </>
                  )}
                  </button>
                  <button id="continue-cart" onClick={toggleCart} className="text-gray-500 hover:text-gray-800 group transition-colors flex justify-center text-center flex-wrap mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="size-5 my-auto group-hover:stroke-gray-700 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    {language.startsWith('es') ? (
                    <>
                    Continuar Comprando
                    </>
                  ):(
                    <>
                    Continue buying
                    </>
                  )}
                    
                  </button>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
        <button onClick={toggleMenu} className="text-white md:hidden absolute right-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 12h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
      </div>
      {menuVisible && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-[#161616] border-y-2 border-black py-2">
          {language.startsWith('es') ? (
              <>
              <Link href="/" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base">Inicio</Link>
              <Link href="/category" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base">Categorias</Link>
              <Link href="/products" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base">Productos</Link>
              <Link href="/contact" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base">Contacto</Link>
              </>
            ):(
              <>
              <Link href="/" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base">Home</Link>
              <Link href="/category" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base">Category</Link>
              <Link href="/products" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base">Products</Link>
              <Link href="/contact" className="hover:text-[#FB823B] text-[#ffffff] duration-75 hover:underline lg:text-base">Contact-us</Link>
              
              </>
            )}
          
        </div>
      )}
      <div>
      {language.startsWith('es') ? (
        <>
          {showAlert && <ModalAlert message="Su carrito está vacío. ¿Por qué no explorar nuestra selección de productos y agrega algunos artículos? ¡Estamos seguros de que encontrarás algo que te guste!" onClose={handleClose} />}
          <div className={showAlert ? 'pointer-events-none' : ''}>
            {/* Aquí va el resto del contenido de tu aplicación */}
          </div>
        </>
      ):( 
        <>
          {showAlert && <ModalAlert message="Your shopping cart is currently empty. Why not explore our selection of products and add some items? We're sure you'll find something you like!" onClose={handleClose} />}
          <div className={showAlert ? 'pointer-events-none' : ''}>
            {/* Aquí va el resto del contenido de tu aplicación */}
          </div>
        </>
      )}
    </div>

      <button onClick={toggleLanguage} className="mb-4 px-2 py-1 text-[#ffffff] bg-[#212121] border-white shadow-sm border z-10 min-[320px]:right-10 right-32 rounded absolute">
              {language === 'es' ? <Image src={usFlag} alt={'English'} className='size-4 hover:size-5 duration-75'></Image> : <Image src={esFlag} alt={'English'} className='size-4 hover:size-5 duration-75'></Image>}
      </button>
    </nav>
  );
};

export default NavBar;



