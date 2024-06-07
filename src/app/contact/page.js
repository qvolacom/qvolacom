"use client"
import React, { useEffect } from 'react';
import {initializeContactForm} from '../contact/code';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


export default function Home() {

    useEffect(() => {
        initializeContactForm(); // Llamar la función para inicializar el formulario de contacto
    }, []); // El array vacío asegura que se ejecute una vez después del montaje

    return (
        <main className="">
            <NavBar></NavBar>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 id="contact-form-title" className="mb-8 text-4xl tracking-tight font-extrabold text-center bg-[#FB823B] text-[#ffffff]">Contact Us
                </h2>
                <p id="contact-form-text" className="mb-5 lg:mb-16 font-light text-center text-[#ffffff] min-[320px]:text-sm sm:text-lg">Fill out our
                    contact form and we'll get back to you as soon as possible. We're eager to help you with any questions
                    or concerns you may have!
                </p>
                <form action="#" className="space-y-8">
                    <div>
                        <label id="email-label" htmlFor="contact-form-email" className="block mb-2 text-sm font-medium text-[#FB823B]">Your
                            email</label>
                        <input type="email" id="contact-form-email"
                            className="shadow-sm border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-300 border-black placeholder-gray-600 placeholder-opacity-30 text-black dark:focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                            placeholder="name@gmail.com" required />
                    </div>
                    <div>
                        <label id="contact-form-subject" htmlFor="subject"
                            className="block mb-2 text-sm font-medium text-[#FB823B]">Subject</label>
                        <input type="text" id="subject"
                            className="block p-3 w-full text-sm rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-300 border-black placeholder-gray-600 placeholder-opacity-30 text-black focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                            placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label id="contact-form-message" htmlFor="message" className="block mb-2 text-sm font-medium text-[#FB823B]">Your
                            message</label>
                        <textarea id="message" rows={6}
                            className="block p-2.5 w-full text-sm rounded-lg shadow-sm border-1 border-black bg-gray-300 placeholder-gray-600 placeholder-opacity-30 text-black focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Leave a comment..."></textarea>
                    </div>
                    <button id="contact-form-btn" type="submit"
                        className="flex-row justify-center text-white cursor-pointer bg-[#FB823B] focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-95 scale-90 gap-x-2 opacity-90 hover:opacity-100">Send
                        message</button>
                </form>
            </div>
            <Footer></Footer>
        </main>
    );
};