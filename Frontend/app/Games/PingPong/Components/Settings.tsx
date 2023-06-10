'use client'

import Link from "next/link";
import "../style/style.css"
import { useEffect } from "react";

export let map = 3;
export let speed = 1;
export let Online = 1;
export let pause_game = 0;
export let other_tools = 0;
function change_map_value(param: number)
{
    for(let a=1;a<4;a++)
        document.getElementById(`mapv${a}`).style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    const changemap= document.getElementById(`mapv${param}`);
    changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    map = param;
}

function change_online_value(param: number)
{
    for(let a=0;a<2;a++)
        document.getElementById(`match_mood_${a}`).style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    const changemap= document.getElementById(`match_mood_${param}`);
    changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    if(param === 1)
    {
        document.getElementById('play').style.zIndex = "1";
        document.getElementById('play2').style.zIndex = "2";
        document.getElementById('other_tools').style.opacity = "0";
        document.getElementById('pause_game').style.opacity = "0";
        // document.getElementById('pause_game_0').style.zIndex = "-1";
        // document.getElementById('pause_game_1').style.zIndex = "-1";
        // document.getElementById('other_tools_0').style.zIndex = "-1";
        // document.getElementById('other_tools_1').style.zIndex = "-1";
    }
        else
        {
            document.getElementById('play').style.zIndex = "2";
            document.getElementById('play2').style.zIndex = "1";
            document.getElementById('other_tools').style.opacity = "1";
            document.getElementById('pause_game').style.opacity = "1";
            // document.getElementById('pause_game_0').style.zIndex = "2";
            // document.getElementById('pause_game_1').style.zIndex = "2";
            // document.getElementById('other_tools_0').style.zIndex = "2";
            // document.getElementById('other_tools_1').style.zIndex = "2";
        }
        Online = param;
}

function change_other_tools_value(param: number)
{
    for(let a=0;a<2;a++)
        document.getElementById(`other_tools_${a}`).style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    const changemap= document.getElementById(`other_tools_${param}`);
    changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    other_tools = param;
}

function change_pausegame_value(param: number)
{
    for(let a=0;a<2;a++)
        document.getElementById(`pause_game_${a}`).style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    const changemap= document.getElementById(`pause_game_${param}`);
    changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    pause_game = param;
}

function is_Online_mod()
{
    if(Online === 1)
    {
        document.getElementById("Settings").style.filter = "blur(15px)";
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
        speed = param;
    }
}

export default function PingPongSettings()
{
    return(
        <div id="Settings">
            <p id="Game_title">
                PingPong
            </p>
            <div id="speed">
                <p id="speed_p">
                    speed :
                </p>
                <div id="scroll" style = {{left: '35%'}}></div>
                <p onClick={()=>  change_pos(1)} id="p_1">x1</p>
                <p onClick={()=>  change_pos(2)} id="p_2">x2</p>
                <p onClick={()=>  change_pos(4)} id="p_4">x4</p>
                <div id="speed_scrool">
                </div>
            </div>
            <div id="map">
                <p id="map_p">
                    map :
                </p>
                <button  onClick={()=> change_map_value(1)} id="mapv1">
                    <p>
                        v1
                    </p>
                </button>
                <button onClick={()=> change_map_value(2)} id="mapv2">
                    <p>
                        v2
                    </p>
                </button>
                <button onClick={()=> change_map_value(3)} id="mapv3">
                    <p>
                        v3
                    </p>
                </button>
            </div>
            <div id="match_mood">
                <p id="match_mood_p">
                    match mood :
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
                    other tools:
                </p>
                <button onClick={()=> change_other_tools_value(0)} id="other_tools_0">
                    <p>
                        bot
                    </p>
                </button>
                <button onClick={()=> change_other_tools_value(1)} id="other_tools_1">
                    <p>
                       2P
                    </p>
                </button>
            </div>
            <img src="reload.png">
            </img>
            <Link href="/Games/PingPong/Play">
                <button id="play">
                    <p>
                        Play
                    </p>
                </button>
            </Link>
            {/* <Link href="/Games/PingPong/Play2"> */}
                <button onClick={is_Online_mod} id="play2">
                    <p>
                        Play
                    </p>
                </button>
            {/* </Link> */}
        </div>
    );
}