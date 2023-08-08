'use client'
import '../Home.css'
import Cookies from 'js-cookie';
import useSWR from "swr"
import { useRouter } from 'next/navigation';


export default function HomeStats() {


  let new_src_img;
  const router = useRouter();

  const fetchProfileData = async (url:string) => {
      const res = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${Cookies.get('access_token')}`
           }});

  if (res.status == 401)
      router.replace("/login")
           
  if (!res.ok)
      throw new Error("failed to fetch data of the user");
  return res.json();
}


  const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,
  fetchProfileData
  );

  if (!data)
    return null;


    if (data.is_profile_img_updated)
      new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + data.profile_img;
  return (

    <div className="py-8">
  <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-lg shadow-md p-6 flex items-center space-x-4 transform transition-transform hover:scale-105 cursor-pointer">
    <div className="w-16 h-16 rounded-full overflow-hidden">
      <img src={data.is_profile_img_updated ? new_src_img : data.profile_img} alt="Your Avatar" className="w-full h-full object-cover"/>
    </div>
    <div className="flex flex-col flex-1 space-y-2">
      <div className="text-white text-lg font-semibold">{data.username}</div>
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