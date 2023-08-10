import Friend from "./friends";
import { BiSearchAlt } from 'react-icons/bi'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Chats()
{
    const [friends, setFriends] = useState([])
    useEffect(()=>{
        
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
            
        }).then((response) => response.json())
        .then(data => setFriends(data))  
    },[]);

    let new_src_img:string;
    const newArray = friends.map((frnd:any)=>
    {
        if (frnd.is_profile_img_updated)
        {
            new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + frnd.profile_img;
        }
        return (<Friend id={frnd.id} avatar={frnd.is_profile_img_updated ? new_src_img : frnd.profile_img} username={frnd.username} />)
    })
    return (
        <div className="flex flex-col">
            <div className="text-center text-2xl pb-3">Chats</div>
            <div className="flex justify-around border-b-2 border-gray-500 m-2">
                <div className="hover:bg-sky-900 w-1/2 text-center border-r-2 border-gray-500 cursor-pointer">friends</div>
                <div className="hover:bg-sky-900 w-1/2 text-center cursor-pointer" >groups</div>
            </div>
            <div className="self-center mt-2 mb-2 w-[90%] relative drop-shadow-md">
                <form action="">
                    <input className="bg-sky-900 rounded-full pl-3 pr-2 p-1 focus:outline-none w-full" type="search" placeholder="search..."/>
                    <button className="absolute right-2 top-1" type="submit"><BiSearchAlt size={21}/></button>
                </form>
            </div>
            <div className="pl-3">
                {newArray}
            </div>
        </div>
    )
}