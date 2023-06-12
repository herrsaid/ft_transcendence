import ProfileInfoNav from "./ProfileInfoNav";
import "../profile.css"
        
const ProfileAvatar = () => {
    return (
        <div>

            <div className="profile_avatar">
                <div>
                    <img src="/avatar.png" ></img>
                    
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