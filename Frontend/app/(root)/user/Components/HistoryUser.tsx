import { Box } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import useSWR from "swr"
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import Link from "next/link";
import OneHistoryUser from "./OneHistoryUser";



interface props{
    id:number
}


const HistoryUser = (props:props) => {

    let myHistory;
    
    const fetchFriends = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});
    return res.json();
}


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/history/match/${props.id}`,
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


    try
    {
        if (data)
        {
        myHistory = data.map((history:any) => {
            return <OneHistoryUser key={history.key} 
            rank={history.rank}
            score={history.score}
            myresult={history.myresult}
            enemmyresult={history.enemmyresult}
            enemmyuserid={history.enemmyuserid}
            />
        });
        }
    }
    catch{
        return null;
    }
    

    
    if (!data.length)
    {
        return (
            <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        
                
        <div className="live-game-card stats-bgf rounded-lg shadow-md p-6 flex flex-col justify-between">
        <p className="text-white">This is a New Player and He doesnt have any History to Show!</p>
        <Link href="/Game/Lobbie" className="text-blue-400 font-semibold mt-4">
        Play Now
        </Link>

      </div>
        
        </div>
      </main>
        )
        
    }


    return (
        <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        
                {myHistory ? myHistory : "No History!"}
                
        
        </div>
      </main>
    );
};
export default HistoryUser;