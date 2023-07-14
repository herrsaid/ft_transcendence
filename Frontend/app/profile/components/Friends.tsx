'use client'
import OneFriend from "./OneFriend";
import { useState, useEffect } from 'react'




        
const Friends = () => {

    const [Friends, setfriends] = useState([])
    const cookieStore = document.cookie;
    useEffect(()=>{
        var arr = cookieStore.split("=");
    
        fetch("http://localhost:1337/user/friends", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${arr[1]}`,
             },
          }).then((response) => response.json())
          .then(data => setfriends(data))  
    },[]); 



    const myFriends = Friends.map(friend => {
        return <OneFriend key={friend.id} 
        image={friend.profile_img}  
        username={friend.username} 
        status={friend.status}
        id={friend.id}
        />
    })
    return (
        <div>

<h3 className="first_h3">Friends</h3>
            <div className="Friends">
                {myFriends}
            </div>
        </div>
        
    );
};
export default Friends;