'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PingPong from './Components/PingPong';
import Chess from './Components/Chess';
import CardGames from './Components/CardGames';
import './Style/style.css'
import NavBar from '../Components/NavBar/NavBar';
import { Syne } from 'next/font/google';

let swap,id = null,id1 = null,id2 = null,id3 = null,id4 = null,id5 = null;
let wait_proscess = 1;
let arr = new Array(
  );

function scale_button(obj :any)
{
  let scale = 1,set = 0;
  let id = setInterval(()=>
  {
    if (set === 0)
      scale -= 0.01;
    else
      scale += 0.01;
    if(scale < 0.8)
      set = 1;
      obj.style.transform = `scale(${scale})`;
    if(scale > 1)
      clearInterval(id);
    
  },1);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function TransLeft(arr: any)
{
  let xpos1=15,xpos2=40,xpos3=65;
  let opacity=1;
  wait_proscess = 0;
  if(id3 === null && id4 === null && id5 === null)
  {
    for(let a=0;a<3;a++)
    {
      if(a === 0)
      {
        id3 = setInterval(()=>
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
            clearInterval(id3);
            id3 = null;
            xpos1 = 15;
          }
        },25);
      }
      else if (a === 1)
      {
        id4 = setInterval(()=>
        {
          xpos2--;
          arr[a].style.left = `${xpos2.toString()}%`;
          if(xpos2 === 15)
          {
            clearInterval(id4);
            id4 = null;
            xpos2 = 40;
          }
        },25);
      }
      else if (a === 2)
      {
        id5 = setInterval(()=>
        {
          xpos3--;
          arr[a].style.left = `${xpos3.toString()}%`;
          if(xpos3 === 40)
          {
            clearInterval(id5);
            id5 = null;
            xpos3 = 65;
          }
        },25);
      }
    }
    await sleep(1000);
    swap = arr[0];
    arr[0] = arr[1];
    arr[1] = arr[2];
    arr[2] = swap;
    wait_proscess = 1;
  }
}

async function TransRight(arr: any)
{
  let xpos1=15,xpos2=40,xpos3=65;
  let opacity=1;
  wait_proscess = 0;
  if(id === null && id1 === null && id2 === null)
  {
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
            id = null;
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
            id1 = null;
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
            id2 = null;
            xpos3 = 65;
          }
        },25);
      }
    }
    await sleep(1000);
    swap = arr[2];
    arr[2] = arr[1];
    arr[1] = arr[0];
    arr[0] = swap;
    wait_proscess = 1;
  }
}

function MouveLeft()
{
  scale_button(document.getElementById("left_button"));
  TransLeft(arr);
}

function MouveRight()
{

  scale_button(document.getElementById("right_button"));
  TransRight(arr);
}

export default function Home() {
  useEffect(()=>
  {
    arr = new Array
    (
      document.getElementById("CardGames"),
      document.getElementById("Chess"),
      document.getElementById("PingPong")
    );
    setInterval(()=>
    {
      if (wait_proscess === 1)
      {
        const games = document.getElementById("Games");
        const size = games.getBoundingClientRect().width;
        if (size > 1500)
        {
          arr[0].style.left = "15%";
          arr[0].style.opacity = "1";
          arr[1].style.left = "40%";
          arr[1].style.opacity = "1";
          arr[2].style.left = "65%";
          arr[2].style.opacity = "1";
        }
        else if(size < 1500 && size > 750)
        {
          arr[0].style.left = "25%";
          arr[0].style.opacity = "1";
          arr[1].style.left = "55%";
          arr[1].style.opacity = "1";
          arr[2].style.opacity = "0";
        }
        else if(size < 750)
        {
          arr[0].style.left = "40%";
          arr[0].style.opacity = "1";
          arr[1].style.opacity = "0";
          arr[2].style.opacity = "0";
        }
      }
    },1000);
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