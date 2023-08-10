"use client";
import { useEffect, useState } from 'react';
import Header from './Components/Header/Header'
import BottomNav from './Components/BottomNav/BottomNav'
import './globals.css'
import { Providers } from "./providers";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import UserContext from './UserContext';

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

  
      useEffect( () =>{


        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,{
              method: 'GET',
          headers: {
              Authorization: `Bearer ${Cookies.get('access_token')}`
           }
            });
            if (response.status == 401)
                router.replace("/login")
            const jsonData = await response.json();

            setUser(jsonData);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();

      },[]);
  return (
    
    <html lang="en">
      <body >
      <Providers>
      <UserContext.Provider value={{user, setUser}}>
            <Header/>
          
          <BottomNav/>
            
            <div className='child'>
              {children}
            </div>
        </UserContext.Provider>
      </Providers>
      </body>
    </html>
  )
}

