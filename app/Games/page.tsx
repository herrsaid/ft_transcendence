'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PingPong from './Components/PingPong';
import Chess from './Components/Chess';
import CardGames from './Components/CardGames';
import './Style/style.css'
import NavBar from '../Components/NavBar/NavBar';
import {right_trans_obj1,left_trans_obj1,right_trans_obj2,left_trans_obj2,right_trans_obj3,left_trans_obj3} from './tools';

export const sharedData = {
  id: null,
  id1: null,
  id2: null,
  id3: null,
  id4: null,
  id5: null,
};
let wait_proscess = 1,num_mod = 3;
let arr = new Array(
  );

  function sleep(ms :any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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

async function TransLeft(arr: any)
{
  let swap;
  if(sharedData.id === null && sharedData.id1 === null && sharedData.id2 === null
      && sharedData.id3 === null && sharedData.id4 === null && sharedData.id5 === null)
  {
    wait_proscess = 0;
    if (num_mod == 3)
      left_trans_obj1(arr);
    if (num_mod == 2)
      left_trans_obj2(arr);
    if (num_mod == 1)
      left_trans_obj3(arr);
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
  let swap;
  if(sharedData.id === null && sharedData.id1 === null && sharedData.id2 === null
    && sharedData.id3 === null && sharedData.id4 === null && sharedData.id5 === null)
  {
    wait_proscess = 0;
    if (num_mod == 3)
      right_trans_obj1(arr);
    if (num_mod == 2)
      right_trans_obj2(arr);
    if (num_mod == 1)
      right_trans_obj3(arr);
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


export default function Games() {
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
        let size;
        if(games != null)
          size = games.getBoundingClientRect().width;
        if (size > 1500)
        {
          num_mod = 3;
          arr[0].style.left = "15%";
          arr[0].style.width = "20%";
          arr[0].style.opacity = "1";
          arr[1].style.left = "40%";
          arr[1].style.width = "20%";
          arr[1].style.opacity = "1";
          arr[2].style.left = "65%";
          arr[2].style.width = "20%";
          arr[2].style.opacity = "1";
        }
        else if(size < 1500 && size > 750)
        {
          num_mod = 2;
          arr[0].style.left = "13%";
          arr[0].style.opacity = "1";
          arr[0].style.zIndex = "1";
          arr[0].style.width = "35%";
          arr[1].style.left = "53%";
          arr[1].style.width = "35%";
          arr[1].style.opacity = "1";
          arr[1].style.zIndex = "1";
          arr[1].style.width = "35%";
          arr[2].style.opacity = "0";
          arr[2].style.zIndex = "0";
          arr[2].style.width = "35%";
        }
        else if(size < 750)
        {
          num_mod = 1;
          arr[0].style.left = "20%";
          arr[0].style.width = "60%";
          arr[0].style.opacity = "1";
          arr[0].style.zIndex = "1";
          arr[1].style.width = "60%";
          arr[1].style.opacity = "0";
          arr[1].style.zIndex = "0";
          arr[2].style.width = "60%";
          arr[2].style.opacity = "0";
          arr[2].style.zIndex = "0";
        }
      }
    },1000);
  },[]);
  return (

    <main className="absolute inset-x-0 inset-y-0 text-white">
      <NavBar idd="1"/>
      <div id="Games" className='relative games flex justify-center'>
        <button onClick={MouveLeft} id="left_button"><p> &lt;&lt; </p></button>
        <Link href="/Games/CardGames">
          <CardGames/>
        </Link>
        <Link href="/Games/Chess">
          <Chess/>
        </Link>
        <Link href="/Games/PingPong">
          <PingPong/>
        </Link>
        <button onClick={MouveRight}  id="right_button"><p> &gt;&gt; </p></button>
      </div>
    </main>
  )
}