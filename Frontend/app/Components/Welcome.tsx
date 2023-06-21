import Link from 'next/link'
import './Welcome.css'

export default function Welcome()
{
    return(
        <>
        <div className="w">
                <div className="container">
                <div className="main_home">
                    <h2>Welcome to legends</h2>
                    <p>Play PingPong with your friends online</p>
                    <Link href="http://localhost:1337/auth/42">
                        <button>Sign in with 42</button>
                    </Link>

                    <Link href="http://localhost:1337">
                        <button>Sign in with Google</button>
                    </Link>
                    
                </div>

                </div>
        </div>
        </>
    );
}