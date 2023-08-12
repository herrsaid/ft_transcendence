/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Settings.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:18 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/11 21:48:48 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'

import "./Settings.css"
import { socket } from '../../../Online/Socket/auto_match_socket'
import { Dispatch, SetStateAction, useState } from "react";
import { useContext } from 'react';
import UserContext from "@/app/(root)/UserContext";
import {  useToast } from '@chakra-ui/react'

export let Points: number = 30;
export let Speed: number = 1;
export let pause_game: number = 0,RoomMood: boolean = false;
export let other_tools: number = 0;
export let host: boolean = false;
export let Online: number = 1;
export let Access: number = 0;
export let myusername: string | null = null;
export let enemmyusername: string | null = null;
function change_map_value(param: number)
{
    for(let a=1;a<4;a++)
    {
        const mapv = document.getElementById(`points${a}`);
        if(mapv !== null)
            mapv.style.backgroundColor = " rgb(57, 57, 111,0.4)";
    }
    const changemap= document.getElementById(`points${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(57, 57, 111,1)";
    Points = param*10;
}

function change_online_value(param: number)
{
    const changemap= document.getElementById(`match_mood_${param}`);
    const play = document.getElementById('play');
    const play2 = document.getElementById('play2');
    const other_tools = document.getElementById('other_tools');
    const pause_game_p = document.getElementById('pause_game_p');
    const pause_game_0_p = document.getElementById('pause_game_0_p');
    const pause_game_1_p = document.getElementById('pause_game_1_p');
    for(let a=0;a<2;a++)
    {
        const match_mood_ = document.getElementById(`match_mood_${a}`);
        if(match_mood_ !== null)
            match_mood_.style.backgroundColor = " rgb(57, 57, 111,0.4)";
    }
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(57, 57, 111,1)";
    if(param === 1)
    {
        
        if(play !== null)
            play.style.zIndex = "1";
        if(play2 !== null)
            play2.style.zIndex = "2";
        if(other_tools !== null)
            other_tools.style.opacity = "0";
        if(pause_game_p !== null
            && pause_game_0_p !== null
            && pause_game_1_p !== null)
        {
            pause_game_p.innerHTML = "Room Mood:";
            pause_game_1_p.innerHTML = "Public";
            pause_game_0_p.innerHTML = "Private";
        }
    }
    else
    {
        if(play !== null)
            play.style.zIndex = "2";
        if(play2 !== null)
            play2.style.zIndex = "1";
        if(other_tools !== null)
            other_tools.style.opacity = "1";
        if(pause_game_p !== null
            && pause_game_0_p !== null
            && pause_game_1_p !== null)
        {
            pause_game_p.innerHTML = "Pause Game:";
            pause_game_1_p.innerHTML = "Yes";
            pause_game_0_p.innerHTML = "No";
        }
    }
    Online = param;
}

function change_other_tools_value(param: number)
{
    for(let a=0;a<2;a++)
    {
        const other_tools_ = document.getElementById(`other_tools_${a}`)
        if(other_tools_ !== null)
            other_tools_.style.backgroundColor = " rgb(57, 57, 111,0.4)";
    }
    const changemap= document.getElementById(`other_tools_${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(57, 57, 111,1)";
    other_tools = param;
}

function change_pausegame_value(param: number)
{
    for(let a=0;a<2;a++)
    {
        const pause_game_ = document.getElementById(`pause_game_${a}`);
        if(pause_game_ !== null)
            pause_game_.style.backgroundColor = " rgb(57, 57, 111,0.4)";
    }
    const changemap = document.getElementById(`pause_game_${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(57, 57, 111,1)";
    pause_game = param;
    if(param)
        RoomMood = true;
    else
        RoomMood = false;
}

async function is_Online_mod(router: any, setWarning: Dispatch<SetStateAction<string>>,toast:any)
{
    
    const settings = document.getElementById("Settings")
    if(Online === 1)
    {
        setWarning('');
        console.log("room:",RoomMood);
        socket.emit('CreateRoom',{Speed,Points,myusername,RoomMood,});
        socket.on('CreateRefused', (message: string) => {
                setWarning(message);
                const Warn = document.getElementById("warning");
                if(settings)
                    settings.style.filter = "blur(0px)";
                if(Warn)
                {
                    Warn.style.animation = "none";
                    void Warn.offsetHeight;
                    Warn.style.animation = "Animation2 0.2s 3";
                }
                toast({
                    title: 'Error',
                    description: message,
                    position: 'top-right',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  });
                
        });
        console.log('here');
        if(RoomMood === false && settings)
        {
            settings.innerHTML = "";
            let Room:HTMLElement = document.createElement("div");
            let Player1Pic:HTMLElement = document.createElement("div");
            let VS:HTMLElement = document.createElement("div");
            let Player2Pic:HTMLElement = document.createElement("div");
            let Player1name:HTMLElement = document.createElement("div");
            let Player2name:HTMLElement = document.createElement("div");
            let start:HTMLElement = document.createElement("div");
            Room.setAttribute("id",`Room`);
            Player1name.setAttribute("id",`Player1name`);
            Player2name.setAttribute("id",`Player2name`);
            Player1Pic.setAttribute("id",`Player1Pic`);
            VS.setAttribute("id",`VS`);
            Player2Pic.setAttribute("id",`Player2Pic`);
            start.setAttribute("id",`start`);
            Player1name.innerHTML = 'mabdelou';
            Player2name.innerHTML = 'unknown';
            Player1Pic.innerHTML = `<img src=${sessionStorage.getItem('avatar')!}></img>`;
            VS.innerHTML = '<p> VS </p>';
            Player2Pic.innerHTML = `<img src="/avatar.png"></img>`;
            start.innerHTML = `<button> Start </button>`;
            Room.appendChild(Player1name);
            Room.appendChild(Player2name);
            Room.appendChild(Player1Pic);
            Room.appendChild(VS);
            Room.appendChild(Player2Pic);
            Room.appendChild(start);
            settings.appendChild(Room);
        }
        else if(settings)
            settings.style.filter = "blur(15px)";
            socket.on('SendData', (username,data) => {
            enemmyusername = username;
            host = data;
            Access = 1;
            socket.disconnect();
            router.replace('/Game//Online/Play');
        });
    }
    else
    {
        if(other_tools === 1)
            router.replace('/Game/Ofline/2P');
        else
            router.replace('/Game/Ofline/BOT');
    }
}

function change_pos(param :number)
{
    const element = document.getElementById("scroll");
    if(element != null)
    {
        if(param === 1)
        element.style.left = "35%";
        else if(param === 2)
        element.style.left = "58.5%";
        else
        element.style.left = "83%";
        Speed = param;
    }
}

const PingPongSettings = ({ router }: any) => 
{
    const contexUser = useContext(UserContext);
    const [Warning, setWarning] = useState("");
    const toast = useToast();
    myusername = contexUser.user.username;
    return(

       // #C56CDD,#18184a

        <div className="container mx-auto px-2 py-[250px] text-center items-center">
            <div className="">
            <div className=" bgtet h-[450px] md:h-[550px] lg:h-[650px] w-[400px] md:w-[500px] lg:w-[600px] mx-auto rounded-lg shadow-2xl py-[20px] ">
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                PingPong
            </p>
            <div id="speed">
                <p id="speed_p">
                    Speed :
                </p>
                <div id="scroll" style = {{left: '35%'}}></div>
                <button  onClick={()=>  change_pos(1)} id="p_1">x1</button>
                <button  onClick={()=>  change_pos(2)} id="p_2">x2</button>
                <button  onClick={()=>  change_pos(4)} id="p_4">x4</button>
                <div id="speed_scrool">
                </div>
            </div>
            <div id="points">
                <p id="points_p">
                    Points :
                </p>
                <button  onClick={()=> change_map_value(1)} id="points1">
                    <p>
                        10
                    </p>
                </button>
                <button onClick={()=> change_map_value(2)} id="points2">
                    <p>
                        20
                    </p>
                </button>
                <button onClick={()=> change_map_value(3)} id="points3">
                    <p>
                        30
                    </p>
                </button>
            </div>
            <div id="match_mood">
                <p id="match_mood_p">
                    Match Mood :
                </p>
                <button onClick={()=> change_online_value(1)} id="match_mood_1">
                    <p>
                        Online
                    </p>
                </button>
                <button onClick={()=> change_online_value(0)} id="match_mood_0">
                    <p>
                        Ofline
                    </p>
                </button>
            </div>
            <div id="pause_game">
                <p id="pause_game_p">
                    Room Mood:
                </p>
                <button onClick={()=> change_pausegame_value(1)} id="pause_game_1">
                    <p id="pause_game_1_p">
                        Public
                    </p>
                </button>
                <button onClick={()=> change_pausegame_value(0)} id="pause_game_0">
                    <p id="pause_game_0_p">
                        private
                    </p>
                </button>
            </div>
            <div id="other_tools">
                <p id="other_tools_p">
                    Other Tools:
                </p>
                <button onClick={()=> change_other_tools_value(0)} id="other_tools_0">
                    <p>
                        Bot
                    </p>
                </button>
                <button onClick={()=> change_other_tools_value(1)} id="other_tools_1">
                    <p>
                       2P
                    </p>
                </button>
            </div>
                <div id="warning">{Warning}</div>
                <button onClick={() => {is_Online_mod(router,setWarning,toast)}} id="play">
                    <p>
                        Play
                    </p>
                </button>
            </div>
            </div>

        
        </div>
    );
}
export default PingPongSettings;