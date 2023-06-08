'use client'

import Link from "next/link";
import "../style/style.css"

let map = 0;
let voice = -1;
let pause_game = -1;
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
                <div id="speed_scrool">
                    <p id="p_1">1</p>
                    <p id="p_5">5</p>
                    <p id="p_10">10</p>
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