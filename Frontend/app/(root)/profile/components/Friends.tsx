'use client'
import OneFriend from "./OneFriend";
import Cookies from 'js-cookie';
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


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends`,
    fetchFriends
    );

    if (isLoading) return <div>loading...</div>

    if (data)
    {
        myFriends = data.map(friend => {
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