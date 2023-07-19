"use client"
import "./SideNavBar.css"

import {FaAlignJustify, FaHome, FaGamepad,  FaUserCircle, FaUsers, FaCogs} from 'react-icons/fa'

export default function SideNavBar()
{

    const handleClick = () => {
        document.querySelector("body")?.classList.toggle("active");
      };

    return(
        <>
            <div className="wrapper">
        
        <div className="sidebar">
        
            <ul>
                <li>
                    <a href="/" className="active">
                        <span className="icon"><i className="fas fa-home"></i></span>
                        <span className="item"><FaHome/></span>
                    </a>
                </li>
                <li>
                    <a href="/Game/Lobbie">
                        <span className="icon"><i className="fas fa-desktop"></i></span>
                        <span className="item"><FaGamepad/></span>
                    </a>
                </li>
                <li>
                    <a href="/profile">
                        <span className="icon"><i className="fas fa-user-friends"></i></span>
                        <span className="item"><FaUserCircle/></span>
                    </a>
                </li>
                <li>
                    <a href="/community">
                        <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
                        <span className="item"><FaUsers/></span>
                    </a>
                </li>
                
                
                <li>
                    <a href="/profile/Setting">
                        <span className="icon"><i className="fas fa-cog"></i></span>
                        <span className="item"><FaCogs/></span>
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