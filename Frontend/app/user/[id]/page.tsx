"use client"
import '../../profile/profile.css'
import {Friends, Groups, ProfileAvatar, ProfileInfo, History, Achievevements} from '../../profile/index'
import SideNavBar_Res from '../../Components/SideNavBar_Res/SideNavBar_Res';



export default  function User()
{
    

    return(
        <div className="profile_container">
            
        <SideNavBar_Res/>
        <div className="all_profile">
            {/*  */}
        <div className="side_two">
                        
                        <div className="side_two_info">

                            {/* <ProfileAvatar  img={mydata.profile_img}   username={mydata.username}/>
                            <ProfileInfo location={mydata.location} totalgame={mydata.totalgame}
                            loss={mydata.loss} wins={mydata.wins} rank={mydata.rank}
                            
                            /> */}

                        </div>
                        <History/>
                    </div>
            {/* <div className="Profile">
                    <div className="side_one">
                        <Friends/>
                        <Groups/>        
                    </div>

                    <div className="side_three">

                        <Achievevements/>
                        
                    </div>
            </div> */}

        </div>
        </div>
    );
}