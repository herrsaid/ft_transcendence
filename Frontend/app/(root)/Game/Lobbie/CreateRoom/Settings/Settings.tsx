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
import { useEffect,useContext } from "react";
import UserContext from "@/app/(root)/UserContext";
import {  useToast } from '@chakra-ui/react'
import {GameInfoType,GetGameInfoContext} from '../../../GameContext/GameContext';
import { player1,player2 } from "../../../Online/Socket/start_game_socket";
import { socket } from '../../../Online/Socket/auto_match_socket'

import { StartRoom } from './SettingsFuntions/StartRoom';
import Speed from './Components/Speed';
import Points from './Components/Points';
import MatchMood from './Components/MatchMood';
import OtherTools_Invite from './Components/OtherTools_Invite';
import PauseGame_RoomMood from './Components/PauseGame_RoomMood';


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
        <div id= "Settings" className="container mx-auto px-2 py-[250px] text-center items-center">
            <div className="">
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
