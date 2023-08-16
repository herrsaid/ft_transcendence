'use client'

import {useState } from 'react';
import Header from './Components/Header/Header'
import BottomNav from './Components/BottomNav/BottomNav'
import './globals.css'
import { Providers } from "./providers";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import UserContext from './UserContext';
import GameInfoContext,{GameInfoType,GameInfoStateType,GetGameInfoContext} from '../(root)/Game/GameContext/GameContext';
import useSWR from "swr"

const metadata = {
  title: 'PingPong',
  description: 'PingPong Game 2023',
  viewport: 'width=device-width, initial-scale=1.0',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState({});
  const [GameInfo,SetGameInfo] = useState<GameInfoType>(
    {
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
    });
  const router = useRouter();

  
  if (Cookies.get('access_token') == undefined)
      router.replace('/login')


  const fetchData = async (url:string) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
         }});

        if (res.status == 401)
            router.replace("/login")
        const jsonData = await res.json();
        setUser(jsonData);
         
        if (!res.ok)
            throw new Error("failed to fetch users");
        return res.json();
      }


const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,
fetchData
);


  return (
    
    <html lang="en">
      <body >
      <Providers>
      <UserContext.Provider value={{user, setUser}}>
        {Cookies.get('access_token') != undefined && <Header/>}
        {Cookies.get('access_token') != undefined && <BottomNav/>}
        <div className='child'>
          <GameInfoContext.Provider value={{ GameInfo,SetGameInfo }}>
              {Cookies.get('access_token') != undefined && children}
          </GameInfoContext.Provider>
        </div>
          
            
            
        </UserContext.Provider>
      </Providers>
      </body>
    </html>
  )
}

