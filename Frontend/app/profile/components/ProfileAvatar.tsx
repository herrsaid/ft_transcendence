import ProfileInfoNav from "./ProfileInfoNav";
import "../profile.css"

import {FaPen} from 'react-icons/fa'

const ProfileAvatar = () => {
    return (
        <div>

            <div className="profile_avatar">
                <div className="avatar_edit_real">
                    <img src="/avatar.png" ></img>
                    <label>
                    <FaPen/>
                    <input type="file" name="myfile" ></input>
                    </label>
                    
                </div>


                        <div>
                        <p className="username">mabdelou</p>
                        </div>
                        <div>
                        <ProfileInfoNav/> 
                        </div>
                               
                </div>
        </div>
    );
};
export default ProfileAvatar;