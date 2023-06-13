"use client"
import "./SideNavBar.css"

import {FaAlignJustify} from 'react-icons/fa'

export default function SideNavBar()
{

    const handleClick = () => {
        document.querySelector("body")?.classList.toggle("active");
      };

    return(
        <>
            <div className="wrapper">
        
        <div className="sidebar">
        <div className="profile">
                <img src="/avatar.png" alt="profile_picture"/>
                <h3>selhanda</h3>
                <p>Player</p>
            </div>






            <ul>
                <li>
                    <a href="/" className="active">
                        <span className="icon"><i className="fas fa-home"></i></span>
                        <span className="item">Home</span>
                    </a>
                </li>
                <li>
                    <a href="/Games">
                        <span className="icon"><i className="fas fa-desktop"></i></span>
                        <span className="item">Games</span>
                    </a>
                </li>
                <li>
                    <a href="/profile">
                        <span className="icon"><i className="fas fa-user-friends"></i></span>
                        <span className="item">Profile</span>
                    </a>
                </li>
                <li>
                    <a href="/community">
                        <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
                        <span className="item">Community</span>
                    </a>
                </li>
                
                
                <li>
                    <a href="/profile/Setting">
                        <span className="icon"><i className="fas fa-cog"></i></span>
                        <span className="item">Settings</span>
                    </a>
                </li>
            </ul>
        </div>



        <div className="section">
            <div className="top_navbar">
            
                <button className="hamburger" onClick={handleClick}>
      <FaAlignJustify/>
    </button>
            </div>

        </div>


        </div>

  
        </>
    );

}