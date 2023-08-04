import OneHistory from "./OneHistory";
import { Avatar, AvatarBadge, Box, Flex } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr"
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
        
const History = () => {


    const router = useRouter();
    let myHistory;
    let new_src_img:string;
    
    const fetchFriends = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});

    if (res.status == 401)
        router.replace("/login")
             
    if (!res.ok)
        throw new Error("failed to fetch users");
    return res.json();
}


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends`,
    fetchFriends
    );

    if (isLoading)
    {
        return <div className="skeleton">
           
            <Box padding='6' boxShadow='lg' bg='#39396f' borderRadius={25}>
                
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                    
                    
                
                </Box>
                
                </div>
    }

    if (data)
    {
        myHistory = data.map(history => {
            if (history.is_profile_img_updated)
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + history.profile_img;
            return <OneHistory key={history.id} image={history.is_profile_img_updated ? new_src_img : history.profile_img}
            username={history.username} id={history.id} avatar_updated={history.is_profile_img_updated} 
            status={history.status}
            />
        });
    }



    return (

        <div className="side_two_history">
                {myHistory ? myHistory : "No History!"}
        </div>
    );
};
export default History;