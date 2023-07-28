'use client'
import OneFriend from "./OneFriend";
import { useState, useEffect } from 'react'
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
        router.replace("/")
             
    if (!res.ok)
        throw new Error("failed to fetch users");
    return res.json();
}


    const {data, isLoading} = useSWR(`http://localhost:1337/user/friends`,
    fetchFriends
    );



    if (data)
    {
        myFriends = data.map(friend => {
            return <OneFriend key={friend.id} 
            image={friend.profile_img}  
            username={friend.username} 
            status={friend.status}
            id={friend.id}
            />
        })
    }

    
    return (
        <div>

<h3 className="first_h3">Friends</h3>
            <div className="Friends">
                {myFriends ? myFriends : "No friend!"}
            </div>
        </div>
        
    );
};
export default Friends;