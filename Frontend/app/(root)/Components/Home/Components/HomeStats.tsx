'use client'
import '../Home.css'
import { useContext } from "react";
import UserContext from '@/app/(root)/UserContext';
import { Avatar } from '@chakra-ui/react';

import Cookies from 'js-cookie';
import useSWR from "swr"
import Link from 'next/link';


export default function HomeStats() {


  let new_src_img;
  const usercontext = useContext(UserContext);

  const fetchFriends = async (url:string) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
         }});

    
    return res.json();
}


const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/stats/me`,
fetchFriends
);


if (usercontext.user.is_profile_img_updated)
    new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + usercontext.user.profile_img;

if (!data)
{
  return <div className="live-game-card playbanner rounded-lg shadow-md p-6 flex flex-col justify-between">
 <Link href="/profile" className="text-blue-400 font-semibold mt-4">
 <div className="w-16 h-16 rounded-full overflow-hidden">
<Avatar size='md' name={usercontext.user.username} src={usercontext.user.is_profile_img_updated ? new_src_img : usercontext.user.profile_img} className="w-full h-full object-cover profile-img">
                  </Avatar>
</div>
        </Link>
  
<div className="">

<div className="flex items-center justify-between">
<div className="text-purple-400 text-lg">Games: 0</div>
<div className="text-green-400 text-lg">Wins: 0</div>
<div className="text-yellow-400 text-lg">Losses: 0</div>
</div>
<div className="text-blue-400 text-xl mt-4">Win Rate: 0%</div>
</div>
</div>
}


const winRate = (data.totalwins / data.totalgames) * 100;
  return (



    <div className="live-game-card playbanner rounded-lg shadow-md p-6 flex flex-col justify-between">
        <div className="w-16 h-16 rounded-full overflow-hidden">
        <Link href="/profile" className="text-blue-400 font-semibold mt-4">
    <Avatar size='md' name={usercontext.user.username} src={usercontext.user.is_profile_img_updated ? new_src_img : usercontext.user.profile_img} className="w-full h-full object-cover profile-img">
                        </Avatar>
                        </Link>
    </div>
    <div className="">
    
    <div className="flex items-center justify-between">
      <div className="text-purple-400 text-lg">Games: {data.totalgames}</div>
      <div className="text-green-400 text-lg">Wins: {data.totalwins}</div>
      <div className="text-yellow-400 text-lg">Losses: {data.totalosses}</div>
    </div>
    <div className="text-blue-400 text-xl">Win Rate: { (winRate - Math.floor(winRate) < 0.5)? Math.floor(winRate) : Math.ceil(winRate)}%</div>
  </div>
      </div>
//     



  );
}