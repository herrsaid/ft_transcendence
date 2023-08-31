"use client"
import { useState } from "react";
import Chats from "./components/chats";
import Info from "./components/info";
import Messages from "./components/messages";
import reciverContext from "./reciverContext";
import activeContext from './activeContext'



export default function Community()
{
    const [reciver, setReciver] = useState({});
    const [active, setActive] = useState('message');
    
    return(
        <div className="flex h-full">
            <reciverContext.Provider value={{reciver, setReciver}}>
            <activeContext.Provider value={{active, setActive}}>
            <div className="w-1/3 h-full max-sm:hidden"> <Chats /> </div>
            <div className="w-2/3 h-full max-sm:w-full bg-[#363672] rounded-xl">{(active == 'message')?<Messages/>:(active == 'chats')?<Chats/>: <Info/>}</div>
            <div className="w-1/3 h-full max-md:hidden"><Info /></div>
            </activeContext.Provider>
            </reciverContext.Provider>
        </div>
    )
}