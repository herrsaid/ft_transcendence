'use client'

import React,{ useEffect, useState } from 'react';
import './style/style.css'
import { Navbar } from 'react-bootstrap';
let left = 1,top=1,n=5,result1=0,result2=0,pause=0;


export default function PingPong()
{
    const [ballxpos, setBallXPos] = useState();
    const [ballypos, setBallYPos] = useState();
    const [ping1ypos, setPing1YPos] = useState();
    const [ping2ypos, setPing2YPos] = useState();
    const ping1style = {
        top: `${ping1ypos}px`
    }
    const ballStyle = {
        left: `${ballxpos}px`,
        top: `${ballypos}px`
    };
    const ping2style = {
        top: `${ping2ypos}px`
    }
    return(
        <main className="absolute inset-x-0 inset-y-0">
            <Navbar idd="2"/>
            <div className='PingPong' id="game">
                <div id="ping1" style={ping1style}></div>
                <div id="ping2"  style={ping2style}></div>
                <div id="user1">mabdelou</div>
                <div id="user2">aabdelou</div>
                <div id="result1">{result1}</div>
                <div id="center">-</div>
                <div id="result2">{result2}</div>
                <div id="ball" style={ballStyle}></div>
            </div>
        </main>
        );
}