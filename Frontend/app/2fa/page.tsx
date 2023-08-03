"use client"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import useSWR from "swr"
import fs from 'fs'



export default  function TwoFactor()
{
    const router = useRouter();
    const [dataURLQr, setdataURLQr] = useState("");
        const GenerateQrCode = async (url:string) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                 }});
    

        const readableStream = res.body
        const textDecoder = new TextDecoder();
        const text = await readableStream?.pipeThrough(new TextDecoderStream()).getReader().read();
       
        if (res.status == 401)
            router.replace("/login")
                 
        if (!res.ok)
            throw new Error("failed to fetch users");
        console.log(text?.value)
        fs.writeFileSync('/qr.png', text?.value);
        setdataURLQr(text?.value);
    }
    
    
        const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/2fa/generate`,
        GenerateQrCode
        );

        console.log(data)
    
   return(
    <>
    <div>
        <h1>
            2FA CHECK
            {/* {data} */}
            <img src={dataURLQr} />
        </h1>
    </div>
    </>
   );
}