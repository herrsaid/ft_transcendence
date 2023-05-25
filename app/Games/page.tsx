'use client'

import React, { useEffect, useState } from 'react';
import  Header  from '../Components/Header';
import MovingLine from './Columents/MovingLine'
import Link from 'next/link';
import PingPong from './Columents/PingPong';
import Chess from './Columents/Chess';
import CardGames from './Columents/CardGames';
import './Style/style.css'


export default function Home() {
  const [targetX, setTargetX] = useState({start:0,end:0});
  return (

    <main className="absolute inset-x-0 inset-y-0 text-white bg">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Jua"></link>
      <Header setTargetX={setTargetX} />
      <MovingLine targetX={targetX} />
      <div className='flex space-x-20  justify-center content '>
        <CardGames/>
        <Chess/>
        <Link href="/Games/PingPong">
          <PingPong/>
        </Link>
      </div>
    </main>
  )
}