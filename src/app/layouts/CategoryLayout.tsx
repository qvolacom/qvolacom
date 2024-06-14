"use client"
import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import { LanguageContext } from "../../context/LanguageContext";

const CategoryLayout: React.FC<{ title?: string }> = ({ title }) => {
  const [elements, setElements] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "category/all";

  const { language, toggleLanguage } = useContext(LanguageContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        const elementsData = data.categoryMasterList;
        setElements(elementsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const itemsPerPage = 24;
    let currentPage = 1;

    const items = document.querySelectorAll('#grid-container > .card');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    const renderItems = () => {
      items.forEach((item, index) => {
        if (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) {
          if (item instanceof HTMLElement) {
            item.style.display = 'block';
          }
        } else {
          if (item instanceof HTMLElement) {
            item.style.display = 'none';
          }
        }
      });

      if (pageInfo) {
        pageInfo.textContent = `${currentPage} / ${totalPages}`;
      }

      const prevButton = document.getElementById('prev-button') as HTMLButtonElement | null;
      const nextButton = document.getElementById('next-button') as HTMLButtonElement | null;
      
      if (prevButton) {
        prevButton.disabled = currentPage === 1;
      }
      if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
      }
    };

    const handlePrevClick = () => {
      currentPage--;
      renderItems();
    };

    const handleNextClick = () => {
      currentPage++;
      renderItems();
    };

    if (prevButton) {
      prevButton.addEventListener('click', handlePrevClick);
    }

    if (nextButton) {
      nextButton.addEventListener('click', handleNextClick);
    }

    renderItems();

    return () => {
      if (prevButton) {
        prevButton.removeEventListener('click', handlePrevClick);
      }
      if (nextButton) {
        nextButton.removeEventListener('click', handleNextClick);
      }
    };
  }, [elements]);

  return (
    <section className="pt-12 pb-2 font-custom">
      {language.startsWith('es') ? (
        <h1 className="category-title text-center font-semibold min-[320px]:text-xl md:text-3xl text-[#ffffff] uppercase shadow shadow-orange-700 bg-[#FB8238] py-1">
          Categorias
        </h1>
      ) : (
        <h1 className="category-title text-center font-semibold min-[320px]:text-xl md:text-3xl text-[#ffffff] uppercase shadow shadow-orange-700 bg-[#FB8238] py-1">
          Category
        </h1>
      )}
      <div id="grid-container" className="grid 2xl:grid-cols-6 lg:grid-cols-3 lg:gap-y-4 min-[321px]:grid-cols-2 min-[321px]:gap-y-4 min-[300px]:grid-cols-1 min-[300px]:gap-y-6 my-12 py-2 place-items-center">
        {elements.map((element, index) => (
          <Card
            key={element.id}
            id={index}
            title={element.title}
            image={element.picture}
            description={element.description}
            linkedto="/products"
          />
        ))}
      </div>
      {error && <div>Error: {error}</div>}
      <div className="flex w-full flex-wrap justify-center border-slate-900 border-opacity-10 border-y-[0.8px] py-2 mb-5 shadow-sm space-x-6">
        <button
          id="prev-button"
          disabled
          className="rounded bg-[#FB823B] hover:bg-[#ff9a60] text-white border-[1.1px] hover:cursor-pointer border-[#161616] shadow-sm"
        >
          {/* Icono anterior */}

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

        </button>
        <span
          id="page-info"
          className="rounded bg-[#FB823B] text-white text-[10px] text-center justify-center align-middle my-auto py-2 px-2 border-[1.1px] border-[#161616] shadow-sm cursor-default"
        ></span>
        <button
          id="next-button"
          className="rounded bg-[#FB823B] hover:bg-[#ff9a60] text-white  border-[1.1px] hover:cursor-pointer border-[#161616] shadow-sm"
        >
          {/* Icono siguiente */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>


        </button>
      </div>
    </section>
  );
};

export default CategoryLayout;
