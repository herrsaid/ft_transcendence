"use client"
import { useEffect, useState } from "react";
import "../../profile/profile.css"
import Cookies from 'js-cookie';
import { Avatar, AvatarBadge, Image, Stack } from "@chakra-ui/react";

interface props{
    img:string,
    username:string,
    id:number
}



const ProfileAvatar = (props:props) => {

    let button_placeholder = 'request';
    // const [is_clicked, setclicked] = useState(false)
    const [mydata, setData] = useState([])
   
    
    
    
    useEffect(()=>{
        
        if (props.id != undefined)
        {
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/status/${props.id}`, {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
                
            }).then((response) => response.json())
            .then(data => setData(data))
            
            
        }
        
    },[props.id]);

    const send_request = () =>
    {
        // setclicked(!is_clicked)
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/send/${props.id}`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
        }
            
          }).then((response) => response.json())
          .then(data => setData(data))
    }
    

    console.log(mydata.status)
    
    if (mydata.status === 'pending')
        button_placeholder = 'cancel';
    else if (mydata.status === 'not-sent')
        button_placeholder = 'request';
    else if (mydata.status === 'waiting-for-current-user-response')
        button_placeholder = 'accept';
    else if (mydata.status === 'accepted')
        button_placeholder = 'unfriend';
    else if (mydata.status === 'declined')
        button_placeholder = 'request';
    return (
        <div>

            <div className="profile_avatar">
                
            



                <div className="avatar_edit_real">
                    {/* <img src={props.img} ></img> */}

                    
                    <Avatar size='xl' name='Segun Adebayo' src={props.img}>
    <AvatarBadge boxSize='0.8em' bg='green.500' borderColor='#18184a' />
  </Avatar>
  

  {/* <Avatar>
    <AvatarBadge boxSize='1.25em' bg='green.500' />
  </Avatar> */}
                    {/* <Image
  borderRadius='full'
  boxSize='125px'
  src={props.img}
  alt='Dan Abramov'
/> */}
                </div> 
                        <div>
                        <p className="username_user">{props.username}</p>
                        </div>
                        <div>
                            <button className={mydata.status == 'pending' ? 'request_sent' : 'add_friend_btn'} onClick={send_request}>{button_placeholder}</button>
                            <button className="add_friend_btn">message</button>
                        </div>
                </div>
                
                               
                </div>
        
    );


    
};
export default ProfileAvatar;