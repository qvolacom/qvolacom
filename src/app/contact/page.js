"use client"
import { initializeContactForm } from "../contact/code";
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        initializeContactForm();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = process.env.NEXT_PUBLIC_API_URL + "form/customer/contact-us";

        const data = {
            email: email,
            subject: subject,
            message: message,
            lang: localStorage.getItem('Language') || 'en',
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        if (email !== "" && subject !== "" && message !== "") {
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Respuesta del servidor:', data);
                    setEmail('');
                    setSubject('');
                    setMessage('');
                })
                .catch(error => {
                    console.error('Hubo un problema con la solicitud fetch:', error);
                });

            console.log("Send Email");
        } else {
            console.log("ERROR");
        }
    };

    return (
        <main className="">
            <NavBar />
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-center bg-[#FB823B] text-[#ffffff]">Contact Us</h2>
                <p className="mb-5 lg:mb-16 font-light text-center text-[#ffffff] min-[320px]:text-sm sm:text-lg">
                    Fill out our contact form and we'll get back to you as soon as possible. We're eager to help you with any questions or concerns you may have!
                </p>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="contact-form-email" className="block mb-2 text-sm font-medium text-[#FB823B]">Your email</label>
                        <input type="email" id="contact-form-email"
                            className="shadow-sm border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-300 border-black placeholder-gray-600 placeholder-opacity-30 text-black"
                            placeholder="name@gmail.com" required
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-[#FB823B]">Subject</label>
                        <input type="text" id="subject"
                            className="block p-3 w-full text-sm rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-300 border-black placeholder-gray-600 placeholder-opacity-30 text-black"
                            placeholder="Let us know how we can help you" required
                            value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#FB823B]">Your message</label>
                        <textarea id="message" rows={6}
                            className="block p-2.5 w-full text-sm rounded-lg shadow-sm border-1 border-black bg-gray-300 placeholder-gray-600 placeholder-opacity-30 text-black focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Leave a comment..."
                            value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <button type="submit"
                        className="flex-row justify-center text-white cursor-pointer bg-[#FB823B] focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-95 scale-90 gap-x-2 opacity-90 hover:opacity-100">
                        Send message
                    </button>
                </form>
            </div>
            <Footer />
        </main>
    );
}
