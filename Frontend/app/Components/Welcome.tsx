import Link from 'next/link'
import './Welcome.css'
import SideNavBar from './SideNavBar/SideNavBar';


export default function Welcome()
{
    return(
        <>
        <SideNavBar/>
        <div className="w">
                <div className="container">
                <div className="main_home">
                    <h2>Play PingPong With Your Friend</h2>
                    <Link href="/Games">
                        <button>Play Now</button>
                    </Link>
                    
                </div>

                </div>
        </div>
        </>
    );
}