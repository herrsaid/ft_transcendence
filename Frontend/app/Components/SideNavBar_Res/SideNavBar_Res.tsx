
"use client"
import "./SideNavBar_Res.css"
import { AiOutlineHome } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { GiPingPongBat } from "react-icons/gi";
import { IoHome, IoSettingsSharp } from 'react-icons/io5'
import Link  from "next/link";

export default function SideNavBar_Res()
{
    return(
        <>
            {/* <div className="Mobile">

            </div> */}
            <div className="NavBar">
                <div className="Setting">
                        
                </div>
                <div className="Content">
                    {/* <button className="profile-btn"><CgProfile size={40}/></button> */}
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