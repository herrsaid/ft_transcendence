import './profile.css'

import {Friends, Groups, ProfileAvatar, ProfileInfo, ProfileInfoNav, History, Achievevements, Store} from './index'
import NavBar from '../Components/NavBar/NavBar';


export default function Profile()
{
    return(
        <>
        <NavBar idd="5"/>
            <div className="Profile">
                    <div className="side_one">
                        <Friends/>
                        <Groups/>        
                    </div>

                    <div className="side_two">
                        <ProfileInfoNav/>
                        <div className="side_two_info">

                            
                            <ProfileAvatar/>
                            <ProfileInfo/>

                        </div>
                        <History/>
                    </div>

                    <div className="side_three">

                        <Achievevements/>
                        <Store/>
                        
                    </div>
            </div>
        </>
    );
}