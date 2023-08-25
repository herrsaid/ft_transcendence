'use client'
import '../Home.css'
import { useContext } from "react";
import UserContext from '@/app/(root)/UserContext';
import { Avatar } from '@chakra-ui/react';
import ProfileUserState from '@/app/(root)/user/Components/ProfileUserState';


export default function HomeStats() {


  let new_src_img;
  const usercontext = useContext(UserContext);


    if (usercontext.user.is_profile_img_updated)
      new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + usercontext.user.profile_img;
  return (

    <div className="py-8 w-[350px] mx-auto">
  <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-lg shadow-md p-6 flex items-center space-x-4 transform transition-transform hover:scale-105">
    <div className="w-16 h-16 rounded-full overflow-hidden">
    <Avatar size='md' name={usercontext.user.username} src={usercontext.user.is_profile_img_updated ? new_src_img : usercontext.user.profile_img} className="w-full h-full object-cover profile-img">
                        </Avatar>
    </div>
    <div className="flex flex-col flex-1 space-y-2">
    
      <div className="flex items-center justify-between">
        <div className="text-purple-400 text-sm">Games: 25</div>
        <div className="text-green-400 text-sm">Wins: 18</div>
        <div className="text-yellow-400 text-sm">Losses: 7</div>
      </div>
      <div className="text-blue-400 text-xl">Win Rate: 72%</div>
    </div>
    
  </div>
</div>



  );
}