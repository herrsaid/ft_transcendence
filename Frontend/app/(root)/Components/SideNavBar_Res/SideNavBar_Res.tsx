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
        <nav className="fixed top-0 lg:bottom-8 w-full overflow-hidden z-50">
            <div className="container mx-auto">
                <div className="w-full h-[96px] backdrop-blur-2xl rounded-full max-w-[460px] mx-auto 
                px-5 flex justify-between text-2xl text-white/50 items-center
                ">
                    <Link href='/' className="rounded-full cursor-pointer w-[60px] h-[60px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"><IoHome size={30} /></Link>
                    <Link href='/profile' className="rounded-full cursor-pointer w-[60px] h-[60px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"><CgProfile size={30}/></Link>
                    <Link href='/Game/Lobbie' className="rounded-full cursor-pointer w-[60px] h-[60px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"><GiPingPongBat size={30}/></Link>
                    <Link href='/community' className="rounded-full cursor-pointer w-[60px] h-[60px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"> <BsFillChatFill size={30}/> </Link>
                    <Link href='/profile/Setting' className="rounded-full cursor-pointer w-[60px] h-[60px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"><IoSettingsSharp size={30} /></Link>
                </div>
                    
            </div>
        </nav>
       
            
                    
                
        </>
    )
}