"use client"
import '../profile.css'
import Cookies from 'js-cookie';
import useSWR from "swr"
import { useRouter } from 'next/navigation';





export default  function Profile()
{
    const router = useRouter();
    
    return(
        
        <div className="container mx-auto px-4 py-20">
                <h1>Setting</h1>


        </div>

     
    );
}