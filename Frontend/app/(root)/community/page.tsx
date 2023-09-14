"use client"
import { useContext, useEffect, useState } from "react";
import Chats from "./components/chats";
import Info from "./components/info";
import Messages from "./components/messages";
import reciverContext from "./reciverContext";
import activeContext from './activeContext'
import UserContext from "../UserContext";
import Settings from "./Settings/Components/SettingsComponent";



export default function Community()
{
    const [reciver, setReciver] = useState({});
    const [active, setActive] = useState('message');
    const user = useContext(UserContext)

    useEffect(()=>
    {
        let BottomNav:HTMLElement| null = document.getElementById('BottomNav');
        let LeftNav:HTMLElement| null = document.getElementById('LeftNav');
        if(BottomNav && LeftNav)
        {
            BottomNav.style.display = "none";
            LeftNav.style.display = "block";
        }
        return()=>
        {
            if(BottomNav && LeftNav)
            {
                BottomNav.style.display = "block";
                LeftNav.style.display = "none";
            }
        }
    },[]);
    if (!user.user.id)
        return (<div></div>)
    return(
        <>
            <div id="ChatPart" className="flex h-full">
                <reciverContext.Provider value={{reciver, setReciver}}>
                <activeContext.Provider value={{active, setActive}}>
                <div className="w-1/3 h-full max-sm:hidden"> <Chats /> </div>
                <div className="w-2/3 h-full max-sm:w-full bg-[#363672] rounded-lg">{(active == 'message')?<Messages/>:(active == 'chats')?<Chats/>: <Info/>}</div>
                <div className="w-1/3 h-full max-md:hidden"><Info /></div>
                </activeContext.Provider>
                </reciverContext.Provider>
            </div>
            <Settings/>
        </>
    )
}