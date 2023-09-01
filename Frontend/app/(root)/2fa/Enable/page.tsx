"use client"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from 'react';
import { Input, useToast } from '@chakra-ui/react';
import UserContext from '../../UserContext';
import "../../profile/profile.css"


export default  function TwoFactor()
{
    const router = useRouter();
    const [qrCodeDataUrl, setQRCodeDataUrl] =  useState<string>("");;
    const [code, setcode] = useState("");
    const toast = useToast()
    const user = useContext(UserContext);

    if (typeof window !== 'undefined') {
      if (user.user.isTwoFactorAuthenticationEnabled)
      {
        router.replace("/2fa/Disable")
      }
    }
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
              if (typeof reader.result === 'string') {
                setQRCodeDataUrl(reader.result);
              } else {
                console.error('error.');
              }
            };
            reader.readAsDataURL(blob);
          })
          .catch((error) => {
            console.error('Error fetching QR code:', error);
          });
      }, []);




    const EnableTwoFactor = async (event:React.FormEvent) =>
    {
        event.preventDefault();



        const  res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/2fa/turn-on`, {
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
          title: '2FA Enabed in this Account.',
          description: "We've Enabled 2FA in Your account. You need to Login Again For Security Reason!",
          position: 'top-right',
          status: 'info',
          duration: 6000,
          isClosable: true,
        })
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'twofactortoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.replace("/login");
      }
    }
    
   return(
    <>
    <div className="container mx-auto items-center flex">
        
        <div className="items-center mx-auto">
        <h1 className="text-2xl font-semibold text-purple-500 text-center">Enable 2FA</h1>
        <form  className="items-center mt-[50px]">
                
                <img src={qrCodeDataUrl} />

        <div className="mt-[50px]">
            <Input
    placeholder='type code ...'
    _placeholder={{ opacity: 1, color: 'gray.500' }}
    
    className="focus:outline-none"
    variant='flushed'
    id="code"
    onChange={(event) => setcode(event.target.value)}
    
    value={code}
    
    />

<div className="text-center mt-8">
      
      <button  className="stats-bgf forhover text-white py-2 px-4 rounded-lg" onClick={EnableTwoFactor}>Send</button>
      
    </div>
    </div>
                
        </form>
        </div>
            
            
        
    </div>
    </>
   );
}