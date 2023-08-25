import { BsFillChatFill } from "react-icons/bs";
import { CgProfile} from "react-icons/cg";
import { GiPingPongBat } from "react-icons/gi";
import { IoHome, IoSettingsSharp } from 'react-icons/io5'
import Link  from "next/link";

export default function BottomNav()
{
    return(
        <>
        <nav className="hidden fixed bottom-2 lg:bottom-2 w-full overflow-hidden z-50">
            <div className="container mx-auto">
                <div className="w-full h-[60px] bg-black/20 backdrop-blur rounded-full max-w-[460px] mx-auto 
                px-5 flex justify-between text-2xl text-white/50 items-center
                ">
                    <Link href='/' className="rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"><IoHome size={30} /></Link>
                    <Link href='/profile' className="rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"><CgProfile size={30}/></Link>
                    <Link href='/Game/Lobbie' className="rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"><GiPingPongBat size={30}/></Link>
                    <Link href='/community' className="rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"> <BsFillChatFill size={30}/> </Link>
                    <Link href='/profile/Setting' className="rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center hover:bg-gradient-to-br from-purple-600 to-indigo-800"><IoSettingsSharp size={30} /></Link>
                </div>
                    
            </div>
        </nav>
       
            
                    
                
        </>
    )
}