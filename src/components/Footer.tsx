import React from "react";
import isologo from "../../public/images/isologo.png";
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="rounded-t-lg shadow bg-[#161616] mt-20">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Image src={isologo} className="h-14 w-12" alt="Quevolacom Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Quevolacom</span>
          </a>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="32" viewBox="0 0 32 32">
                  <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect>
                  <path d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z" fill="#a62842"></path>
                  <path d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z" fill="#a62842"></path>
                  {/* Agrega el resto de las partes del SVG */}
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-gray-400">QvolaCom.com 2024 - Create By <a href="#" className="hover:underline">CorellaInnovations™</a>.</span>
      </div>
    </footer>
  );
};

export default Footer;
