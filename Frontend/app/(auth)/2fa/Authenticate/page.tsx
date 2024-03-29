"use client"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Input, useToast } from '@chakra-ui/react';
import {useEffect } from 'react';


export default  function TwoFactor()
{
    const router = useRouter();
    
    const [code, setcode] = useState("");
    const toast = useToast()


    useEffect(() => {
    
      if (typeof window !== 'undefined') {
        if (Cookies.get('access_token') == undefined)
        {
            router.replace("/login");
        }
        else if(Cookies.get('twofactortoken') != undefined)
        {
            router.replace("/");
        }
      }
      
    }, []);
    
    
    const EnableTwoFactor = async (event:React.FormEvent) =>
    {
        event.preventDefault();

        const  res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/2fa/authenticate`, {
          method: 'POST',
          headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json'
              },
          body: JSON.stringify({ twoFactorAuthenticationCode: code })
      });

     
      
      if (res.status == 401)
      {
        toast({
          title: 'Code Invalid.',
          description: "Wrong authentication code.",
          position: 'top-right',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
      
      else if (res.status == 200)
      {
        setcode("")
        toast({
          title: 'Welcome Back.',
          description: "Welcome back to Your account.",
          position: 'top-right',
          status: 'info',
          duration: 3000,
          isClosable: true,
        })

        const dataobject = await res.json();
        Cookies.set('twofactortoken', `${dataobject.twofactortoken}`, { expires: 30 });
        router.replace("/");
      }
    }
    
   return(
    <>
    

    <div className="container mx-auto items-center flex pt-60">
        
        <div className="items-center mx-auto">
        <h1 className="text-2xl font-semibold text-blue-500">2FA Check Code</h1>
        <form  className="items-center mt-[50px]">
                

        <div className="mt-[50px]">
            <Input
    placeholder='type code to login...'
    _placeholder={{ opacity: 1, color: 'gray.500' }}
    
    className="focus:outline-none"
    variant='flushed'
    id="code"
    onChange={(event) => setcode(event.target.value)}
    
    value={code}
    
    />

<div className="text-center mt-2">
      
      <button  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={EnableTwoFactor}>Send</button>
      
    </div>
    </div>
                
        </form>
        </div>
            
            
        
    </div>
    </>
   );
}