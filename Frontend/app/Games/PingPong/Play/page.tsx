'use client'

import React,{ useEffect, useState } from 'react';
import './style/style.css'
import NavBar from "@/app/Components/NavBar/NavBar";
import {map,speed,Online,pause_game,other_tools} from '../Components/Settings'
let alpha=1,access=1,bot_access = 1;
let XPingPongStart=0,XPingPongEnd=0,YPingPongStart=0,YPingPongEnd=0;
let XBall=0, YBall=0,Xdirection=1,Ydirection=0;
let Yping1Start=0,Yping1End=0,Yping2Start=0,Yping2End=0;
let result1=0,result2=0;
let key1="",key2="";
let interval,interval1,interval2,interval3;
export default function PingPong()
{
    let [ballxpos, setBallXPos] = useState(50);
    const [ballypos, setBallYPos] = useState(50);
    const [ping1ypos, setPing1YPos] = useState(42);
    const [ping2ypos, setPing2YPos] = useState(42);
    const PingPongStyle = {
        top: "20%",
        left: "10%",
        width: "80%",
        height: "40%",
    };
    const ballStyle = {
        left: `${ballxpos}%`,
        top: `${ballypos}%`,
        width: "25px",
        height: "25px",
    };
    const ping2style = {
        top: `${ping2ypos}%`,
        left: "99.5%",
        width: "0.5%",
        height: "15%",
    };
    const ping1style = {
        top: `${ping1ypos}%`,
        width: "0.5%",
        height: "15%",
    };
    useEffect(()=>
    {
        let vitesse = (40 / speed);
        interval = setInterval(()=>
        {
            let elem = document.getElementById("PingPong_Game");
            let ball = document.getElementById("ball");
            if(elem != null)
            {
                if(XPingPongStart != elem.getBoundingClientRect().left || YPingPongStart != elem.getBoundingClientRect().top)
                {
                    XPingPongStart = elem.getBoundingClientRect().left;
                    XPingPongEnd = elem.getBoundingClientRect().left + elem.getBoundingClientRect().width;
                    YPingPongStart = elem.getBoundingClientRect().top;
                    YPingPongEnd = elem.getBoundingClientRect().top + elem.getBoundingClientRect().height;
                    // console.log("XPingPongStart " + XPingPongStart + " XPingPongEnd " + XPingPongEnd);
                    // console.log("YPingPongStart " + YPingPongStart + " YPingPongEnd " + YPingPongEnd);
                }
            }
            if(ball != null)
            {
                if(XBall != ball.getBoundingClientRect().left || YBall != ball.getBoundingClientRect().top)
                {
                    XBall = parseInt((ball.getBoundingClientRect().left).toString());
                    YBall = parseInt((ball.getBoundingClientRect().top).toString());
                    // console.log("XBall " + XBall + " YBall " + YBall)
                } 
            }
        },vitesse);
        interval1 = setInterval(()=>
        {
            if(access)
            {
                if (XBall + 26 < XPingPongEnd && Xdirection === 1)
                    setBallXPos(ballxpos + 0.5);
                else
                {
                    if((YBall > Yping2End || YBall < Yping2Start - 20) && Xdirection === 1)
                    {
                        ballxpos = 50;
                        result1++;
                    }
                    Xdirection = 0;
                }
                if (XBall > XPingPongStart && Xdirection === 0)
                    setBallXPos(ballxpos - 0.5);
                else
                {
                    if((YBall > Yping1End || YBall < Yping1Start - 20) && Xdirection === 0)
                    {
                        setBallXPos(50);
                        result2++;
                    }
                    Xdirection = 1;
                }
                if(YBall + 26 < YPingPongEnd && Ydirection === 1)
                {
                    if(XBall % alpha === 0)
                        setBallYPos(ballypos + 0.6);
                }
                else
                    Ydirection = 0;

                if(YBall > YPingPongStart && Ydirection === 0)
                {
                    if(XBall % alpha === 0)
                        setBallYPos(ballypos - 0.6);
                }
                else
                    Ydirection = 1;
            }
        },vitesse);
        interval2 = setInterval(()=>
        {
            const ping1 = document.getElementById("ping1");
            const ping2 = document.getElementById("ping2");
            if(ping1 != null)
            {
                Yping1Start = parseInt((ping1.getBoundingClientRect().top).toString());
                Yping1End = parseInt((ping1.getBoundingClientRect().top + ping1.getBoundingClientRect().height).toString());
            }
            if (ping2 != null)
            {
                Yping2Start = parseInt((ping2.getBoundingClientRect().top).toString());
                Yping2End = parseInt((ping2.getBoundingClientRect().top + ping2.getBoundingClientRect().height).toString());
            }
            if(key2 === 's')
            {
                if(YPingPongEnd > Yping1End + 20)
                    setPing1YPos(ping1ypos + 2);
            }
            else if (key2 === 'w')
            {
                if(YPingPongStart < Yping1Start - 20)
                    setPing1YPos(ping1ypos - 2);
            }
            if(key1 === 'ArrowDown')
            {
                if(YPingPongEnd > Yping2End + 20)
                    setPing2YPos(ping2ypos + 2);
            }
            else if (key1 === 'ArrowUp')
            {
                if(YPingPongStart < Yping2Start - 20)
                    setPing2YPos(ping2ypos - 2);
            }
        },vitesse);
        function getRandomNumber(min:number, max:number) {
            var randomBytes = new Uint32Array(1);
            window.crypto.getRandomValues(randomBytes);
            var randomNumber = randomBytes[0] / (Math.pow(2, 32) - 1);
            return Math.floor(randomNumber * (max - min + 1)) + min;
        }
        if(other_tools != 1)
        { 
            interval3 = setInterval(()=>
            {
                let elem = document.getElementById("ping1");
                let pos = YBall - 480;
                if (elem != null)
                {
                    if(YPingPongEnd > YBall + 55 && YPingPongStart < YBall - 55)
                    {
                        if(getRandomNumber(0, 50) === 5 && bot_access === 1)
                        {
                            bot_access = 0;
                            setTimeout(()=>{bot_access = 1;},1500);
                        }
                        else if (bot_access === 1)
                        {
                            elem.style.top = `${pos}px`;
                            bot_access = 1;
                        }
                    }
                }
            },vitesse);
        }

        const handleKeyPress1 = (event :any) =>
        {
            key1 = event.key;
            if(key1 === 'p' && pause_game === 1)
            {
                if(access === 1)
                    access = 0;
                else
                    access = 1;
            }
        }
        const handleKeyPress2 = (event :any) =>
        {
            key2 = event.key;
        }
        const handleKeyrelease = (event :any) =>
        {
            key2 = "";
            key1 = "";
        }
        document.addEventListener('keydown', handleKeyPress1);
        if(other_tools === 1)
            document.addEventListener('keydown', handleKeyPress2);
        document.addEventListener('keyup', handleKeyrelease);
        return ()=>
        {
            clearInterval(interval);
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
            document.removeEventListener('keydown', handleKeyPress1);
            if(other_tools === 1)
                document.removeEventListener('keydown', handleKeyPress2);
            document.addEventListener('keyup', handleKeyPress2);
        };
    });

    return(
        <main className="absolute inset-x-0 inset-y-0">
            <NavBar idd="1"/>
            <div id="informaion">
                <div id="user1">mabdelou</div>
                <div id="user2">aabdelou</div>
                <div id="result1">{result1}</div>
                <div id="center">-</div>
                <div id="result2">{result2}</div>
            </div>
            <div  style={PingPongStyle} id="PingPong_Game">
                <div id="ping1" style={ping1style}></div>
                <div id="ping2"  style={ping2style}></div>
                <div id="ball" style={ballStyle}></div>
            </div>
            <div id="map_name">
                <div>Map-V{map}</div>
            </div>
        </main>
        );
}