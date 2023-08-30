'use client';
import './Header.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import UserContext from '../../UserContext';
import { Avatar } from '@chakra-ui/react';





export default  function Header()
{

    const router = useRouter();
    const contexUser = useContext(UserContext);
    let new_src_img;

    const logout = async ()  => {
      
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'twofactortoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      router.replace("/login");
    
        };




    function toggleDropdown() {
        const dropdownMenu = document.getElementById('dropdownMenu');
        dropdownMenu?.classList.toggle('active');
      }
  
     

      function openMenu(event:any){
        const dropdownMenu = document.getElementById('dropdownMenu');
        const profileImg = document.querySelector('.profile-img');
        const isClickInside = profileImg?.contains(event.target);
        if (!isClickInside) {
          dropdownMenu?.classList.remove('active');
        }
      }
      



    
    
    if (contexUser.user.is_profile_img_updated)
        new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + contexUser.user.profile_img;
    
    return(

  
  <nav className="navbar w-full p-4 flex justify-between items-center">
    <div className="flex items-center space-x-4">
        <Link href='/'>
        <h1 className="navbar-heading text-white">42 <span className="text-purple-500">PONG</span></h1>
        </Link>
        
    
    </div>
    <div className="relative">
    <Avatar size='sm' name={contexUser.user.username} src={contexUser.user.is_profile_img_updated ? new_src_img : contexUser.user.profile_img} className="w-10 h-10 rounded-full cursor-pointer profile-img" onClick={toggleDropdown}>
                        </Avatar>
      <div className="dropdown-menu" id="dropdownMenu" onClick={openMenu}>
      
      <Link href='/' ><p className="link_drop">Home</p></Link>
      <Link href='/profile' ><p className="link_drop">Profile</p></Link>
      <Link href='/Game/Lobbie'><p className="link_drop">Play</p></Link>
      <Link href='/community' ><p className="link_drop">Chat</p></Link>
        <button onClick={logout}><h1 className="link_drop h1_link">Logout</h1></button>
      </div>
    </div>
  </nav>

    )
}