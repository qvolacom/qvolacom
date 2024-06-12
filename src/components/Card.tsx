import React from 'react';

interface CardProps {
  id: Number;
  title?: string;
  description?: string;
  linkedto: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ id, title, description, linkedto, image }) => {
  return (
    <section
      className="sm:max-w-64 bg-white border-1 border-black sm:min-w-[270px] min-[320px]:max-w-44 min-[320px]:min-w-44 sm:max-h-auto sm:min-h-96 min-[320px]:min-h-[264px] rounded-lg overflow-hidden shadow-lg card"
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

        {description ? (
          <p className="text-[#161616] sm:text-xs min-[320px]:text-xs min-[320px]:h-[30px] md:h-[50px] overflow-hidden">
            {description}
          </p>
        ) : (
          <p className="text-[#161616] sm:text-xs min-[320px]:text-xs min-[320px]:h-[30px] md:h-[50px] overflow-hidden">
            Inserte una descripción para este producto
          </p>
        )}
      </div>

      {/* Card Button Section */}
      <div className="justify-center flex pb-2 min-[320px]:mt-2 md:mt-[-10px]">
      <a
        href={linkedto} className="flex flex-row justify-center text-white cursor-pointer bg-[#FB823B] focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-95 scale-90 gap-x-2 opacity-90 hover:opacity-100">
        {/* Bigger Screens Button Text */}
        <span className="min-[320px]:hidden sm:inline bigLinkCAT">
          Explore
        </span>

        {/* Mobile Button Text */}
        <span className="sm:hidden min-[320px]:inline text-[12px] text-center smallLinkCAT">
          Explore
        </span>

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
