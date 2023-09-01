import Link from "next/link";
import ProfileAvatar from "./ProfileAvatar";
import Cookies from 'js-cookie';
import useSWR from "swr"

  interface props{
    avatar:string,
    email:string,
    username:string,
    rank:string,
    avatar_updated:boolean
  }


const ProfileInfo = (props:props) => {


  const fetchData = async (url:string) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
         }});
        return res.json();
      }


const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/rank/me`,
fetchData
);

let new_src_img;
let rankbg;
     
      if (!data)
        return null;

    if (data.rank == 'beginner')
        rankbg = 'bg-purple-500';
    else if (data.rank == 'bronze')
        rankbg = 'bg-gray-500';
    else if (data.rank == 'silver')
        rankbg = 'bg-indigo-500';
    else if(data.rank == 'gold')
        rankbg = 'bg-yellow-500';
    else if(data.rank == 'diamond')
        rankbg = 'bg-sky-500';
    else if(data.rank == 'platiniom')
        rankbg = 'bg-violet-500';
    else if(data.rank == 'legendary')
        rankbg = 'bg-emerald-500';
    
    if (props.avatar_updated)
        new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.avatar;
    return (
        
        <div className="flex items-center justify-between mb-6 flex-wrap">
    <div className="flex items-center">
     
      <div className="relative">
       
       <ProfileAvatar img={props.avatar} username={props.username} avatar_updated={props.avatar_updated}/>
        
      </div>
      <div className="ml-4">
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-purple-500">{props.username}</h1>
        <p className="text-gray-600">{props.email}</p>
         
      <div className={`rounded-md md:rounded-lg lg:rounded-lg ${rankbg} text-white py-1 px-2 text-sm font-semibold mr-4`}>
        Rank: {data.rank}
      </div>
      </div>
    </div>

    

    
    <div className="text-right">
      <Link href="/profile/Setting">
      <button className="stats-bgf text-white py-2 px-4 rounded-md mt-4 forhover" >Edit</button>
      </Link>
      
    </div>

  </div>
    );
};
export default ProfileInfo;
