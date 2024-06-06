"use client"
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const CategoryLayout: React.FC<{ title?: string }> = ({ title }) => {
  const [elements, setElements] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = "http://localhost:5000/api/category/all";

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

  return (
    <section className="pt-12 pb-2 font-custom">
      {title ? (
        <h1 className="category-title text-center font-semibold min-[320px]:text-xl md:text-3xl text-[#ffffff] uppercase shadow shadow-orange-700 bg-[#FB8238] py-1">
          {title}
        </h1>
      ) : (
        <h1 className="category-title text-center font-semibold min-[320px]:text-xl md:text-3xl text-[#ffffff] uppercase shadow shadow-orange-700 bg-[#FB8238] py-1">
          Category
        </h1>
      )}
      <div className="grid 2xl:grid-cols-6 lg:grid-cols-3 lg:gap-y-4 min-[321px]:grid-cols-2 min-[321px]:gap-y-4 min-[300px]:grid-cols-1 min-[300px]:gap-y-6 my-12 py-2 place-items-center">
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
    </section>
  );
};

export default CategoryLayout;
