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
import { GetMatchMood } from './SettingsFuntions/MatchMood';
import { GetSpeed } from './SettingsFuntions/Speed';
import { GetPoints } from './SettingsFuntions/Points';
import { GetPauseGame_RoomMood } from './SettingsFuntions/PauseGame_RoomMood';
import { GetOtherTools_Invite } from './SettingsFuntions/OtherTools_Invite';
import { StartRoom } from './SettingsFuntions/StartRoom';


export let newGameInfo:GameInfoType;
export let access:boolean = false; 

const PingPongSettings = ({ router }: any) => 
{
    const GameContext = GetGameInfoContext();
    const contexUser = useContext(UserContext);
    const toast = useToast();

    useEffect(() => {
        console.log('user re-enter createroom page');
        player1.emit('conection_closed');
        player2.emit('conection_closed');
        socket.emit('conection_closed');
        newGameInfo = {
            Points: 10,
            Speed: 4,
            pause_game: 1,
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
                        <button  onClick={()=>  GetSpeed(1)} id="p_1" className="relative flex left-[0%] md:left-[0%] lg:left-[0%] bottom-[25px] text-white-500">x1</button>
                        <button  onClick={()=>  GetSpeed(2)} id="p_2" className="relative flex left-[38.5%] md:left-[38.5%] lg:left-[38.5%] bottom-[25px] text-white-500">x2</button>
                        <button  onClick={()=>  GetSpeed(4)} id="p_4" className="relative flex left-[75%] md:left-[80%] lg:left-[82.5%] bottom-[25px] text-white-500 ">x4</button>
                            <div id="scroll" className="relative flex mx-auto w-[25px] h-[10px] bg-indigo-500 bottom-[4px] rounded-lg shadow-2xl left-[32%] md:left-[35%] lg:left-[38%]"></div>
                        </div>
                    </div>
                    <div className="relative flex h-[30px] top-[100px] md:top-[150px] lg:top-[175px]">
                        <p className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                            Points :
                        </p>
                        <div className="relative flex my-auto bottom-[5px]  mx-auto h-[2px] w-[200px] md:w-[250px] lg:w-[300px]">
                            <button  onClick={()=> GetPoints(1)} id="points1" className="relative flex w-[40px] h-[30px] left-[0%] md:left-[0%] lg:left-[0%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                                <p className="mx-auto my-auto">
                                    10
                                </p>
                            </button>
                            <button onClick={()=> GetPoints(2)} id="points2" className="relative flex w-[40px] h-[30px] left-[20%] md:left-[25%] lg:left-[27.5%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                                <p className="mx-auto my-auto">
                                    20
                                </p>
                            </button>
                            <button onClick={()=> GetPoints(3)} id="points3" className="relative flex w-[40px] h-[30px] left-[40%] md:left-[52.5%] lg:left-[60%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
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
                        <button onClick={()=> GetMatchMood(0)} id="match_mood_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                            <p  className="mx-auto my-auto">
                                Ofline
                            </p>
                        </button>
                        <button onClick={()=> GetMatchMood(1)} id="match_mood_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                            <p  className="mx-auto my-auto">
                                Online
                            </p>
                        </button>
                    </div>
                    <div id="pause_game" className="relative flex h-[30px] top-[200px] md:top-[250px] lg:top-[325px]">
                        <p id="pause_game_p" className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                            Room  &nbsp;Mood :
                        </p>
                        <button onClick={()=> GetPauseGame_RoomMood(0)} id="pause_game_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                            <p id="pause_game_0_p" className="mx-auto my-auto">
                                private
                            </p>
                        </button>
                        <button onClick={()=> GetPauseGame_RoomMood(1)} id="pause_game_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                            <p id="pause_game_1_p" className="mx-auto my-auto">
                                Public
                            </p>
                        </button>
                    </div>
                        <div id="other_tools"  className="relative flex h-[30px] top-[250px] md:top-[300px] lg:top-[400px] opacity-0">
                            <p id="other_tools_p" className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                                    Other &nbsp;Tools :
                            </p>
                            <button onClick={()=> GetOtherTools_Invite(0)} id="other_tools_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                                <p className="mx-auto my-auto">
                                    Bot
                                </p>
                            </button>
                            <form  id="invite">
                                <input id= "input_val" type='text' placeholder="invite user..." className=" absolute h-[30px] w-[150px] left-[45%] bg-indigo-500 rounded-md text-center ">
                                </input>
                            </form>
                            <button onClick={()=> GetOtherTools_Invite(1)} id="other_tools_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                                <p className="mx-auto my-auto">
                                2P
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
                    <button onClick={() => {StartRoom(router,toast,GameContext)}} id="play" className="relative  h-[40px] md:h-[50px] lg:h-[60px] w-[80px] md:w-[100px] lg:w-[120px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500 bg-blue-500 hover:bg-blue-600 mt-[50px] md:mt-[75px] lg:mt-[100px] rounded-lg shadow-2xl shadow-blue-500 hover:shadow-blue-600 ">
                        <p>
                            Play
                        </p>
                    </button>
            </div>
    );
}
export default PingPongSettings;
