"use client"
import './profile.css'
import {Friends, Groups, ProfileAvatar, ProfileInfo, History, Achievevements} from './index'
import SideNavBar_Res from '../Components/SideNavBar_Res/SideNavBar_Res';
import { cookies } from 'next/dist/client/components/headers';




const getData = async () => {
        const cookieStore = document.cookie;
        var arr = cookieStore.split("=");
    
        const res = await fetch("http://localhost:1337/user/me", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${arr[1]}`,
             },
          }).then((response) => response.json())
          console.log(res)
        // const res = await fetch("http://localhost:1337/user/me");
        // const result = await res.json();
        // const result = JSON.stringify(res);
        // console.log(res);
        // return res
}


export default function Profile()
{
    return(
        <div className="profile_container">
            
        <SideNavBar_Res/>
        <div className="all_profile">
            <button onClick={getData}>getData</button>
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