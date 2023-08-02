"use client"
import ProfileInfoNav from "./ProfileInfoNav";
import "../profile.css"

import {FaUpload} from 'react-icons/fa'
import Cookies from 'js-cookie';
import { Image } from "@chakra-ui/react";
import { useState } from "react";


interface props{
    img:string,
    username:string,
    avatar_updated:boolean
}



const ProfileAvatar = (props:props) => {

    let new_src_img;
    const [realimg, setrealimg] = useState("");
    const [first_time, setfirsttime] = useState(false)

        const upload = async () => {
   
            var avatar = document.querySelector('input[type="file"]')

            var data = new FormData()
            data.append('file', avatar?.files[0])
            data.append('user', 'hubot')

            
            const  res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/edit/avatar`, {
                method: 'PUT',
                headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                body: data
            })
            if (!res.ok)
                throw new Error("failed to fetch users");
            else
            {
                setrealimg(URL.createObjectURL(avatar?.files[0]));
                setfirsttime(true);
                // sessionStorage.setItem('avatar', realimg);
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.img;
                // setrealimg(new_src_img);
            
                // console.log(realimg)
            }
                
            };


            if (props.avatar_updated)
            {
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.img;
                sessionStorage.setItem('avatar', new_src_img);
            }
            else
                sessionStorage.setItem('avatar', props.img );
                


    return (
        <div>

            <div className="profile_avatar">
                <div className="avatar_edit_real">
                    
                    <Image
  borderRadius='full'
  boxSize='100px'
  src={props.avatar_updated || first_time ? realimg ? realimg  : new_src_img : props.img}
  alt='Dan Abramov'
/>
                    <label>
                    <FaUpload/>
                    <form >
                        
                        <input type="file" id="avatar" name="file" onChange={upload}/>
                        
                    </form>
                    
                    </label>
                    
                </div>


                        <div>

                            
                        <p className="username">{props.username}</p>
                        </div>
                        <div>
                        <ProfileInfoNav/> 
                        </div>
                               
                </div>
        </div>
    );


    
};
export default ProfileAvatar;