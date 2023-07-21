"use client"
import { useEffect, useState } from "react";
import "../../profile/profile.css"
import Cookies from 'js-cookie';

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
            fetch(`http://localhost:1337/user/friend-request/status/${props.id}`, {
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
        fetch(`http://localhost:1337/user/friend-request/send/${props.id}`, {
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
                    <img src={props.img} ></img>
                    
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