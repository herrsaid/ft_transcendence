"use client"
import "./SideNavBar_Res.css"
import { BsFillChatFill } from "react-icons/bs";
import { CgProfile} from "react-icons/cg";
import { GiPingPongBat } from "react-icons/gi";
import { IoHome, IoSettingsSharp } from 'react-icons/io5'
import Link  from "next/link";

export default function SideNavBar_Res()
{
    return(
        <>
            {/* <div className="Mobile">

            </div> */}
            <div className="NavBar hidden sm:hidden md:flex lg:flex">
                
                <div className="Content">
                    <Link href='/'><button className="profile-btn"><IoHome size={30} /></button></Link>
                    <Link href='/profile'><button className="profile-btn"><CgProfile size={30}/></button></Link>
                    <Link href='/Game/Lobbie'><button className="profile-btn"><GiPingPongBat size={30}/></button></Link>
                    <Link href='/community'><button className="profile-btn"> <BsFillChatFill size={30}/> </button></Link>
                    <Link href='/profile'><button className="profile-btn"><IoSettingsSharp size={30} /></button></Link>
                </div>
                
            </div>
        </>
    )
}