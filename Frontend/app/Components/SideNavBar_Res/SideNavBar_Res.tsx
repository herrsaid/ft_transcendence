
"use client"
import "./SideNavBar_Res.css"
import { AiOutlineHome } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { GiPingPongBat } from "react-icons/gi";

export default function SideNavBar_Res()
{
    return(
        <div className="NavBar">
            <div className="Home">
                    <AiOutlineHome size={40} />
            </div>
            <div className="Content">
                <button><CgProfile size={40}/></button>
                <button><GiPingPongBat size={40}/></button>
                <button> <BsFillChatFill size={40}/> </button>
            </div>
            <div className='Logout'>
                <button><CgLogOut size={40}/></button>
            </div>
        </div>
    )
}