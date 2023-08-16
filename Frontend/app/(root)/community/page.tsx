"use client"
import { useState } from "react";
import Chats from "./components/chats";
import Info from "./components/info";
import Messages from "./components/messages";
import reciverContext from "./reciverContext";
import { cookieStorageManager } from "@chakra-ui/react";

export default function Community()
{
    const [reciver, setReciver] = useState({});
    
    return(
        <div className="flex h-full">
            <reciverContext.Provider value={{reciver, setReciver}}>
            <div className="w-1/3 max-sm:hidden"> <Chats /> </div>
            <div className="w-2/3 max-sm:w-full"><Messages /></div>
            <div className="w-1/3 max-md:hidden"><Info /></div>
            </reciverContext.Provider>
        </div>
    )
}