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
import Notification from './Components/Notification/Notification';
import GameDataContext,{ GameDataType } from './Game/Online/Play/GameClass/GameClass';

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
  const [GameInfo,SetGameInfo] = useState<GameInfoType>( new GameInfoType());
  const [GameData,SetGameData] = useState<GameDataType>(new GameDataType());
  const [StreamInfo,SetStreamInfo] = useState<StreamInfoType>(new StreamInfoType());
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
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    twofactortoken: Cookies.get('twofactortoken')!,
                }});
        
                if (res.status == 401)
                {
                  document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                  document.cookie = 'twofactortoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                  router.replace("/login")
                }
                    
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
         console.log("error");
    }
      }


const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,
fetchData
);


  return (
    
    <html lang="en">
      <body>
        
      
      <Providers>
      <UserContext.Provider value={{user, setUser}}>
        <Header/>
        <div className='flex h-[90svh]'>

        
        <BottomNav/>
      
      <main className="flex-1">
        <div className='h-full'>
        <GameInfoContext.Provider value={{ GameInfo,SetGameInfo }}>
          <GameDataContext.Provider value={{ GameData,SetGameData}}>
            <StreamInfoContext.Provider value={{ StreamInfo,SetStreamInfo }}>
              <Notification/>
              {children}
            </StreamInfoContext.Provider>
          </GameDataContext.Provider>
        </GameInfoContext.Provider>
        </div>
          </main>
        </div>
            
        </UserContext.Provider>
      </Providers>
      </body>
    </html>
  )
}

