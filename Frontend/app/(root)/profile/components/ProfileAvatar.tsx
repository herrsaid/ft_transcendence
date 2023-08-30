"use client"
import "../profile.css"
import Cookies from 'js-cookie';
import { useState } from "react";
import { Avatar, useToast } from '@chakra-ui/react'
import UserContext from "../../UserContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

interface props{
    img:string,
    username:string,
    avatar_updated:boolean
}



const ProfileAvatar = (props:props) => {
    const user = useContext(UserContext);
    let new_src_img;
    const [realimg, setrealimg] = useState("");
    const [first_time, setfirsttime] = useState(false)
    const toast = useToast()
    const router = useRouter();

        const upload = async (file:any) => {
            if (!file)
                return null;
            
            
            var data = new FormData()
            data.append('file', file)
            data.append('user', 'hubot')

            
            const  res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/edit/avatar`, {
                method: 'PUT',
                headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                body: data
            })
            

            if (res.status == 200)
            {
                toast({
                    title: 'Profile Avatar Updated',
                    description: "Your Profile Avatar changed!",
                    status: 'info',
                    position:'top-right',
                    duration: 5000,
                    isClosable: true,
                  })
                


                    const fetchData = async () => {
                      try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,{
                          method: 'GET',
                          headers: {
                            Authorization: `Bearer ${Cookies.get('access_token')}`,
                            twofactortoken: Cookies.get('twofactortoken')!,
                       }
                        });
                        if (response.status == 401)
                            router.replace("/login")
                        const jsonData = await response.json();
                        user.setUser(jsonData);
            
                        
                      } catch (error) {
                        console.error('Error fetching data:', error);
                      }
                    };
                    fetchData();
            

            }
            

            if (res.status == 400)
            {
                toast({
                    title: 'Invalid File',
                    description: "Please upload Valid Image type PNG OR JPG OR JPEG, or reduce the file size",
                    status: 'error',
                    position:'top-right',
                    duration: 5000,
                    isClosable: true,
                  })
                  return ;
            }
            if (!res.ok)
                throw new Error("failed to fetch users");
            else
            {
                setrealimg(URL.createObjectURL(file));
                setfirsttime(true);
                
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.img;
            }
                
            };


            if (props.avatar_updated)
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.img;
                


    return (

                <div className="avatar_edit_real border-2 border-blue-500/100 rounded-full">

                    <label className="cursor-pointer animate-pulse">
                    <Avatar size='xl' name={props.username} src={props.avatar_updated || first_time ? realimg ? realimg  : !props.avatar_updated ? props.img : new_src_img : props.img}>
                        </Avatar>
                        
                            <form >
                                <input type="file" accept="image/*" id="avatar" name="file"  onChange={(e) => {
     const selectedFile: File | undefined = e.target.files?.[0];
    if (selectedFile) {
      upload(selectedFile);
    } 
  }} />
                            </form>
                    </label>  
                </div>


    );


    
};
export default ProfileAvatar;