'use client'

import {Dispatch,SetStateAction, createContext, useContext } from "react";

export type GameInfoStateType = Dispatch<SetStateAction<GameInfoType>>;
export class GameInfoType
{
  public Points: number;
  public Speed: number;
  public pause_game: number;
  public RoomMood: boolean ;
  public other_tools: number;
  public host: boolean;
  public Online: number;
  public Access: number;
  public myusername: string;
  public enemmyusername: string;
  public myimage: string;
  public enemmyimage: string;

  constructor()
  {
    this.Points = 10;
    this.Speed = 4;
    this.pause_game = 0;
    this.RoomMood = true;
    this.other_tools = 0;
    this.host = false;
    this.Online = 1;
    this.Access =0;
    this.myusername = "Player I";
    this.enemmyusername = "Player II";
    this.myimage = "/2.jpg";
    this.enemmyimage = "/3.jpg";
  }


}
 export interface GameContextType {
  GameInfo: GameInfoType;
  SetGameInfo: GameInfoStateType;
 }

const game: GameContextType = {
  GameInfo : new GameInfoType(),
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