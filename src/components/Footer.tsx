"use client"
import React, { useContext, useEffect, useState } from "react";
import isologo from "../../public/favicon.svg";
import Image from 'next/image';
import { LanguageContext } from '../context/LanguageContext';


const Footer: React.FC = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <footer className="rounded-t-lg shadow bg-[#161616] mt-20">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Image src={isologo} className="h-14 w-12" alt="Quevolacom Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Quevola.com</span>
          </a>
          {language.startsWith('es')? (
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Sobre Nosotros</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Politica de Privacidad</a>
            </li>
            <li>
              <a href="/products" className="hover:underline me-4 md:me-6">Nuestros Productos</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contacto</a>
            </li>
            <li className="ml-9">
              <a href="/" className="hover:underline">
              </a>
            </li>
          </ul>
          ) : (
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="/products" className="hover:underline me-4 md:me-6">Our Products</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
            <li className="ml-9">
              <a href="/" className="hover:underline">
              </a>
            </li>
          </ul>
          )}
        </div>
        <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
        {language.startsWith('es') ? (
          <span className="block text-sm sm:text-center text-gray-400">QvolaCom.com 2024 - Creado Por <a href="#" className="hover:underline">CorellaInnovations™</a>.</span>
        ):
        (
          <span className="block text-sm sm:text-center text-gray-400">QvolaCom.com 2024 - Create By <a href="#" className="hover:underline">CorellaInnovations™</a>.</span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
