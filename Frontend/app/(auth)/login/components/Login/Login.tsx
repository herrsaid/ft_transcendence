"use client"
import Link from 'next/link'
import './Login.css'
import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Welcome to 42PONG!",
          "Get Ready for Pong Battles!",
          "Challenge Your Friends!",
          "Step Up Your Game!",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 70,
      }}
    />
  );
}


export default function Login()
{

      
    return(
        <>
         
  <section className="hero text-white" id='hero'>
    <div className="container mx-auto flex items-center justify-center h-full text-center">
      <div>
        <div>
        <h1 className="text-4xl font-bold mb-4"><span className="example-selector"><Type/></span></h1>
        </div>
        <div className=''>
      <Link className="bg-transparent text-blue-400 font-semibold py-2 px-4 rounded-lg inline-block" href={`${process.env.NEXT_PUBLIC_BACK_IP}/auth/42`}>
            <button className="hero-button">
            Get Started
          </button>
        </Link>

        {/* <Link className="bg-transparent text-blue-400 font-semibold py-2 px-4 rounded-lg inline-block" href={`${process.env.NEXT_PUBLIC_BACK_IP_G}/auth/google`}>
            <button className="hero-button">
            Google
          </button>
        </Link> */}
      </div>
      </div>
     
    </div>
  </section>
        </>
    );
}