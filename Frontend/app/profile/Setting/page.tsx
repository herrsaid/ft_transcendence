"use client"
import '../profile.css'
import Cookies from 'js-cookie';
import useSWR from "swr"
import React, { useState } from 'react';

import { useToast } from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Switch,
  Input,

} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { update } from 'react-spring';







export default  function Profile()
{
    const router = useRouter();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [username_updated, setusername_updated] = useState("");
    const [isToFactorEnabled, setisToFactorEnabled] = useState(true);
    const [userNameErrors, setuserNameErrors] = useState(false);
    
   



    if (username_updated === sessionStorage.getItem('username'))
    {
      toast({
        title: 'you are not updated your username with new value',
        description: "Please enter valid username",
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
      // setuserNameErrors(true);
      // setusername_updated("") ;
    }
    const onUpdate_Username = async (event:React.FormEvent) =>
    {
        event.preventDefault();
       
        if (username_updated.trim() == "" || username_updated.trim().length < 2 || username_updated.includes(' '))
        {
          toast({
            title: 'Username invalid.',
            description: "Please enter valid username",
            status: 'error',
            duration: 9000,
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
          duration: 9000,
          isClosable: true,
        })
        
      }
      else
      {
        setusername_updated("")
        toast({
          title: 'Username Updated.',
          description: "We've updated your account username.",
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
        router.replace("/profile");
      }

        
    };

   

    

    const SwitchHandle = () =>{
      setisToFactorEnabled(!isToFactorEnabled)
      router.replace("/2fa")
    }






    
    return(
        
        <div className="container mx-auto px-20 py-10">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
           
            <div className="items-center mx-auto">
                
            <h1 className="text-2xl font-semibold text-blue-500">Account Setting</h1>





                <form  className="items-center">
          
   
          <div className=""> 
                <h3 ><span className="text-2xl font-semibold text-gray-500 mr-14">2FA</span><Switch size='lg'  m={8}  isChecked={isToFactorEnabled} onChange={SwitchHandle} />  </h3>
            </div>

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
    <div className="text-right mt-10">
      
      <button disabled={userNameErrors ? true : false} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={onUpdate_Username}>Save</button>
      
    </div>
            </div>
            


            
  
    </form>

            </div>
            
                
        
           
         
       
            </div>

        </div>

     
    );
}