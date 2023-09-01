'use client'

import "../Settings.css"
import {  useToast } from '@chakra-ui/react'
import { StartRoom } from '../SettingsFuntions/StartRoom';
import Speed from './Speed';
import Points from './Points';
import MatchMood from './MatchMood';
import OtherTools_Invite from './OtherTools_Invite';
import PauseGame_RoomMood from './PauseGame_RoomMood';
import Loading from "./Loading";
import { GameInfoType, GetGameInfoContext } from "@/app/(root)/Game/GameContext/GameContext";
import { InGame } from "@/app/(root)/Components/Notification/Notification";

import { player1, player2 } from "@/app/(root)/Game/Online/Socket/start_game_socket";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/app/(root)/Game/Online/Socket/auto_match_socket";
import { Back } from '../SettingsFuntions/Back';

export let newGameInfo:GameInfoType;
export let access:boolean = false; 

const Settings = () => 
{
    const GameContext = GetGameInfoContext();
    const router = useRouter();
    const toast = useToast();
    useEffect(() => {
        Back()
        player1.emit('conection_closed');
        player2.emit('conection_closed');
        socket.emit('conection_closed');
        newGameInfo = new GameInfoType();
          access = true;
          return()=>{
            access = false;
            InGame.IL = false;
        };
      }, []);
    return(
        <div id="GameInviter" className=" absolute top-[10%] left-1/2 transform -translate-x-1/2 my-auto">
            <div id= "Settings" className="container mx-auto px-2 py-[20px] text-center items-center pb-40">
                <div className=" bgtet h-[500px] md:h-[600px] lg:h-[700px] w-[400px] md:w-[500px] lg:w-[600px] mx-auto rounded-lg shadow-2xl py-[20px] ">
                    <button onClick={() => {Back()}} id="Back" className="absolute  h-[40px] w-[40px] top-[25px] right-[15px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500 bg-indigo-700 hover:bg-indigo-500 rounded-[25px] shadow-2xl shadow-indigo-700 hover:shadow-indigo-500 ">
                        <p>
                            x
                        </p>
                    </button>
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                        PingPong
                    </p>
                    <Speed/>
                    <Points/>
                    <MatchMood/>
                    <OtherTools_Invite/>
                    <PauseGame_RoomMood/>
                </div>
                <button onClick={() => {StartRoom(router,toast,GameContext)}} id="play" className="relative  h-[40px] md:h-[50px] lg:h-[60px] w-[80px] md:w-[100px] lg:w-[120px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500 bg-blue-500 hover:bg-blue-600 mt-[50px] md:mt-[75px] lg:mt-[100px] rounded-lg shadow-2xl shadow-blue-500 hover:shadow-blue-600 ">
                    <p>
                        Play
                    </p>
                </button>
            </div>
            <Loading/>
        </div>
    );
}
export default Settings;
