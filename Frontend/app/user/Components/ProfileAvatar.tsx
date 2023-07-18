"use client"
import "../../profile/profile.css"


interface props{
    img:string,
    username:string
}



const ProfileAvatar = (props:props) => {


    return (
        <div>

            <div className="profile_avatar">
                <div className="avatar_edit_real">
                    <img src={props.img} ></img>
                    
                </div>
                        <div>
                        <p className="username">{props.username}</p>
                        </div>
                        <div>
                            <button className="add_friend_btn">Add Friend</button>
                        </div>
                               
                </div>
        </div>
    );


    
};
export default ProfileAvatar;