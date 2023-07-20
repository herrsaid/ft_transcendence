"use client"
import '../profile/profile.css'
import {ProfileAvatar, ProfileInfo} from './index'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';


export default  function User()
{
    
    const searchParams = useSearchParams()
    const username = searchParams.get('username')

    const [mydata, setData] = useState([])
    
    useEffect(()=>{
    
        fetch(`http://localhost:1337/user/${username}`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
        }
            
          }).then((response) => response.json())
          .then(data => setData(data))  
    },[]);

    console.log(mydata)


    return(
        <div className="profile_container">
            
        <div className="all_profile">
        <div className="side_two">
                        
                        <div className="side_two_info">


                            
                            <ProfileAvatar  img={mydata.profile_img}   username={mydata.username}/>
                            <ProfileInfo location={mydata.location} totalgame={mydata.totalgame}
                            loss={mydata.loss} wins={mydata.wins} rank={mydata.rank}
                            
                            />

                        </div>
                        

        </div>
        </div>
        </div>
    );
}