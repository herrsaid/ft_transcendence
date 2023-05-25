import Link from 'next/link'
import './Welcome.css'

export default function Welcome()
{
    return(
        <div className="w">
                
                <div className="container">
                <div className="main_home">
                    <h2>Play PingPong With Your Friend</h2>
                    <Link href="/home">
                        <button>Play Now</button>
                    </Link>
                    
                </div>

                </div>
        </div>
    );
}