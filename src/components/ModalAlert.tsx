import React, { useState } from 'react';

const ModalAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 max-w-[600px] mx-auto">
      {/* Fondo oscuro para deshabilitar la interacción con el resto de la página */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Cuadro de alerta */}
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
      <div className='flex justify-center items-center bg-[#FB823B] w-full space-x-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>

        <h1 className='text-center text-2xl  text-white'>Attention</h1>
      </div>
      
        <p className="my-6 border-y-2 py-6 text-gray-500 [word-spacing:15px] tracking-widest border-dashed text-sm  ">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#FB823B] text-white px-4 py-2 hover:bg-[#ff8b50]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalAlert;