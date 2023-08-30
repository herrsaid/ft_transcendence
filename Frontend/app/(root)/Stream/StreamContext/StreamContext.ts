'use client'

import {Dispatch,SetStateAction, createContext, useContext } from "react";

export type StreamInfoStateType = Dispatch<SetStateAction<StreamInfoType>>;
export class StreamInfoType
{
  public Access: number;
  public RoomNumber:number;
  public Player1UserName:string;
  public Player2UserName:string;
  public Player1Image:string;
  public Player2Image:string;

  constructor() {
    this.Access = 0;
    this.RoomNumber = 0;
    this.Player1UserName = "player I";
    this.Player2UserName = "player II";
    this.Player1Image = "/2.jpg";
    this.Player2Image = "/3.jpg";
  }
}
 export interface StreamContextType {
  StreamInfo: StreamInfoType;
  SetStreamInfo: StreamInfoStateType;
 }

const Stream: StreamContextType = {
    StreamInfo : new StreamInfoType(),
  SetStreamInfo: () => {}
};


const StreamInfoContext = createContext<StreamContextType>(Stream);
export function GetStreamInfoContext() {
  const context = useContext(StreamInfoContext);
  if (!context) {
    throw new Error('GetStreamInfoContext must be used within a GameInfoProvider');
  }
  return context;
}
export default StreamInfoContext;