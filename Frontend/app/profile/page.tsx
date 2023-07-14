"use client"
import './profile.css'
import {Friends, Groups, ProfileAvatar, ProfileInfo, History, Achievevements} from './index'

import { useState, useEffect } from 'react'

export default  function Profile()
{
    const [mydata, setData] = useState([])
    const cookieStore = document.cookie;
    useEffect(()=>{
        var arr = cookieStore.split("=");
    
        fetch("http://localhost:1337/user/me", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${arr[1]}`,
             },
          }).then((response) => response.json())
          .then(data => setData(data))  
    },[]);

    console.log(mydata)
    return(
        <div className="profile_container">
            
        <div className="all_profile">
            {/*  */}
        <div className="side_two">
                        
                        <div className="side_two_info">

                            <ProfileAvatar  img={mydata.profile_img}   username={mydata.username}/>
                            <ProfileInfo location={mydata.location} totalgame={mydata.totalgame}
                            loss={mydata.loss} wins={mydata.wins} rank={mydata.rank}
                            
                            />

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