"use client"
import React, { useEffect } from 'react';

const Carousel = () => {
    useEffect(() => {
        const carouselElement = document.getElementById('carousel-example');

        const items = [
            {
                position: 0,
                el: document.getElementById('carousel-item-1'),
            },
            {
                position: 1,
                el: document.getElementById('carousel-item-2'),
            },
            {
                position: 2,
                el: document.getElementById('carousel-item-3'),
            },
        ];

        let currentIndex = 0;

        function showNextImage() {
            // Ocultar la imagen actual
            items[currentIndex].el.classList.add('hidden');
            
            // Calcular el próximo índice
            currentIndex = (currentIndex + 1) % items.length;
            
            // Mostrar la próxima imagen con animación
            const nextItem = items[currentIndex].el;
            nextItem.classList.remove('hidden');
            nextItem.classList.add('fade-in-up');
            
            // Remover la clase de animación después de que termine
            nextItem.addEventListener('animationend', function() {
                nextItem.classList.remove('fade-in-up');
            }, { once: true });
        }

        // Cambiar imagen cada 5 segundos
        setInterval(showNextImage, 5000);
    }, []);

    return (
        <div className="slider flex bg-slate-500 w-full md:h-[423px] min-[320px]:h-[200px] min-[320px]:mb-0 sm:mb-5 my-5 mt-8 content-center items-center overflow-hidden shadow-md">
            <div className="flex items-center content-center mx-auto space-x-4 w-full">
                <div className="slider-body relative flex flex-wrap items-center content-center w-full h-[423px]">
                    <img id="carousel-item-1" className="block w-full h-auto object-fill ease-in-out" src="https://img.freepik.com/vector-gratis/plantilla-banner-venta-horizontal_23-2148897328.jpg" alt="" />
                    <img id="carousel-item-2" className="hidden w-full h-auto object-fill ease-in-out" src="https://cdn.venngage.com/template/thumbnail/small/69e1f1ae-2012-4a26-9943-b21e54dad6ef.webp" alt="" />
                    <img id="carousel-item-3" className="hidden w-full h-auto object-fill ease-in-out" src="https://thumbs.dreamstime.com/z/plantilla-de-banner-venta-ropa-para-ni%C3%B1os-dise%C3%B1o-publicidad-descuento-tiendas-antecedentes-promoci%C3%B3n-los-peque%C3%B1os-anuncios-la-252306137.jpg" alt="" />
                </div>
            </div>

            <style jsx>{`
                .fade-in-up {
                    animation: fadeInUp 1s ease-in-out forwards;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Carousel;
