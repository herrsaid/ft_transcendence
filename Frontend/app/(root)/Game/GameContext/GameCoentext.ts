'use client'

import {Dispatch,SetStateAction, createContext, useContext } from "react";


const GameInfoContext = createContext<GameInfoType>;

export default GameInfoContext;

export function GetGameInfoContext() {
    const context = useContext(GameInfoContext);
    if (!context) {
      throw new Error('useGameInfoContext must be used within a GameInfoProvider');
    }
    return context;
  }

export interface GameInfoType
{
   
    Points: number,
    Speed: number,
    pause_game: number,
    RoomMood: boolean ,
    other_tools: number,
    host: boolean,
    Online: number,
    Access: number,
    myusername: string | null,
    enemmyusername: string | null,
    myimage: string | null,
    enemmyimage: string | null,
}

export type GameInfoStateType = Dispatch<SetStateAction<GameInfoType>>;
// export let Points: number = 10;
// export let Speed: number = 4;
// export let pause_game: number = 0,RoomMood: boolean = true;
// export let other_tools: number = 0;
// export let host: boolean = false;
// export let Online: number = 1;
// export let Access: number = 0;
// export let myusername: string | null = "PLAYER I";
// export let enemmyusername: string | null = null;
// export let myimage: string | null = "/2.jpg";
// export let enemmyimage: string | null = null;
