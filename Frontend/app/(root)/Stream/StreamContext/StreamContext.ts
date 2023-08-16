'use client'

import {Dispatch,SetStateAction, createContext, useContext } from "react";

export type StreamInfoStateType = Dispatch<SetStateAction<StreamInfoType>>;
export interface StreamInfoType
{
  Access: number,
  RoomNumber:number,
}
 export interface StreamContextType {
  StreamInfo: StreamInfoType;
  SetStreamInfo: StreamInfoStateType;
 }

const Stream: StreamContextType = {
    StreamInfo :{
        Access:0,
        RoomNumber:0,
  },
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