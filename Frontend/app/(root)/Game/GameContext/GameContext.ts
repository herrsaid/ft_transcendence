'use client'

import {Dispatch,SetStateAction, createContext, useContext } from "react";

export type GameInfoStateType = Dispatch<SetStateAction<GameInfoType>>;
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
 export interface GameContextType {
  GameInfo: GameInfoType;
  SetGameInfo: GameInfoStateType;
 }

const game: GameContextType = {
  GameInfo :{
    Points: 10,
    Speed: 4,
    pause_game: 0,
    RoomMood: true,
    other_tools: 0,
    host: false,
    Online: 1,
    Access:0,
    myusername: "Player I",
    enemmyusername: "Player II",
    myimage: "/2.jpg",
    enemmyimage: "/3.jpg",
  },
  SetGameInfo: () => {}
};


const GameInfoContext = createContext<GameContextType>(game);
export function GetGameInfoContext() {
  const context = useContext(GameInfoContext);
  if (!context) {
    throw new Error('GetGameInfoContext must be used within a GameInfoProvider');
  }
  return context;
}
export default GameInfoContext;