"use client"
import { useState } from "react";
import "../../profile/profile.css"
import Cookies from 'js-cookie';

interface props{
    img:string,
    username:string,
    id:number
}



const ProfileAvatar = (props:props) => {


    const [is_clicked, setclicked] = useState(false)
    const [mydata, setData] = useState([])


    const handel_click = () =>
    {
        setclicked(!is_clicked)
        fetch(`http://localhost:1337/user/friend-request/send/${props.id}`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
        }
            
          }).then((response) => response.json())
          .then(data => setData(data))  
    }

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
                            <button className={!is_clicked ? "add_friend_btn" : "request_sent"} onClick={handel_click}>{!is_clicked ? 'Add Friend' : 'Request Sent' }</button>
                            <button className="add_friend_btn">message</button>
                        </div>
                </div>
                
                               
                </div>
        
    );


    
};
export default ProfileAvatar;