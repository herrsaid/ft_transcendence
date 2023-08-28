"use client"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Input, useToast } from '@chakra-ui/react';



export default  function TwoFactor()
{
    const router = useRouter();
    const [qrCodeDataUrl, setQRCodeDataUrl] =  useState<string>("");;
    const [code, setcode] = useState("");
    const toast = useToast()


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
          description: "We've Enabled 2FA in Your account.",
          status: 'info',
          duration: 6000,
          isClosable: true,
        })
        router.replace("/profile");
      }
    }
    
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