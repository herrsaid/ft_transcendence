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
import { GetGameInfoContext } from "@/app/(root)/Game/GameContext/GameContext";

const Settings = ({ router }: any) => 
{
    const GameContext = GetGameInfoContext();
    const toast = useToast();
    return(
        <>
        <div id= "Settings" className="container mx-auto px-2 py-[20px] text-center items-center">
            <div className=" bgtet h-[500px] md:h-[600px] lg:h-[700px] w-[400px] md:w-[500px] lg:w-[600px] mx-auto rounded-lg shadow-2xl py-[20px] ">
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
        </>
    );
}
export default Settings;
