import OneHistory from "./OneHistory";
import { Box } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import useSWR from "swr"
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
        
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


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/history/me`,
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
            rank={history.rank}
            score={history.score}
            myresult={history.myresult}
            enemmyresult={history.enemmyresult}
            />
        });
    }



    return (
        <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        
                {myHistory ? myHistory : "No History!"}
        
        </div>
      </main>
    );
};
export default History;