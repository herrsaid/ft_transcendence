/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Settings.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:18 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 10:01:41 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'

import "./Settings.css"
import { socket } from '../../../Online/Socket/auto_match_socket'
import { Dispatch, SetStateAction, useState } from "react";

export let Points: number = 30;
export let Speed: number = 1;
export let pause_game: number = 0;
export let other_tools: number = 0;
export let host: boolean = false;
export let Online: number = 1;
export let Access: number = 0;
export let myusername: string | null = sessionStorage.getItem('username');
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
    const pause_game = document.getElementById('pause_game');
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
        if(pause_game !== null)
            pause_game.style.opacity = "0";
    }
    else
    {
        if(play !== null)
            play.style.zIndex = "2";
        if(play2 !== null)
            play2.style.zIndex = "1";
        if(other_tools !== null)
            other_tools.style.opacity = "1";
        if(pause_game !== null)
            pause_game.style.opacity = "1";
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
}

function is_Online_mod(router: any, setWarning: Dispatch<SetStateAction<string>>)
{
    const settings = document.getElementById("Settings")
    if (myusername === null && Online === 1)
    {
        setWarning("please make sure that you are [log-in]");
        const Warn = document.getElementById("warning");
        if(Warn)
        {
            Warn.style.animation = "none";
            void Warn.offsetHeight;
            Warn.style.animation = "Animation2 0.2s 3";
        }
    }
    else if(Online === 1)
    {
        setWarning('');
        if(settings !== null)
            settings.style.filter = "blur(15px)";
        socket.emit('join_user','new User join party');
        socket.on('join_user', (data) => {
            console.log(data);
        });
        socket.emit('send_data',{Speed,Points,myusername,});
        socket.on('send_data', (username,data) => {
            enemmyusername = username;
            host = data;
            Access = 1;
            console.log(host);
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
    const [Warning, setWarning] = useState("");
    return(
        <div id="Settings">
            <p id="Game_title">
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
                    pause game :
                </p>
                <button onClick={()=> change_pausegame_value(1)} id="pause_game_1">
                    <p>
                        Yes
                    </p>
                </button>
                <button onClick={()=> change_pausegame_value(0)} id="pause_game_0">
                    <p>
                        No
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
                <button onClick={() => {is_Online_mod(router,setWarning)}} id="play">
                    <p>
                        Play
                    </p>
                </button>
            </div>
    );
}
export default PingPongSettings;
