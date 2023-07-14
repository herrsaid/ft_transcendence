import ProfileInfoNav from "./ProfileInfoNav";
import "../profile.css"

import {FaPen} from 'react-icons/fa'

const ProfileAvatar = (props) => {
    return (
        <div>

            <div className="profile_avatar">
                <div className="avatar_edit_real">
                    <img src={props.img} ></img>
                    <label>
                    <FaPen/>
                    <input type="file" name="myfile" ></input>
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