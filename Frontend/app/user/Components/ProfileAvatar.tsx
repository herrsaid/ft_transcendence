"use client"
import { useEffect, useState } from "react";
import "../../profile/profile.css"
import Cookies from 'js-cookie';
import useSWR from "swr"
import { Avatar, AvatarBadge} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface props{
    img:string,
    username:string,
    id:number,
    avatar_updated:boolean,
    status:boolean
}



const ProfileAvatar = (props:props) => {

    let new_src_img;
    const router = useRouter();
    
    let button_placeholder = 'request';
    const [status, setstatus] = useState("")
   
  

    const fetchFriendStatus = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});

        if (res.status == 401)
            router.replace("/")
             
        if (!res.ok)
            throw new Error("failed to fetch users");
        return res.json();
    }


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/status/${props.id}`,
    fetchFriendStatus
    );

    if (!data)
        return null;



    const send_request = () =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/send/${props.id}`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
        }
            
          }).then((response) => response.json())
          .then(data => setstatus("cancel"))
    }
    


    const handel_response_user = (friendRequestId:string, user_response:string) =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/response/${friendRequestId}`, {
            method: 'PUT',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({ status: user_response })
            
          }).then((response) => response.json())
          .then(data => setstatus(data.status))
    }

    console.log(data)
    



    if (data.status === 'pending')
        button_placeholder = 'cancel';
    else if (data.status === 'not-sent')
        button_placeholder = 'request';
    else if (data.status === 'waiting-for-current-user-response')
        button_placeholder = 'accept';
    else if (data.status === 'accepted')
        button_placeholder = 'unfriend';
    else if (data.status === 'declined')
        button_placeholder = 'request';

    const handel_all_request = () =>
    {

        if (data.status === 'pending'){
            button_placeholder = 'cancel';
            handel_response_user(data.id, 'not-sent');
    
        }
        else if (data.status === 'not-sent')
        {
            button_placeholder = 'request';
            send_request();
            console.log("requested")
        }
        else if (data.status === 'waiting-for-current-user-response')
        {
            button_placeholder = 'accept';
            handel_response_user(data.id, 'accepted');
            console.log("accepted")
        }
        else if (data.status === 'accepted')
        {
            button_placeholder = 'unfriend';
            handel_response_user(data.id, 'not-sent');
            console.log("unfriend")
        }
        else if (data.status === 'declined')
        {
            button_placeholder = 'request';
            send_request();
            console.log("requested")
        }
        
        setstatus(button_placeholder)
    }






    if (props.avatar_updated)
        new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.img;
    return (
        
            <div className="profile_avatar">
                
                <div className="avatar_edit_real">
 
                    <Avatar size='xl' name='Segun Adebayo' src={props.avatar_updated ? new_src_img : props.img}>
                        <AvatarBadge boxSize='0.8em' bg={props.status ? 'green.500' : 'tomato'} borderColor='#18184a' />
                        </Avatar>
  
                </div> 
                            <div>
                            <p className="username_user">{props.username}</p>
                            </div>
                        <div>
                            <button className={data.status == 'pending' ? 'request_sent' : 'add_friend_btn'} onClick={handel_all_request}>{status ? status : button_placeholder}</button>
                            <button className="add_friend_btn">message</button>
                        </div>
                </div>
        
    );


    
};
export default ProfileAvatar;