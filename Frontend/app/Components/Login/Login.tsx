import Link from 'next/link'
import './Login.css'

export default function Welcome()
{
    return(
        <>
        <div className="w">


        
                <div className="container_login">
           
                


              <div className='bg_gif_login'>

              </div>

              <div className="main_home">
                    <h2>Welcome to legends</h2>
                    <p>Play PingPong with your friends online</p>
                    
                    <Link href={`${process.env.NEXT_PUBLIC_BACK_IP}/auth/42`}>
                        <button className="intra_button">Sign in with 42</button>
                    </Link>

                    <Link href={`${process.env.NEXT_PUBLIC_BACK_IP_G}/auth/google`}>
                        <button>Sign in with Google</button>
                    </Link>
                    
                </div>

                </div>



        </div>
        </>
    );
}