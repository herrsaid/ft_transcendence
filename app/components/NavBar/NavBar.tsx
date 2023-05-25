import Link from 'next/link'
import './NavBar.css'

export default function NavBar()
{
    return(
        <div className="navbar">
            <Link href="/home">
                <h1 className="logo_welcome">LOGO</h1>
            </Link>
                
            <Link href="/profile">
                <h1 className="profile_link">Profile</h1>
            </Link>
                    
   </div>
    );
}