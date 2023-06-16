import './profile.css'

import {Friends, Groups, ProfileAvatar, ProfileInfo, History, Achievevements} from './index'
import SideNavBar from '../Components/SideNavBar/SideNavBar';


export default function Profile()
{


    return(
        <div>
            
        <SideNavBar/>
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
    );
}