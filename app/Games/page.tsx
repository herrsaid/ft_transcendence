'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PingPong from './Components/PingPong';
import Chess from './Components/Chess';
import CardGames from './Components/CardGames';
import './Style/style.css'
import NavBar from '../Components/NavBar/NavBar';


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
  let swap;
  for(let a=0;a<3;a++)
  {
    if(arr[a] === CardGames1)
    {
        if(a === 0)
          arr[a].style.left = "50%";
        else if (a === 1)
          arr[a].style.left = "0%";
        else if (a === 2)
          arr[a].style.left = "25%";
    }
    else if(arr[a] === Chess1)
    {
      if(a === 0)
          arr[a].style.left = "25%";
        else if (a === 1)
          arr[a].style.left = "-25%";
        else if (a === 2)
          arr[a].style.left = "0%";
    }
    else if(arr[a] === PingPong1)
    {
      if(a === 0)
          arr[a].style.left = "0%";
      else if (a === 1)
        arr[a].style.left = "-50%";
      else if (a === 2)
        arr[a].style.left = "-25%";
    }
  }
  swap = arr[0];
  arr[0] = arr[1];
  arr[1] = arr[2];
  arr[2] = swap;
}

function TransRight(arr: any)
{
  let swap;
  for(let a=0;a<3;a++)
  {
    if(arr[a] === CardGames1)
    {
        if(a === 0)
          arr[a].style.left = "25%";
        else if (a === 1)
          arr[a].style.left = "50%";
        else if (a === 2)
          arr[a].style.left = "0%";
    }
    else if(arr[a] === Chess1)
    {
      if(a === 0)
          arr[a].style.left = "0%";
        else if (a === 1)
          arr[a].style.left = "25%";
        else if (a === 2)
          arr[a].style.left = "-25%";
    }
    else if(arr[a] === PingPong1)
    {
      if(a === 0)
          arr[a].style.left = "-25%";
      else if (a === 1)
        arr[a].style.left = "0%";
      else if (a === 2)
        arr[a].style.left = "-50%";
    }
  }
  swap = arr[2];
  arr[2] = arr[1];
  arr[1] = arr[0];
  arr[0] = swap;
}

function MouveLeft()
{
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
  let swap;
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
  return (

    <main className="absolute inset-x-0 inset-y-0 text-white">
      <NavBar idd="1"/>
      <div id="Games" className='relative games flex justify-center'>
        <button onClick={MouveLeft} className="left_button"><p> &lt;&lt; </p></button>
        <CardGames/>
        <Chess/>
        <PingPong/>
        <button onClick={MouveRight}  className="right_button"><p> &gt;&gt; </p></button>
      </div>
    </main>
  )
}