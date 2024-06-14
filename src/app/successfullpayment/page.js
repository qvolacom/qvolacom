"use client"
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

export default function Home() {

  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <main>
      <NavBar></NavBar>
      {language.startsWith('es') ? (
      <section className='h-screen flex'>
        <div className="bg-white text-gray-500 px-8 py-6 h-[300px] min-[320px]:h-[250px] rounded-lg shadow-lg border-2 my-auto mx-auto">
            <div className='flex w-full mb-4 justify-center items-center bg-[#FB823B] space-x-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

              <h1 className="text-2xl min-[319px]:text-xs min-[321px]:text-base font-bold text-white text-center bg-[#FB823B]">Pago Realizado</h1>
            </div>
            <div className='border-y-2 border-dashed mb-4 h-[150px] min-[320px]:h-[125px] min-[310px]:h-[120px] text-center justify-center py-4'>
              <p className="text-lg min-[321px]:text-sm min-[310px]:text-[10px] mt-[1.7rem] min-[321px]:mt-[0.7rem] min-[319px]:mt-[0.1rem]">Gracias por Comprar!</p>
              <p className="text-lg min-[321px]:text-sm min-[310px]:text-[10px]">El pago ha sido realizado con exito.</p>
            </div>
            
            <a href="/" className="bg-[#FB823B] hover:bg-[#fc9458] text-white px-4 py-2 rounded-md text-lg min-[320px]:text-sm font-semibold mt-10">
              <span>Pagina Inicial</span>
            </a>
        </div>
      </section>
      ) : (
      <section className='h-screen flex'>
        <div className="bg-white text-gray-500 px-8 py-6 h-[300px] min-[320px]:h-[250px] rounded-lg shadow-lg border-2 my-auto mx-auto">
            <div className='flex w-full mb-4 justify-center items-center bg-[#FB823B] space-x-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

              <h1 className="text-2xl min-[319px]:text-xs min-[321px]:text-base font-bold text-white text-center bg-[#FB823B]">Payment Successful</h1>
            </div>
            <div className='border-y-2 border-dashed mb-4 h-[150px] min-[320px]:h-[125px] min-[310px]:h-[120px] text-center justify-center py-4'>
              <p className="text-lg min-[321px]:text-sm min-[310px]:text-[10px] mt-[1.7rem] min-[321px]:mt-[0.7rem] min-[319px]:mt-[0.1rem]">Thank you for your purchase!</p>
              <p className="text-lg min-[321px]:text-sm min-[310px]:text-[10px]">The payment has been completed successfully.</p>
            </div>
            
            <a href="/" className="bg-[#FB823B] hover:bg-[#fc9458] text-white px-4 py-2 rounded-md text-lg min-[320px]:text-sm font-semibold mt-10">
              <span>HomePage</span>
            </a>
        </div>
      </section>
      )}
      
      <Footer></Footer>
    </main>
  );
}