'use client'
import '../Home.css'
import { useContext } from "react";
import UserContext from '@/app/(root)/UserContext';
import { Avatar } from '@chakra-ui/react';


export default function HomeStats() {


  let new_src_img;
  const usercontext = useContext(UserContext);


    if (usercontext.user.is_profile_img_updated)
      new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + usercontext.user.profile_img;
  return (

    <div className="py-8">
  <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-lg shadow-md p-6 flex items-center space-x-4 transform transition-transform hover:scale-105 cursor-pointer">
    <div className="w-16 h-16 rounded-full overflow-hidden">
    <Avatar size='md' name={usercontext.user.username} src={usercontext.user.is_profile_img_updated ? new_src_img : usercontext.user.profile_img} className="w-full h-full object-cover profile-img">
                        </Avatar>
    </div>
    <div className="flex flex-col flex-1 space-y-2">
      <div className="text-white text-lg font-semibold">{usercontext.user.username}</div>
      <div className="flex items-center space-x-4">
        <div className="text-white text-sm">Total Games Played: 25</div>
        <div className="text-white text-sm">Wins: 18</div>
        <div className="text-white text-sm">Losses: 7</div>
      </div>
      <div className="text-white text-sm">Win Rate: 72%</div>
    </div>
    <div>
      <a href="#" className="bg-white text-blue-400 font-semibold py-2 px-4 rounded-lg inline-block">View Details</a>     </div>
  </div>
</div>

  );
}