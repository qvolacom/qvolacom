"use client"
import { initializeContactForm } from "../contact/code";
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import React, {useContext, useState, useEffect } from 'react';
import ModalAlert from "../../components/ModalAlert";
import { LanguageContext } from '../../context/LanguageContext';

export default function Home() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const { language, toggleLanguage } = useContext(LanguageContext);
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const handleClose = () => {
      setShowAlert(false);
    };

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
            lang: language,
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
                        if (language.startsWith('es')) {
                            setMessageAlert('Hubo un problema con la solicitud, inténtelo nuevamente más tarde.');
                        }else{
                            setMessageAlert('There was a problem with the request, please try again later');
                        }
                        setShowAlert(true);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Respuesta del servidor:', data);
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    if (language.startsWith('es')) {
                        setMessageAlert('Envío de correo exitoso');
                    }else{
                        setMessageAlert('Mail sending successfully');
                    }
                    setShowAlert(true);
                })
                .catch(error => {
                    console.error('There was a problem with the request:', error);
                    if (language.startsWith('es')) {
                        setMessageAlert('Hubo un problema con la solicitud, inténtelo nuevamente más tarde.');
                    }else{
                        setMessageAlert('There was a problem with the request, please try again later');
                    }
                    setShowAlert(true);
                });

            console.log("Send Email");
            
            
        } else {
            console.log("ERROR");
        }
    };

    return (
        <main className="">
            <NavBar />
            {language.startsWith('es')? (
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-center bg-[#FB823B] text-[#ffffff]">Contactenos</h2>
                <p className="mb-5 lg:mb-16 font-light text-center text-[#ffffff] min-[320px]:text-sm sm:text-lg">
                Complete nuestro formulario de contacto y nos comunicaremos con usted lo antes posible. ¡Estamos ansiosos por ayudarlo con cualquier pregunta o inquietud que pueda tener!
                </p>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="contact-form-email" className="block mb-2 text-sm font-medium text-[#FB823B]">Su Correo</label>
                        <input type="email" id="contact-form-email"
                            className="shadow-sm border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-300 border-black placeholder-gray-600 placeholder-opacity-30 text-black"
                            placeholder="nombre@gmail.com" required
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-[#FB823B]">Titulo</label>
                        <input type="text" id="subject"
                            className="block p-3 w-full text-sm rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-300 border-black placeholder-gray-600 placeholder-opacity-30 text-black"
                            placeholder="Dejenos Saber Como Podemos Ayudarle" required
                            value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#FB823B]">Su Mensaje</label>
                        <textarea id="message" rows={6}
                            className="block p-2.5 w-full text-sm rounded-lg shadow-sm border-1 border-black bg-gray-300 placeholder-gray-600 placeholder-opacity-30 text-black focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Deje un comentario..."
                            value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <button type="submit"
                        className="flex-row justify-center text-white cursor-pointer bg-[#FB823B] focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-95 scale-90 gap-x-2 opacity-90 hover:opacity-100">
                        Enviar Mensaje
                    </button>
                </form>
            </div>
            ) : (
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
            )}

            {showAlert && <ModalAlert message={messageAlert} onClose={handleClose} />}
            <div className={showAlert ? 'pointer-events-none' : ''}>
                {/* Aquí va el resto del contenido de tu aplicación */}
            </div>
            <Footer />
        </main>
    );
}
