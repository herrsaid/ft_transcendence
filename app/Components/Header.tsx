'use client'

import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import Link from 'next/link';
import '../Style/style.css'
import MovingLine from './MovingLine';

export default function Header(props)
{
  useEffect(() =>
    {
      function start()
      {
        let idd = document.getElementById("1");
        idd.style.transform = "scale(1.5)";
        const buttonRect = idd.getBoundingClientRect();
        const xstart =  buttonRect.left;
        const xend = (buttonRect.left+buttonRect.width);
        props.setTargetX({start: xstart,end: xend});
      }
    start();
    },[]);
    function aftersleep() {
      for(let a=0;a < 6 ; a++)
        { 
          let idd= document.getElementById(a.toString());
          if(idd.style.transform ==  "scale(1.5)")
          {
            const buttonRect = idd.getBoundingClientRect();
            const xstart =  buttonRect.left;
            const xend = (buttonRect.left+buttonRect.width);
            props.setTargetX({start: xstart,end: xend});
          
          }
        }
    }
    const handlemouseleave= () => {
      setTimeout(aftersleep, 250);
    };
    return(
      <div>
        <div onMouseLeave={handlemouseleave} className="relative flex px-3 py-1 font-mono shadow-white text-white">
          <Link href="/">
          <div className= "px-3 py-1 mx-2">
            <Icon title="Legends" setTargetX={props.setTargetX} idd="0"/>
          </div>
          </Link>
          <Link href="/Games">
          <div className= "px-3 py-1 mx-2" >
            <Icon title="Games" setTargetX={props.setTargetX} idd="1"/>
          </div>
          </Link>
          <Link href="/Stream">
          <div className= "px-3 py-1 mx-2">
            <Icon title="Stream" setTargetX={props.setTargetX} idd="2"/>
          </div>
          </Link>
          <Link href="/Search">
          <div className= "px-3 py-1 mx-2">
            <Icon title="Search" setTargetX={props.setTargetX} idd="3"/>
          </div>
          </Link>
          <Link href="/Notification">
          <div className= "absolute right-25 px-3 py-1 mx-2">
            <Icon title="Notification" setTargetX={props.setTargetX} idd="4"/>
          </div>
          </Link>
          <Link href="/profile">
          <div className= "absolute right-0 px-3 py-1 mx-2">
            <Icon title="Profile" setTargetX={props.setTargetX} idd="5"/>
          </div>
          </Link>
        </div>
          <MovingLine targetX={props.targetX} />
      </div>
    );
}
