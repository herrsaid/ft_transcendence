import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PingPong from './Components/PingPong';
import Chess from './Components/Chess';
import CardGames from './Components/CardGames';
import './Style/style.css'
import NavBar from '../Components/NavBar/NavBar';


export default function Home() {
  return (

    <main className="absolute inset-x-0 inset-y-0 text-white">
      <NavBar idd="1"/>
      <div className='relative games flex space-x-40 justify-center'>
        <CardGames/>
        <Chess/>
        <PingPong/>
      </div>
    </main>
  )
}