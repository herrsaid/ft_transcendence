'use client'

import './style/style.css'
import { useEffect, useState } from 'react';
import { player1 } from '../../Socket/start_game_socket'
import { player2 } from '../../Socket/start_game_socket'
import {MapNumber,Speed,host} from '../../Components/Settings'

let alpha: number = 1,first_conection: boolean = false;
let XPingPongStart: number = 0,XPingPongEnd: number = 0,YPingPongStart: number = 0,YPingPongEnd: number = 0;
let XBall: number = 0, YBall: number = 0,ballraduis: number = 0,Xdirection: number = 1,Ydirection: number = 0;
let Yping1Start: number = 0,Yping1End: number = 0,Yping2Start: number = 0,Yping2End: number = 0;
let result1: number = 0,result2: number = 0;
let key1: string = "",key2: string = "";
export default function PingPong()
{
	let [ballxpos, setBallXPos] = useState(50);
	let [ballypos, setBallYPos] = useState(50);
	let [ping1ypos, setPing1YPos] = useState(42);
	let [ping2ypos, setPing2YPos] = useState(42);
	let [test, settest] = useState(0);
	const PingPongStyle = {
		top: "20%",
		left: "10%",
	};
	const ballStyle = {
		left: `${ballxpos}%`,
		top: `${ballypos}%`,
	};
	const ping2style = {
		top: `${ping2ypos}%`,
		left: "99.5%",
	};
	const ping1style = {
		top: `${ping1ypos}%`,
	};
	function getpos()
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
			}
		}
		if(ball != null)
		{
			if(XBall != ball.getBoundingClientRect().left || YBall != ball.getBoundingClientRect().top)
			{
				XBall = parseInt((ball.getBoundingClientRect().left).toString());
				YBall = parseInt((ball.getBoundingClientRect().top).toString());
			}
			ballraduis = ball.getBoundingClientRect().right - ball.getBoundingClientRect().left;
		}
	}
	function changepos()
	{
		const ping1 = document.getElementById("ping1");
		const ping2 = document.getElementById("ping2");
		if(host)
		{
			if (ping2 != null)
			{
				Yping2Start = parseInt((ping2.getBoundingClientRect().top).toString());
				Yping2End = parseInt((ping2.getBoundingClientRect().top + ping2.getBoundingClientRect().height).toString());
			}
			if(key1 === 'ArrowDown' || key2 === 's')
			{
				if(YPingPongEnd > Yping2End + 20)
					setPing2YPos(ping2ypos + 2);
			}
			else if (key1 === 'ArrowUp' || key2 === 'w')
			{
				if(YPingPongStart < Yping2Start - 20)
					setPing2YPos(ping2ypos - 2);
			}
		}
		else
		{
			if(ping1 != null)
			{
				Yping1Start = parseInt((ping1.getBoundingClientRect().top).toString());
				Yping1End = parseInt((ping1.getBoundingClientRect().top + ping1.getBoundingClientRect().height).toString());
			}
			if(key1 === 'ArrowDown' || key2 === 's')
			{
				if(YPingPongEnd > Yping1End + 20)
					setPing1YPos(ping1ypos + 2);
			}
			else if (key1 === 'ArrowUp' || key2 === 'w')
			{
				if(YPingPongStart < Yping1Start - 20)
					setPing1YPos(ping1ypos - 2);
			}
		}
	}
	async function send_receive_pos()
	{
		// console.log("here is the value: "+ host);
		if(host)
		{
			// console.log('here1');
			const host_data = {
				p2yp: ping2ypos,
				byp: ballypos,
				bxp: ballxpos,
				rlt1: result1,
				rlt2: result2,
			}
			player1.emit('send_player1_data',host_data);
			await player1.on('send_player1_data',(data)=> {
			setPing1YPos(data);
			const ping1 = document.getElementById("ping1");
			if(ping1 != null)
			{
				Yping1Start = parseInt((ping1.getBoundingClientRect().top).toString());
				Yping1End = parseInt((ping1.getBoundingClientRect().top + ping1.getBoundingClientRect().height).toString());
			}
			});
			// player1.on('conection_closed',()=> {
			// 	first_conection = false;
			// });
		}
		else
		{
			// console.log('here2');
			player2.emit('send_player2_data',ping1ypos);
			await player2.on('send_player2_data',(data)=> {
			setPing2YPos(data.p2yp);
			setBallXPos(data.bxp);
			setBallYPos(data.byp);
			result1 = data.rlt1;
			result2 = data.rlt2;
			const ping2 = document.getElementById("ping2");
			if(ping2 != null)
			{
				Yping2Start = parseInt((ping2.getBoundingClientRect().top).toString());
				Yping2End = parseInt((ping2.getBoundingClientRect().top + ping2.getBoundingClientRect().height).toString());
			}
		});
		// player1.on('conection_closed',()=> {
		// 	first_conection = false;
		// });
		}
	}
	function checkpos()
	{
		if (XBall + ballraduis < XPingPongEnd && Xdirection === 1)
			setBallXPos(ballxpos + 0.5);
		else
		{
			if((YBall > Yping2End || YBall + ballraduis < Yping2Start) && Xdirection === 1)
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
			if((YBall > Yping1End || YBall + ballraduis < Yping1Start) && Xdirection === 0)
			{
				setBallXPos(50);
				result2++;
			}
			Xdirection = 1;
		}
		if(YBall + (ballraduis+5) < YPingPongEnd && Ydirection === 1)
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
	const handleKeyPress1 = (event :any) =>
	{
		key1 = event.key;
	}
	const handleKeyPress2 = (event :any) =>
	{
		key2 = event.key;
	}
	const handleKeyrelease = () =>
	{
		key2 = "";
		key1 = "";
	}
	const handleBeforeUnload = (event: any) =>
	{
		first_conection = false;
		event.preventDefault();
		event.returnValue = ''; // Needed for Chrome
  		const confirmationMessage = 'Are you sure you want to leave? Your changes may not be saved.';
  		event.returnValue = confirmationMessage; // For other browsers
  		return confirmationMessage; // For modern browsers
	}
    useEffect(() =>
    {
        let vitesse = (20 / Speed);
		if(first_conection === false)
		{
			first_conection = true;
			if(host)
				player1.emit('first_conection');
			else
				player2.emit('first_conection');
		}
		const timeout: NodeJS.Timeout = setTimeout(() =>
		{
			getpos();
			changepos();
			if(host)
				checkpos();
			else
				settest(test + 1);
			send_receive_pos();
			console.log("here");
        },vitesse);
        document.addEventListener('keydown', handleKeyPress1);
        document.addEventListener('keydown', handleKeyPress2);
        document.addEventListener('keyup', handleKeyrelease);
		window.addEventListener('beforeunload', handleBeforeUnload);
        return () =>
        {
			clearTimeout(timeout);
            document.removeEventListener('keydown', handleKeyPress1);
            document.removeEventListener('keydown', handleKeyPress2);
            document.removeEventListener('keyup', handleKeyrelease);
			window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    });

    return(
        <main className="absolute inset-x-0 inset-y-0">
			<div id="Game">
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
            	    <div>Map-V{MapNumber}</div>
            	</div>
			</div>
        </main>
    );
}
