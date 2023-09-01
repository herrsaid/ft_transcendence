import { BsFillChatFill } from "react-icons/bs";
import { CgProfile} from "react-icons/cg";
import { GiPingPongBat } from "react-icons/gi";
import { IoHome, IoSettingsSharp } from 'react-icons/io5'
import Link  from "next/link";
import './side.css'

export default function BottomNav()
{

    function toggleSide()
    {
        const sidebar = document.querySelector('.sidebar');
        const navitem = document.querySelector('.navitem');
        sidebar?.classList.toggle('sidebar-open');
        navitem?.classList.toggle('hidden');
        navitem?.classList.toggle('block');
    }
    
    return(
        <>
        {/* //this the old bottomnavbar */}
        <nav id="BottomNav" className="hidden fixed bottom-2 lg:bottom-2 w-full overflow-hidden z-50">
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

<aside  id="LeftNav" className=" text-white  p-2 sidebar">
  <div className=""><button
        id="toggleSidebar"
        className="block w-[30px] h-[30px] text-white rounded-full hover:text-gray-300 buttona bg-gradient-to-br from-purple-600 to-indigo-800"

        onClick={toggleSide}
      >
        ☰
      </button></div>
      
      <nav className="hidden mt-4 navitem">
        <ul>
          

          <Link href='/' className="forhover mt-2 rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800"><IoHome size={30} /></Link>
           <Link href='/profile' className="forhover mt-2 rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800"><CgProfile size={30}/></Link>
            <Link href='/Game/Lobbie' className="forhover mt-2 rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800"><GiPingPongBat size={30}/></Link>
            <Link href='/community' className="forhover mt-2 rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800"> <BsFillChatFill size={30}/> </Link>
            <Link href='/profile/Setting' className="forhover mt-2 rounded-full cursor-pointer w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800"><IoSettingsSharp size={30} /></Link>
        </ul>
        
      </nav>
    </aside>
       
            
        </>
    )
}