'use client'

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Settings.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:18 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 18:34:38 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import "./Settings.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useContext } from 'react';
import UserContext from "@/app/(root)/UserContext";
import {  useToast } from '@chakra-ui/react'
import GameInfoContext,{GameInfoType,GameInfoStateType,GetGameInfoContext, GameContextType} from '../../../GameContext/GameContext';
import { player1,player2 } from "../../../Online/Socket/start_game_socket";
import { socket } from '../../../Online/Socket/auto_match_socket'


let newGameInfo:GameInfoType;
let access:boolean = false; 
function change_map_value(param: number)
{
    for(let a=1;a<4;a++)
    {
        const mapv = document.getElementById(`points${a}`);
        if(mapv !== null)
            mapv.style.backgroundColor = " rgb(67,56,202)";
    }
    const changemap= document.getElementById(`points${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(99 102 241)";
    newGameInfo.Points = param*10;
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
            match_mood_.style.backgroundColor = " rgb(67,56,202)";
    }
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(99 102 241)";
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
            pause_game_p.innerHTML = "Room &nbsp;Mood :";
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
            pause_game_p.innerHTML = "Pause Game :";
            pause_game_1_p.innerHTML = "Yes";
            pause_game_0_p.innerHTML = "No";
        }
    }
    newGameInfo.Online = param;
}

function change_other_tools_value(param: number)
{
    for(let a=0;a<2;a++)
    {
        const other_tools_ = document.getElementById(`other_tools_${a}`)
        if(other_tools_ !== null)
            other_tools_.style.backgroundColor = " rgb(67,56,202)";
    }
    const changemap= document.getElementById(`other_tools_${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(99 102 241)";
    newGameInfo.other_tools = param;
}

function change_pausegame_value(param: number)
{
    for(let a=0;a<2;a++)
    {
        const pause_game_ = document.getElementById(`pause_game_${a}`);
        if(pause_game_ !== null)
            pause_game_.style.backgroundColor = " rgb(67,56,202)";
    }
    const changemap = document.getElementById(`pause_game_${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(99 102 241)";
    newGameInfo.pause_game = param;
    if(param)
        newGameInfo.RoomMood=true;
    else
        newGameInfo.RoomMood=false;
}

async function is_Online_mod(router: any, setWarning: Dispatch<SetStateAction<string>>,toast:any,GameContext:GameContextType)
{
    const settings = document.getElementById("Settings")
    newGameInfo.myusername = GameContext.GameInfo.myusername;
    newGameInfo.myimage = GameContext.GameInfo.myimage;
    if(newGameInfo.Online === 1)
    {
        setWarning('');
        socket.emit('CreateRoom',{
            Speed: newGameInfo.Speed,
            Points: newGameInfo.Points,
            myusername: GameContext.GameInfo.myusername,
            myimage: GameContext.GameInfo.myimage,
            RoomMood: newGameInfo.RoomMood,
        });
        socket.on('CreateRefused', (message: string) => {
            if(access)
            {
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
            }  
        });
        if(newGameInfo.RoomMood === false && settings)
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
            Player1Pic.innerHTML = `<img src=${GameContext.GameInfo.myimage}></img>`;
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
        {
            settings.style.filter = "blur(15px)";
            settings.style.animation = "Animation 3s infinite";
        }
            console.log("conection_closed on settings");
            socket.on('SendData', (username,playerimg,data) => {
            if(access)
            {
                newGameInfo.enemmyusername = username;
                newGameInfo.enemmyimage = playerimg;
                newGameInfo.host = data;
                newGameInfo.Access = 1;
                GameContext.SetGameInfo(newGameInfo);
                // socket.emit('conection_closed');
                router.replace('/Game//Online/Play');
            }
        });
    }
    else
    {
        if(newGameInfo.other_tools === 1)
        {
            GameContext.SetGameInfo(newGameInfo);
            router.replace('/Game/Ofline/2P');
        }
        else
        {
            GameContext.SetGameInfo(newGameInfo);
            router.replace('/Game/Ofline/BOT');
        }
    }
}

function change_pos(param :number)
{
    const element = document.getElementById("scroll");
    if(element != null)
    {
        if(param === 1)
        element.style.left = "-60%";
        else if(param === 2)
        element.style.left = "-12.5%";
        else
        element.style.left = "35%";
        newGameInfo.Speed=param;
    }
}

const PingPongSettings = ({ router }: any) => 
{
    const GameContext = GetGameInfoContext();
    const contexUser = useContext(UserContext);
    const [Warning, setWarning] = useState("");
    const toast = useToast();

    useEffect(() => {
        console.log('user re-enter createroom page');
        player1.emit('conection_closed');
        player2.emit('conection_closed');
        socket.emit('conection_closed');
        newGameInfo = {
            Points: 10,
            Speed: 4,
            pause_game: 0,
            RoomMood: true,
            other_tools: 0,
            host: false,
            Online: 1,
            Access:0,
            myusername: "Player I",
            enemmyusername: "Player II",
            myimage: "/2.jpg",
            enemmyimage: "/3.jpg",
          };
          access = true;
          return()=>{console.log("i'm leaving");access = false;};
      }, []);
    if(!contexUser.user.username || !contexUser.user.profile_img)
    {
        return(
            <div className=" bgtet h-[500px] md:h-[600px] lg:h-[700px] w-[400px] md:w-[500px] lg:w-[600px] mx-auto rounded-lg shadow-2xl py-[20px] "></div>
        );
    }
    return(

       // #C56CDD,#18184a
            <div id= "Settings" className="container mx-auto px-2 py-[250px] text-center items-center">
                <div className="">
                    <div className=" bgtet h-[500px] md:h-[600px] lg:h-[700px] w-[400px] md:w-[500px] lg:w-[600px] mx-auto rounded-lg shadow-2xl py-[20px] ">
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                        PingPong
                    </p>
                    <div id="speed" className="relative flex h-[30px] top-[50px] md:top-[100px] lg:top-[100px]">
                        <p className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                            Speed :
                        </p>
                        <div className="relative flex my-auto  mx-auto h-[2px] w-[200px] md:w-[250px] lg:w-[300px] bg-indigo-500">
                        <button  onClick={()=>  change_pos(1)} id="p_1" className="relative flex left-[0%] md:left-[0%] lg:left-[0%] bottom-[25px] text-white-500">x1</button>
                        <button  onClick={()=>  change_pos(2)} id="p_2" className="relative flex left-[38.5%] md:left-[38.5%] lg:left-[38.5%] bottom-[25px] text-white-500">x2</button>
                        <button  onClick={()=>  change_pos(4)} id="p_4" className="relative flex left-[75%] md:left-[80%] lg:left-[82.5%] bottom-[25px] text-white-500 ">x4</button>
                            <div id="scroll" className="relative flex mx-auto w-[25px] h-[10px] bg-indigo-500 bottom-[4px] rounded-lg shadow-2xl left-[32%] md:left-[35%] lg:left-[38%]"></div>
                        </div>
                    </div>
                    <div className="relative flex h-[30px] top-[100px] md:top-[150px] lg:top-[175px]">
                        <p className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                            Points :
                        </p>
                        <div className="relative flex my-auto bottom-[5px]  mx-auto h-[2px] w-[200px] md:w-[250px] lg:w-[300px]">
                            <button  onClick={()=> change_map_value(1)} id="points1" className="relative flex w-[40px] h-[30px] left-[0%] md:left-[0%] lg:left-[0%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                                <p className="mx-auto my-auto">
                                    10
                                </p>
                            </button>
                            <button onClick={()=> change_map_value(2)} id="points2" className="relative flex w-[40px] h-[30px] left-[20%] md:left-[25%] lg:left-[27.5%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                                <p className="mx-auto my-auto">
                                    20
                                </p>
                            </button>
                            <button onClick={()=> change_map_value(3)} id="points3" className="relative flex w-[40px] h-[30px] left-[40%] md:left-[52.5%] lg:left-[60%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                                <p className="mx-auto my-auto">
                                    30
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className="relative flex h-[30px] top-[150px] md:top-[200px] lg:top-[250px]">
                        <p className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                            Match Mood :
                        </p>
                        <button onClick={()=> change_online_value(0)} id="match_mood_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                            <p  className="mx-auto my-auto">
                                Ofline
                            </p>
                        </button>
                        <button onClick={()=> change_online_value(1)} id="match_mood_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                            <p  className="mx-auto my-auto">
                                Online
                            </p>
                        </button>
                    </div>
                    <div id="pause_game" className="relative flex h-[30px] top-[200px] md:top-[250px] lg:top-[325px]">
                        <p id="pause_game_p" className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                            Room  &nbsp;Mood :
                        </p>
                        <button onClick={()=> change_pausegame_value(0)} id="pause_game_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                            <p id="pause_game_0_p" className="mx-auto my-auto">
                                private
                            </p>
                        </button>
                        <button onClick={()=> change_pausegame_value(1)} id="pause_game_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                            <p id="pause_game_1_p" className="mx-auto my-auto">
                                Public
                            </p>
                        </button>
                    </div>
                        <div id="other_tools"  className="relative flex h-[30px] top-[250px] md:top-[300px] lg:top-[400px] opacity-0">
                            <p id="other_tools_p" className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                                    Other &nbsp;Tools  &nbsp;:
                            </p>
                            <button onClick={()=> change_other_tools_value(0)} id="other_tools_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                                <p className="mx-auto my-auto">
                                    Bot
                                </p>
                            </button>
                            <button onClick={()=> change_other_tools_value(1)} id="other_tools_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                                <p className="mx-auto my-auto">
                                2P
                                </p>
                            </button>
                            <div id="warning">{Warning}</div>
                        </div>
                    </div>
                </div>
                    <button onClick={() => {is_Online_mod(router,setWarning,toast,GameContext)}} id="play" className="relative  h-[40px] md:h-[50px] lg:h-[60px] w-[80px] md:w-[100px] lg:w-[120px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500 bg-blue-500 hover:bg-blue-600 mt-[50px] md:mt-[75px] lg:mt-[100px] rounded-lg shadow-2xl shadow-blue-500 hover:shadow-blue-600 ">
                        <p>
                            Play
                        </p>
                    </button>
            </div>
    );
}
export default PingPongSettings;
