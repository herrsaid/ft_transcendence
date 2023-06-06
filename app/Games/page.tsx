'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PingPong from './Components/PingPong';
import Chess from './Components/Chess';
import CardGames from './Components/CardGames';
import './Style/style.css'
import NavBar from '../Components/NavBar/NavBar';
import { Syne } from 'next/font/google';


let CardGames1 :any;
let Chess1 :any;
let PingPong1 :any;
let arr = new Array(
  );

function Desappear(arr: any)
{
  for(let a=0;a<3;a++)
    arr[a].style.opacity = "0";
}

function Appear(arr: any)
{
  for(let a=0;a<3;a++)
    arr[a].style.opacity = "1";
}

function TransLeft(arr: any)
{
  let swap,id,id1,id2;
  let xpos1=15,xpos2=40,xpos3=65;
  let opacity=1;
  for(let a=0;a<3;a++)
  {
    if(a === 0)
    {
      id = setInterval(()=>
      {
        xpos1--;
        if(xpos1 === 2)
          xpos1 = 80;
        if(xpos1 > 65)
          opacity += 0.2;
        else
          opacity -= 0.1;
        arr[a].style.left = `${xpos1.toString()}%`;
        arr[a].style.opacity = `${opacity.toString()}`;
        if(xpos1 === 65)
        {
          clearInterval(id);
          xpos1 = 15;
        }
      },25);
    }
    else if (a === 1)
    {
      id1 = setInterval(()=>
      {
        xpos2--;
        arr[a].style.left = `${xpos2.toString()}%`;
        if(xpos2 === 15)
        {
          clearInterval(id1);
          xpos2 = 40;
        }
      },25);
    }
    else if (a === 2)
    {
      id2 = setInterval(()=>
      {
        xpos3--;
        arr[a].style.left = `${xpos3.toString()}%`;
        if(xpos3 === 40)
        {
          clearInterval(id2);
          xpos3 = 65;
        }
      },25);
    }
  }
  swap = arr[0];
  arr[0] = arr[1];
  arr[1] = arr[2];
  arr[2] = swap;
}

function TransRight(arr: any)
{
  let swap,id,id1,id2;
  let xpos1=15,xpos2=40,xpos3=65;
  let opacity=1;
  for(let a=0;a<3;a++)
  {
    if(a === 0)
    {
      id = setInterval(()=>
      {
        xpos1++;
        arr[a].style.left = `${xpos1.toString()}%`;
        if(xpos1 === 40)
        {
          clearInterval(id);
          xpos1 = 15;
        }
      },25);
    }
    else if (a === 1)
    {
      id1 = setInterval(()=>
      {
        xpos2++;
        arr[a].style.left = `${xpos2.toString()}%`;
        if(xpos2 === 65)
        {
          clearInterval(id1);
          xpos2 = 40;
        }
      },25);
    }
    else if (a === 2)
    {
      id2 = setInterval(()=>
      {
        xpos3++;
        if(xpos3 < 15)
          opacity += 0.2;
        else
          opacity -= 0.1;
        if(xpos3 === 80)
          xpos3 = 2;
          arr[a].style.opacity = `${opacity.toString()}`;
          arr[a].style.left = `${xpos3.toString()}%`;
        if(xpos3 === 15)
        {
          clearInterval(id2);
          xpos3 = 65;
        }
      },25);
    }
  }
  swap = arr[2];
  arr[2] = arr[1];
  arr[1] = arr[0];
  arr[0] = swap;
}

function MouveLeft()
{
  let left_button = document.getElementById("left_button");
  let scale = 1,set = 0;
  let id = setInterval(()=>
  {
    if (set === 0)
      scale -= 0.01;
    else
      scale += 0.01;
    if(scale < 0.8)
      set = 1;
    left_button.style.transform = `scale(${scale})`;
    if(scale > 1)
      clearInterval(id);
    
  },1);
  if(arr.length === 0)
  {
    CardGames1 = document.getElementById("CardGames");
    Chess1 = document.getElementById("Chess");
    PingPong1 = document.getElementById("PingPong");
    arr = new Array
    (
      CardGames1,
      Chess1,
      PingPong1
    );
  }
  Desappear(arr);
  TransLeft(arr);
  Appear(arr);
}

function MouveRight()
{
  let right_button = document.getElementById("right_button");
  let scale = 1,set = 0;
  let id = setInterval(()=>
  {
    if (set === 0)
      scale -= 0.01;
    else
      scale += 0.01;
    if(scale < 0.8)
      set = 1;
    right_button.style.transform = `scale(${scale})`;
    if(scale > 1)
      clearInterval(id);
    
  },1);
  if(arr.length === 0)
  {
    CardGames1 = document.getElementById("CardGames");
    Chess1 = document.getElementById("Chess");
    PingPong1 = document.getElementById("PingPong");
    arr = new Array
    (
      CardGames1,
      Chess1,
      PingPong1
    );
  }
  Desappear(arr);
  TransRight(arr);
  Appear(arr);
}

export default function Home() {
  useEffect(()=>
  {
    function start()
    {
      const CardGames1 = document.getElementById("CardGames");
      const Chess1 = document.getElementById("Chess");
      const PingPong1 = document.getElementById("PingPong");
      CardGames1.style.left = "15%";
      // Chess1.style.left = "15%";
      PingPong1.style.left = "65%";
    }
    start();
  },[]);
  return (

    <main className="absolute inset-x-0 inset-y-0 text-white">
      <NavBar idd="1"/>
      <div id="Games" className='relative games flex justify-center'>
        <button onClick={MouveLeft} id="left_button"><p> &lt;&lt; </p></button>
        <CardGames/>
        <Chess/>
        <PingPong/>
        <button onClick={MouveRight}  id="right_button"><p> &gt;&gt; </p></button>
      </div>
    </main>
  )
}