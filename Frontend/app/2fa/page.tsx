"use client"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import useSWR from "swr"
import fs from 'fs'
import { Input } from '@chakra-ui/react';



export default  function TwoFactor()
{
    const router = useRouter();
    const [qrCodeDataUrl, setQRCodeDataUrl] = useState("");

    useEffect(() => {
        
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/2fa/generate`,{
            method: 'POST',
            headers: {
               Authorization: `Bearer ${Cookies.get('access_token')}`
             }
        }
        
        )
          .then((response) => response.blob())
          .then((blob) => {
           
            const reader = new FileReader();
            reader.onloadend = () => {
              setQRCodeDataUrl(reader.result);
            };
            reader.readAsDataURL(blob);
          })
          .catch((error) => {
            console.error('Error fetching QR code:', error);
          });
      }, []);

    
   return(
    <>
    <div className="container mx-auto items-center flex">
        
        <div className="items-center mx-auto">
        <h1 className="text-2xl font-semibold text-blue-500">2FA Check Code</h1>
        <form  className="items-center mt-[50px]">
                
                <img src={qrCodeDataUrl} />

        <div className="mt-[50px]">
            <Input
    placeholder='type code ...'
    _placeholder={{ opacity: 1, color: 'gray.500' }}
    
    className="focus:outline-none"
    variant='flushed'
    id="username"
    // onChange={(event) => setusername_updated(event.target.value)}
    
    // value={username_updated}
    
    />

<div className="text-center mt-2">
      
      <button  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" >Send</button>
      
    </div>
    </div>
                
        </form>
        </div>
            
            
        
    </div>
    </>
   );
}