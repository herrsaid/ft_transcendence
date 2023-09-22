"use client"
import '../profile/profile.css'
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import {
  Input,

} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import UserContext from '../UserContext';
import { ProfileAvatar } from '../profile';
import Link from 'next/link';



export default  function Setup()
{
    const contexUser = useContext(UserContext);
    const router = useRouter();
    const toast = useToast()
    const [username_updated, setusername_updated] = useState("");
    
  
    const onUpdate_Username = async (event:React.FormEvent) =>
    {

        event.preventDefault();

        if (username_updated === contexUser.user.username)
        {
          toast({
            title: 'you are not updated your username with new value',
            description: "Please enter new username",
            status: 'warning',
            duration: 3000,
            position:'top-right',
            isClosable: true,
          })
          return
      
    }
       
        if (username_updated.trim() == "" || username_updated.trim().length < 2 || username_updated.includes(' '))
        {
          toast({
            title: 'Username invalid.',
            description: "Please enter valid username",
            status: 'error',
            duration: 3000,
            position:'top-right',
            isClosable: true,
          })
          return ;
        }
        const  res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/edit/me/username`, {
          method: 'PUT',
          headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json'
              },
          body: JSON.stringify({ username: username_updated })
      });
      if (!res.ok)
      {
        toast({
          title: 'Username already use.',
          description: "this username already use.",
          status: 'error',
          duration: 3000,
          position:'top-right',
          isClosable: true,
        })
        
      }
      else
      {
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,{
              method: 'GET',
              headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                twofactortoken: Cookies.get('twofactortoken')!,
           }
            });
            if (response.status == 401)
                router.replace("/login")
            const jsonData = await response.json();
            contexUser.setUser(jsonData);

            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
        setusername_updated("");
        toast({
          title: 'Username Updated.',
          description: "We've updated your account username.",
          status: 'info',
          duration: 5000,
          position:'top-right',
          isClosable: true,
        })
        router.replace("/profile");
      }

        
    };

   

    

    


    
    return(
        
        <div className="container mx-auto px-20 py-10">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
           
            <div className="items-center mx-auto">
                
            <h1 className="text-2xl font-semibold text-purple-500 text-center">Account Setup</h1>
            <div className='mx-auto py-12'>
            <div className="flex items-center pl-8">
                <div className="relative">
       
                <ProfileAvatar />
        
      </div>
      </div>

                



            <div className=' py-6'>
            <form  className="items-center">
          
   
          

          <div className="">

          <Input
  placeholder='type new username'
  _placeholder={{ opacity: 1, color: 'gray.500' }}
  
  className="focus:outline-none"
  variant='flushed'
  id="username"
  onChange={(event) => setusername_updated(event.target.value)}
  
  value={username_updated}
  
  />
  <div className="text-center mt-10">
    
    <button  className="stats-bgf forhover text-white py-2 px-4 rounded-lg" onClick={onUpdate_Username}>Save</button>
    <Link href='/'>
    <button  className="stats-bgf forhover text-white py-2 px-4 rounded-lg ml-4" >Skip</button>
    </Link>
    
  </div>
          </div>
          


          

  </form>
            </div>
            </div>

                
               

            </div>
            
                
        
           
         
       
            </div>

        </div>

     
    );
}