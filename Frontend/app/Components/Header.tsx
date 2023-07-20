'use client';
import './Header.css'
import { useState, useEffect } from 'react'

function Login()
{
    const [open, setOpen] = useState(false);
    return(
        <div>
            <img onClick={()=>{setOpen(!open)}} src="https://randomuser.me/api/portraits/women/3.jpg" alt="test" />
            {open && <div className='modal'>
                <ul>
                    <li>
                        <h1>Profile</h1>
                    </li>
                    <li>
                        <h1>Setting</h1>
                    </li>
                    <li>
                        <h1>Logout</h1>
                    </li>
                </ul>
            </div>}
        </div>
    )
}

export default  function Header()
{
    const [login, setLogin] = useState(<button className='login'>Login</button>);
    useEffect(()=>{setLogin(<Login></Login>)},[])
    return(
        <div className="header">
            <div className='logo-search'>
                <h1>42PONG</h1>
                <input type="text" />
            </div>
            <div className='profile'>
                <div className='profile-img'>
                    {login}
                </div>
            </div>
        </div>
    )
}