"use client";
import {useState } from 'react';
import Header from './Components/Header/Header'
import BottomNav from './Components/BottomNav/BottomNav'
import './globals.css'
import { Providers } from "./providers";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import UserContext from './UserContext';
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
        {/* {Cookies.get('access_token') != undefined && <Header/>} */}
        <Header/>
        {/* {Cookies.get('access_token') != undefined && <BottomNav/>} */}
        <BottomNav/>
        {/* <div className='child'> */}
              {/* {Cookies.get('access_token') != undefined && children} */}

        { children}
      {/* </div> */}
          
            
            
        </UserContext.Provider>
      </Providers>
      </body>
    </html>
  )
}

