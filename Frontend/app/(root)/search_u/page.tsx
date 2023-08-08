"use client"

import { useRouter, useSearchParams } from "next/navigation";

import Cookies from 'js-cookie';

import useSWR from "swr"
import OneFriend from "../profile/components/OneFriend";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";


const fetchUsers = async (url:string) => {
    const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});

    // console.log(res)
    if (!res.ok)
    {
        throw new Error("failed to fetch users");
    }
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
        return <div className="profile_container">
            <div className="all_profile">
            <div className="side_two">
            <div className="side_two_info">
            <Box padding='6' boxShadow='md' bg='#39396f' borderRadius={25}>
                
                    <SkeletonCircle size='10' />
                
                </Box>
                </div>
                </div>
                </div>   
        </div>
    }

    if (!data)
        return null;
    return(
       <>
       <div>
       <div className="Friends">
            
       {data.map(user => {
        return <OneFriend key={user.id} 
        image={user.profile_img}  
        username={user.username} 
        status={user.status}
        id={user.id}
        avatar_updated={user.is_profile_img_updated}
        />
    })}
</div>
       </div>
       </>
    );
}