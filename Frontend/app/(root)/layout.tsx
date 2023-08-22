'use client'

import {useEffect, useState } from 'react';
import Header from './Components/Header/Header'
import BottomNav from './Components/BottomNav/BottomNav'
import './globals.css'
import { Providers } from "./providers";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import UserContext from './UserContext';
import GameInfoContext,{GameInfoType,GameInfoStateType,GetGameInfoContext} from './Game/GameContext/GameContext';
import useSWR from "swr"
import StreamInfoContext,{StreamInfoType,StreamInfoStateType,GetStreamInfoContext} from './Stream/StreamContext/StreamContext';
import { socket } from './Game/Online/Socket/auto_match_socket';
import { useToast } from '@chakra-ui/react';
import Notification from './Components/Notification/Notification';

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
  // const toast = useToast();
  let RoomINdex:number = 0, access:boolean = true; 
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
  const [StreamInfo,SetStreamInfo] = useState<StreamInfoType>(
  {
    Access:0,
    RoomNumber:0
  });
  const router = useRouter();

  
  // if (Cookies.get('access_token') == undefined)
  //     router.replace('/login')


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
        if (jsonData.is_profile_img_updated)
            SetGameInfo({...GameInfo,myusername:jsonData.username,myimage:process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + jsonData.profile_img});
        else
            SetGameInfo({...GameInfo,myusername:jsonData.username,myimage:jsonData.profile_img});
        return res.json();
      }


const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,
fetchData
);
useEffect(()=>
{
  let notification:HTMLElement| null = document.getElementById('notification');
  let content:HTMLElement| null = document.getElementById('content');
  let timeout:NodeJS.Timeout = setTimeout(()=>
  {
    socket.emit("Online",GameInfo.myusername);
    socket.on("SendRequest",(data)=>
    {
        if(notification && content)
        {
          console.log("request sent");
          notification.style.opacity = "1";
          content.innerText = data.message;
          RoomINdex = data.RoomINdex;
          SetGameInfo({...GameInfo,enemmyusername:data.inviterusername,enemmyimage:data.inviterImg});
        }
    });
  },3000);
  // if(notification)
  //   notification.style.opacity = "0";
  access = true;
  return ()=>
  {
    access = false;
    clearTimeout(timeout);
  };
});
  return (
    
    <html lang="en">
      <body >
      <Providers>
      <UserContext.Provider value={{user, setUser}}>
        {/* {Cookies.get('access_token') != undefined && <Header/>} */}
        <Header/>
        {/* {Cookies.get('access_token') != undefined && <BottomNav/>} */}
        <BottomNav/>
        {/* <div className='child'> */}
              {/* {Cookies.get('access_token') != undefined && children} */}

      
      {/* </div> */}
        
        {/* <div className='child'> */}
        <GameInfoContext.Provider value={{ GameInfo,SetGameInfo }}>
          <StreamInfoContext.Provider value={{ StreamInfo,SetStreamInfo }}>
            <Notification RoomINdex={RoomINdex} access={access}/>
            {children}
          </StreamInfoContext.Provider>
        </GameInfoContext.Provider>
        {/* </div> */}
          
            
            
        </UserContext.Provider>
      </Providers>
      </body>
    </html>
  )
}

