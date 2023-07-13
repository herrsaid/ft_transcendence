import './profile.css'
import {Friends, Groups, ProfileAvatar, ProfileInfo, History, Achievevements} from './index'
import SideNavBar_Res from '../Components/SideNavBar_Res/SideNavBar_Res';


export default function Profile()
{


    return(
        <div className="profile_container">
            
        <SideNavBar_Res/>
        <div className="all_profile">
        <div className="side_two">
                        
                        <div className="side_two_info">

                            <ProfileAvatar/>
                            <ProfileInfo/>

                        </div>
                        <History/>
                    </div>
            <div className="Profile">
                    <div className="side_one">
                        <Friends/>
                        <Groups/>        
                    </div>

                    <div className="side_three">

                        <Achievevements/>
                        
                    </div>
            </div>

        </div>
        </div>
    );
}