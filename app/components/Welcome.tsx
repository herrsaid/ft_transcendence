import Link from 'next/link'
import './Welcome.css'
import NavBar from './NavBar/NavBar';

export default function Welcome()
{
    return(
        <>
        <NavBar idd="0"/>
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