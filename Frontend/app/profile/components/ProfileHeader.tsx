import Link from "next/link";
import ProfileAvatar from "./ProfileAvatar";

  interface props{
    avatar:string,
    email:string,
    username:string,
    rank:string,
    avatar_updated:boolean
  }


const ProfileInfo = (props:props) => {
    let new_src_img;
    if (props.avatar_updated)
            {
                console.log("updated...")
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.avatar;
                sessionStorage.setItem('avatar', new_src_img);
            }
            else
            {
                console.log("not updated")
                sessionStorage.setItem('avatar', props.avatar );
            }
    return (
        
        <div className="flex items-center justify-between mb-6">
    <div className="flex items-center">
     
      <div className="relative">
       
       <ProfileAvatar img={props.avatar} username={props.username} avatar_updated={props.avatar_updated}/>
        
      </div>
      <div className="ml-4">
        <h1 className="text-3xl font-semibold text-blue-500">{props.username}</h1>
        <p className="text-gray-600">{props.email}</p>
         
      <div className="rounded-lg bg-blue-500 text-white py-1 px-2 text-sm font-semibold mr-4">
        Rank: {props.rank}
      </div>
      </div>
    </div>

    



    <div className="text-right">
      <Link href="/profile/Setting">
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" >Edit Profile</button>
      </Link>
      
    </div>

  </div>
    );
};
export default ProfileInfo;
