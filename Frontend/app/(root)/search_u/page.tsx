"use client"

import { useSearchParams } from "next/navigation";
import Cookies from 'js-cookie';
import useSWR from "swr"
import OneFriend from "../profile/components/OneFriend";
import { Box, SkeletonCircle} from "@chakra-ui/react";


const fetchUsers = async (url:string) => {
    const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});
    return res.json();
}

export default function SearchPage()
{
    
    const searchParams = useSearchParams()
    const query = searchParams?.get('q')
    const encodedsearchQuery = encodeURI(query || "");

    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/search?q=${encodedsearchQuery}`,
    fetchUsers
    );

    
    if (isLoading)
    {
        return <div className="container mx-auto px-2 py-10 pb-32">
            
            <Box padding='6' boxShadow='md' bg='#39396f' borderRadius={25}>
                
                    <SkeletonCircle size='10' />
                
                </Box>
        </div>
    }
    
    if (data.length == 0)
    {
        return <div className="container mx-auto px-2 py-10 pb-32">User Not Found</div>
    }
    if (!data)
    {
        return <div className="container mx-auto px-2 py-10 pb-32">User Not Found</div>
    }
        
    return(
       <>
       <div className="container mx-auto px-2 py-10 pb-32">
       <div className="w-full p-6 rounded-lg shadow-md mx-auto items-center">
       <div className="w-[300px] mx-auto items-center">
       {data.map((user:any) => {
        return <div  key={user.id} className='mb-2'><OneFriend 
        image={user.profile_img}  
        username={user.username} 
        status={user.status}
        id={user.id}
        avatar_updated={user.is_profile_img_updated}
        /></div>
    })}
</div>
</div>
</div> 
       </>
    );
}