'use client';
import './Header.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';



export default  function Header()
{

    const router = useRouter();

    const logout = async ()  => {
   
        

        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/log-out`, {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
        });

        console.log(res.status)
        if (res.status == 401)
            router.replace("/login")
        else if (res.status == 200)
            router.replace("/login")
             
    if (!res.ok)
        throw new Error("failed to fetch users");
        };




    function toggleDropdown() {
        const dropdownMenu = document.getElementById('dropdownMenu');
        dropdownMenu?.classList.toggle('active');
      }
  
     
      document.addEventListener('click', function(event) {
        const dropdownMenu = document.getElementById('dropdownMenu');
        const profileImg = document.querySelector('.profile-img');
        const isClickInside = profileImg?.contains(event.target);
  
        if (!isClickInside) {
          dropdownMenu?.classList.remove('active');
        }
        
      });
    
    return(

  
  <nav className="navbar fixed w-full p-4 flex justify-between items-center">
    <div className="flex items-center space-x-4">
        <Link href='/'>
        <h1 className="navbar-heading text-white">42 <span className="text-blue-500">PONG</span></h1>
        </Link>
        
    
    </div>
    <div className="relative">
      <img  onClick={toggleDropdown}  src={sessionStorage.getItem('avatar') || "/avatar.png"} alt="avatar" className="w-10 h-10 rounded-full cursor-pointer profile-img"/>
      <div className="dropdown-menu" id="dropdownMenu">
      <Link href='/profile' className="link">Profile</Link>
      <hr className="my-2"/>
      <Link href='/Game/Lobbie' className="link">Play</Link>
      <hr className="my-2"/>
      <Link href='/community' className="link">chat</Link>
        <hr className="my-2"/>
        <button onClick={logout}><h1>Logout</h1></button>
      </div>
    </div>
  </nav>

    )
}