'use client'
import OneFriend from "./OneFriend";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr"


        
const Friends = () => {
    
    const router = useRouter();
    let myFriends;
    
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


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends/me`,
    fetchFriends
    );



    try{
        if (!data.length)
    {
        return (
            <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        
                
        <div className="live-game-card bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        
        <p className="text-white">You Dont have Any Friends!</p>

        <Link href="/Users" className="text-blue-400 font-semibold mt-4">
        Find Friends
        </Link>
      </div>
        
        </div>
      </main>
        )
        
    }
    }
    catch{
        
        return (
            <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        
                
        <div className="live-game-card bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        
        <p className="text-white">You Dont have Any Friends!</p>

        <Link href="/Users" className="text-blue-400 font-semibold mt-4">
        Find Friends
        </Link>
      </div>
        
        </div>
      </main>
        )
    }

    if (data)
    {
        myFriends = data.map((friend:any) => {
            return <OneFriend key={friend.id} 
            image={friend.profile_img}  
            username={friend.username} 
            status={friend.status}
            id={friend.id}
            avatar_updated={friend.is_profile_img_updated}
            />
        })
    }

    
    return (
        
        <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {myFriends ? myFriends : "No friend!"}
            
            </div>
      </main>
        
    );
};
export default Friends;