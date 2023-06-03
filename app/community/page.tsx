"use client";
import './community.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FaBeer } from "react-icons/fa";

function Chat()
{
    return(
        <div className='chat-box'>
            <div className='chat-info'>
                <div className='profile-img'>
                    <img src="https://randomuser.me/api/portraits/women/43.jpg" alt="avatar" />
                </div>
                <div className='profile-info'>
                    <h1>salma laajour</h1>
                    <h4>Online</h4>
                </div>
            </div>
            <div className='chat-messages'>
                messages
            </div>
            <div className='chat-send-message'>
                <div>
                <form action="">
                    <input type="text" />
                    <button type='submit'><FaBeer /></button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default function Community()
{
    return (
         <div className="all">
             <div className='groups'>
                 groups
             </div>
             <Chat />
             {/* <div className='chat'>
                 chat
             </div> */}
             <div className='friends'>
                 Friends
             </div>
         </div>
    )
}