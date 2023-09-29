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
import {GameInfoType} from '../../../GameContext/GameContext';
import { player1,player2 } from "../../../Online/Socket/start_game_socket";
import { socket } from '../../../Online/Socket/auto_match_socket'

import Settings from "./Components/SettingsComponent";
import { InGame } from "@/app/(root)/Components/Notification/Notification";

export let newGameInfo:GameInfoType;
export let access:boolean = false; 

const PingPongSettings = ({ router }: any) => 
{
    const contexUser = useContext(UserContext);
    useEffect(() => {
        let BottomNav:HTMLElement| null = document.getElementById('BottomNav');
        let LeftNav:HTMLElement| null = document.getElementById('LeftNav');
        try
        {
            if(BottomNav && LeftNav)
            {
                BottomNav.style.display = "block";
                LeftNav.style.display = "none";
            }
            // console.log('user re-enter createroom page');
            player1.emit('conection_closed');
            player2.emit('conection_closed');
            socket.emit('conection_closed');
            newGameInfo = {
                Points: 10,
                Speed: 8,
                pause_game: 1,
                RoomMood: 1,
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
        }
        catch{}
        return()=>{
        // if(BottomNav && LeftNav)
        // {
        //     BottomNav.style.display = "none";
        //     LeftNav.style.display = "block";
        // }
        // console.log("i'm leaving");
        access = false;
        InGame.IL = false;
    };
      }, []);
      
    if(!contexUser.user.username || !contexUser.user.profile_img)
    {
        return(
            <div className=" bgtet h-[500px] md:h-[600px] lg:h-[700px] w-[400px] md:w-[500px] lg:w-[600px] mx-auto rounded-lg shadow-2xl py-[20px] "></div>
        );
    }
    return(
        <Settings router={router}/>
    );
}
export default PingPongSettings;
