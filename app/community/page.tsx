"use client";
import './community.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FaBeer } from "react-icons/fa";

function Profile_box()
{
    return(
        <div className='profile_box'>
            <div className='chat-img'>
                <img src="https://cdn.intra.42.fr/users/acc4ad161c4fb89eafe791f7012e8ddb/zasabri.JPG" alt="chatimg" />
            </div>
            <div className='profile-name'>
                <h1>zakaria sabri</h1>
                <h4>Wach a said</h4>
            </div>
        </div>
    )
}


function Chat()
{
    return(
        <div className='chat-box'>
            <div className='chat-info'>
                <div className='profile-img'>
                    <img src="https://randomuser.me/api/portraits/women/43.jpg" alt="avatar" />
                </div>
                <div className='profile-info'>
                    <h1>mariem mimoun</h1>
                    <h4>Online</h4>
                </div>
            </div>
            <div className='chat-messages'>
                messages
            </div>
            <div className='chat-send-message'>
                <div>
                <form action="">
                    <input type="text" placeholder='Message....'/>
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
                <div className='chat-header'>
                    <h1>
                        Chats
                    </h1>
                </div>
                <div className='chats'>
                 <Profile_box/>
                 <Profile_box/>
                </div>
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