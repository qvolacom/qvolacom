"use client"
import React, { useEffect } from 'react';
import PayPal from '../../components/PayPal'
import '../styles/fonts.css'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function Home() {

    return (
        <main>
            <NavBar></NavBar>
            <section className=''>
                <div className='w-full bg-[#FB823B]'>
                    <h1 className='text-white text-4xl text-center my-20'>Payment Details</h1>
                </div>
                <div className='flex justify-center items-center h-[500px] '>
                    <div className='justify-center items-center my-auto h-full flex'>
                        <div className='w-96'>
                            <PayPal></PayPal> 
                        </div>
                       
                    </div>
                    
                </div>
                
            </section>
            <Footer></Footer>
        </main>
    );
};