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


    const [is_clicked, setclicked] = useState(false)
    const [mydata, setData] = useState([])
    const [button_str, setButtonstr] = useState(null)
    
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


    useEffect(()=>{
        // console.log(props.id)
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

    // console.log(button_str)
    console.log(mydata.status)
    
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
                            <button className={mydata.status == 'pending' ? 'request_sent' : 'add_friend_btn'} onClick={handel_click}>{mydata.status == 'pending' ? 'cancel' : 'send request'}</button>
                            <button className="add_friend_btn">message</button>
                        </div>
                </div>
                
                               
                </div>
        
    );


    
};
export default ProfileAvatar;