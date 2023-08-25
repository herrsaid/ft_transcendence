import OneHistory from "./OneHistory";
import { Box } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import useSWR from "swr"
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import Link from "next/link";
        
const History = () => {


    const router = useRouter();
    let myHistory;
    
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
        myHistory = data.map((history:any) => {
            return <OneHistory key={history.key} 
            rank={history.rank}
            score={history.score}
            myresult={history.myresult}
            enemmyresult={history.enemmyresult}
            enemmyuserid={history.enemmyuserid}
            />
        });
    }
   

    try{
        if (!data.length)
    {
        return (
            <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        
                
        <div className="live-game-card bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <div className="text-white text-lg font-semibold mb-4">Play Games Now</div>
        <p className="text-white">You Dont have Any History Play Match Now!</p>
        <Link href="/Game/Lobbie" className="text-blue-400 font-semibold mt-4">
        Play Now
        </Link>

      </div>
        
        </div>
      </main>
        )
        
    }
    }
    catch{
        router.replace("/login")
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