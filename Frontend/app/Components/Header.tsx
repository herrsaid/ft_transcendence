'use client';
import './Header.css'
import { useState, useEffect } from 'react'


export default  function Header()
{
    const [login, setLogin] = useState(<button className='login'>Login</button>);
    return(
        <div className="header">
            <div className='logo-search'>
                <h1>42PONG</h1>
                <input type="text" />
            </div>
            <div className='profile'>
                <div className='profile-img'>
                    {/* <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="test" /> */}
                    {login}
                </div>
            </div>
        </div>
    )
}