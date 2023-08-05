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
        {/* <img src={props.avatar_updated ? new_src_img : props.avatar} alt="User Avatar" className="w-16 h-16 rounded-full border-4 border-blue-500 cursor-pointer animate-pulse" />
        <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center animate-fadeInOutAnimation" id="updateAvatarIcon">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 12.293a1 1 0 011.414 0l4 4a1 1 0 11-1.414 1.414L8 14.414V18a1 1 0 11-2 0v-3.586L3.707 17.707a1 1 0 11-1.414-1.414l4-4zM3 4a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3V4a3 3 0 00-3-3H3zm2 9V5a1 1 0 011-1h4a1 1 0 011 1v8h1a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </div> */}
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
      
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" >Edit Profile</button>
    </div>

  </div>
    );
};
export default ProfileInfo;
