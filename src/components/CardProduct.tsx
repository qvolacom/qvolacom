import React, { useContext, useEffect, useState } from 'react';
import '../app/styles/fonts.css'
import { LanguageContext } from '../context/LanguageContext';

interface CardProps {
  title?: string;
  description?: string;
  linkedto?: string;
  image?: string;
  price?: number;
  sku?: string;
}


const Card: React.FC<CardProps> = ({ title, description, linkedto, image, price, sku }) => {
  const { language, toggleLanguage } = useContext(LanguageContext);


  return (
    <section
      className="sm:max-w-64 bg-white border-1 border-black shadow-red-400 sm:min-w-[270px] min-[320px]:max-w-44 min-[320px]:min-w-44 sm:max-h-auto sm:min-h-96 min-[320px]:min-h-[264px] rounded-lg overflow-hidden shadow-md card"
      style={{ boxShadow: '0px 4px 2px rgb(185, 185, 185)' }}
    >
      {/* Card Image Section */}
      <img
        className="card-img w-full sm:h-56 min-[320px]:h-32 object-containt shadow"
        src={image}
        alt="Card Image"
        width={'auto'}
        height={'auto'}
      />

      {/* Card Description Section */}
      <div className="card-description sm:px-6 min-[320px]:px-2 py-3">
        {title ? (
          <div className="font-bold text-[#FB823B] underline md:text-[16px] min-[320px]:text-[11px] text-left mb-2 text-nowrap">
            {title}
          </div>
        ) : (
          <div className="font-bold text-[#FB823B] underline md:text-[16px] min-[320px]:text-[11px] text-left mb-2 text-nowrap">
            Titulo de Ejemplo
          </div>
        )}

        {price ? (
          <span className="text-gray-500 underline">${price}</span>
        ) : (
          <span className="text-gray-500 underline">$No Price</span>
        )}

        {/* If the description have information: */}
        {description ? (
          <p className="text-[#161616] overflow-hidden sm:text-xs min-[320px]:text-[10px] min-[320px]:h-[30px] md:h-[45px] my-2">
            {description}
          </p>
        ) : (
          /* Else */
          <p className="text-[#161616] overflow-hidden sm:text-xs min-[320px]:text-[10px] min-[320px]:h-[30px] md:h-[45px] my-2">
            Inserte una descripción para este producto
          </p>
        )}
      </div>

      {/* Card Button Section */}
      <div className="justify-center flex pb-2">
      <a
        href={`/product/${encodeURIComponent(sku || '')}`}
        className="flex flex-row justify-center text-white cursor-pointer bg-[#FB823B] focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-95 scale-90 gap-x-2 opacity-90 hover:opacity-100"
      >
        {/* Bigger Screens Button Text */}
        {language.startsWith('es') ? (
          <span id="btn-standart" className="min-[320px]:hidden sm:inline bigLink">
            Explorar
          </span>
        ) : (
          <span id="btn-standart" className="min-[320px]:hidden sm:inline bigLink">
            Explore
          </span>
        )}
        

        {/* Mobile Button Text */}

        {language.startsWith('es') ? (
          <span id="btn-small" className="sm:hidden min-[320px]:inline text-xs text-center smallLink">
            Explorar
          </span>
        ):(
          <span id="btn-small" className="sm:hidden min-[320px]:inline text-xs text-center smallLink">
            Explore
          </span>
        )}

        

        {/* Button Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="sm:size-6 min-[320px]:size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </a>

      </div>
    </section>
  );
};

export default Card;
