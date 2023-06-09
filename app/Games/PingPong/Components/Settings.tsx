'use client'

import Link from "next/link";
import "../style/style.css"
import { useEffect } from "react";

export let map = 3;
export let speed = 1;
export let voice = 0;
export let pause_game = 0;
function change_map_value(param: number)
{
    for(let a=1;a<4;a++)
        document.getElementById(`mapv${a}`).style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    const changemap= document.getElementById(`mapv${param}`);
    changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    map = param;
}

function change_voice_value(param: number)
{
    for(let a=0;a<2;a++)
        document.getElementById(`voice_${a}`).style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    const changemap= document.getElementById(`voice_${param}`);
    changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    voice = param;
}

function change_pausegame_value(param: number)
{
    for(let a=0;a<2;a++)
        document.getElementById(`pause_game_${a}`).style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    const changemap= document.getElementById(`pause_game_${param}`);
    changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    pause_game = param;
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
            <div id="voice">
                <p id="voice_p">
                    voice :
                </p>
                <button onClick={()=> change_voice_value(1)} id="voice_1">
                    <p>
                        true
                    </p>
                </button>
                <button onClick={()=> change_voice_value(0)} id="voice_0">
                    <p>
                        false
                    </p>
                </button>
            </div>
            <div id="pause_game">
                <p id="pause_game_p">
                    pause game :
                </p>
                <button onClick={()=> change_pausegame_value(1)} id="pause_game_1">
                    <p>
                        true
                    </p>
                </button>
                <button onClick={()=> change_pausegame_value(0)} id="pause_game_0">
                    <p>
                        false
                    </p>
                </button>
            </div>
            <Link href="/Games/PingPong/Play">
                <button id="play">
                    <p>
                        play
                    </p>
                </button>
            </Link>
        </div>
    );
}