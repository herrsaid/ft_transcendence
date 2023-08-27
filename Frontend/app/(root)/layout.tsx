'use client'

import {useEffect, useState } from 'react';
import Header from './Components/Header/Header'
import BottomNav from './Components/BottomNav/BottomNav'
import './globals.css'
import { Providers } from "./providers";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import UserContext from './UserContext';
import GameInfoContext,{GameInfoType} from './Game/GameContext/GameContext';
import useSWR from "swr"
import StreamInfoContext,{StreamInfoType} from './Stream/StreamContext/StreamContext';
import { socket } from './Game/Online/Socket/auto_match_socket';
import Notification from './Components/Notification/Notification';
import GameDataContext,{ GameDataType } from './Game/Online/Play/GameClass/GameClass';

export let InGame:{IG:boolean} = {IG: false};

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
  const [InviterName,SetInviterName] = useState("");
  const [access,Setaccess] = useState(false);
  const [GameInfo,SetGameInfo] = useState<GameInfoType>( new GameInfoType());
  const [GameData,SetGameData] = useState<GameDataType>(new GameDataType());
  const [StreamInfo,SetStreamInfo] = useState<StreamInfoType>(
  {
    Access:0,
    RoomNumber:0
  });
  const router = useRouter();

  
  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const accessToken = Cookies.get('access_token');
      if (accessToken === undefined) {
        router.replace('/login');
      }
    }
  }, []);


  const fetchData = async (url:string) => {
    try{
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
              throw new Error("failed to fetch data");
          if (jsonData.is_profile_img_updated)
              SetGameInfo({...GameInfo,myusername:jsonData.username,myimage:process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + jsonData.profile_img});
          else
              SetGameInfo({...GameInfo,myusername:jsonData.username,myimage:jsonData.profile_img});
          return res.json();
    }
    catch{
      throw new Error("failed to fetch data");
    }
      }


const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,
fetchData
);

useEffect(()=>
{
  let notification:HTMLElement| null = document.getElementById('notification');
  let content:HTMLElement| null = document.getElementById('content');
  socket.emit("Online",GameInfo.myusername);
  socket.on("SendRequest",(data)=>
  {
    if(notification && content)
    {
      notification.style.opacity = "1";
      notification.style.display = "flex";
      content.innerText = data.message;
    }
    console.log("InGame: "+InGame.IG);
    if(InGame.IG)
    {
      if(notification)
      {
        notification.style.opacity = "0";
        notification.style.display = "none";
      }
      socket.emit("RequestRefused",data.inviterusername);
      Setaccess(false);
    }
    else if(InviterName !=  "" && InviterName != data.inviterusername)
    {
      socket.emit("RequestRefused",InviterName);
    }
    else
    {
      SetInviterName(data.inviterusername);
      SetGameInfo({...GameInfo,enemmyusername:data.inviterusername,enemmyimage:data.inviterImg});
      Setaccess(true);
    }
  });
  socket.on("DisplayNotification",(message)=>
  {
    if(notification && content)
    {
        notification.style.opacity = "1";
        notification.style.display = "flex";
        content.innerText = message;
    }
    Setaccess(false);
  });
  let interval:NodeJS.Timer = setInterval(()=>
  {
    if(notification)
    {
      notification.style.opacity = "0";
      notification.style.display = "none";
      if(access && InviterName !=  "")
        socket.emit("RequestRefused",InviterName);
    }
    SetInviterName("");
    Setaccess(false);
  },6000);
  return ()=>
  {
    clearInterval(interval);
  };
});
  return (
    
    <html lang="en">
      <body>
      <Providers>
      <UserContext.Provider value={{user, setUser}}>
        {/* {Cookies.get('access_token') != undefined && <Header/>} */}
        <Header/>
        {/* {Cookies.get('access_token') != undefined && <BottomNav/>} */}
        <div className='flex'>

        
        <BottomNav/>
        {/* <div className='child'> */}
              {/* {Cookies.get('access_token') != undefined && children} */}

      
      {/* </div> */}
      <main className="flex-1">
        {/* <div className='child'> */}
        <GameInfoContext.Provider value={{ GameInfo,SetGameInfo }}>
          <GameDataContext.Provider value={{ GameData,SetGameData}}>
            <StreamInfoContext.Provider value={{ StreamInfo,SetStreamInfo }}>
              <Notification InviterName={InviterName} access={access}/>
              {children}
            </StreamInfoContext.Provider>
          </GameDataContext.Provider>
        </GameInfoContext.Provider>
        {/* </div> */}
          </main>
        </div>
            
        </UserContext.Provider>
      </Providers>
      </body>
    </html>
  )
}

