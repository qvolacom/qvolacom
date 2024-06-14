"use client"
import React, { useEffect } from 'react';
import PayPal from '../../components/PayPal'
import '../styles/fonts.css'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function Home() {

    return (
        <main>
            <section className=' bg-no-repeat bg-center'> {/*bg-[url("../../public/images/isologo.png")]*/}
                <div className='flex justify-center items-center h-screen '>
                    <div className='justify-center items-center h-full flex'>
                        <div className='md:w-96 min-[320px]:w-80 min-[320px]:mt-48 md:block'>
                            <PayPal></PayPal> 
                        </div>
                    </div> 
                </div>
            </section>
        </main>
    );
};