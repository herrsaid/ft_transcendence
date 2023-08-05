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

      
    function changeBackgroundColor() {
        const colors = ["#1b1a4f", "#28274d", "#363570", "#18184a", "#8a2be2"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const newColor = colors[randomIndex];
        const heroElement = document.getElementById('hero');
            if (heroElement) {
                heroElement.style.backgroundColor = newColor;
            }
      }
  
      
      changeBackgroundColor();
      setInterval(changeBackgroundColor, 2000);
  


    return(
        <>
         
  <section className="hero text-white" id='hero'>
    <div className="container mx-auto flex items-center justify-center h-full text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4"><span className="example-selector"><Type/></span></h1>


        
        <Link href={`${process.env.NEXT_PUBLIC_BACK_IP}/auth/42`}>
            <button className="hero-button">
            Get Started
          </button>
        </Link>

        {/* <Link href={`${process.env.NEXT_PUBLIC_BACK_IP_G}/auth/google`}>
            <button className="hero-button">
            Sign in with Google
          </button>
        </Link> */}
      </div>
    </div>
  </section>
  <script src="dist/autotyping.min.js"></script>
        </>
    );
}