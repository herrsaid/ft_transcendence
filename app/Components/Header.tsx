'use client'

import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import Link from 'next/link';
import './Header.css'
import MovingLine from './MovingLine';

let old_pos;
export default function Header(props)
{
  useEffect(() =>
    {
      setInterval(()=>
      {
        const games = document.getElementById("Games");
        const size = games.getBoundingClientRect().width;
        if(old_pos != size)
        {
          old_pos = size;
          let idd = document.getElementById(props.idd);
          let txt = idd.querySelector("button");
          idd.style.transform = "scale(1.5)";
          txt.style.textShadow = "2px 2px 10px rgba(255, 255, 255, 1)";
          const buttonRect = idd.getBoundingClientRect();
          const xstart =  buttonRect.left;
          const xend = (buttonRect.left+buttonRect.width);
          props.setTargetX({start: xstart,end: xend});
        }
      },100);
    // start();
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
      setTimeout(aftersleep, 500);
    };
    return(
      <div  className="Header" onMouseLeave={handlemouseleave}>
        <div className="Div" >
          <Link href="/">
          <div className= "Legends">
            <Icon title="Legends" setTargetX={props.setTargetX} idd="0"/>
          </div>
          </Link>
          <Link href="/Games">
          <div className= "Games" >
            <Icon title="Games" setTargetX={props.setTargetX} idd="1"/>
          </div>
          </Link>
          <Link href="/Stream">
          <div className= "Stream">
            <Icon title="Stream" setTargetX={props.setTargetX} idd="2"/>
          </div>
          </Link>
          <Link href="/Search">
          <div className= "Search">
            <Icon title="Search" setTargetX={props.setTargetX} idd="3"/>
          </div>
          </Link>
          <Link href="/Notification">
          <div className= "Notification">
            <Icon title="Notification" setTargetX={props.setTargetX} idd="4"/>
          </div>
          </Link>
          <Link href="/profile">
          <div className= "Profilelink">
            <Icon title="Profile" setTargetX={props.setTargetX} idd="5"/>
          </div>
          </Link>
        </div>
          <MovingLine targetX={props.targetX} />
      </div>
    );
}
