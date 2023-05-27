"use client";
import './community.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Chat()
{
    return(
        <div className='chat-box'>
            <div className='chat-info'>
                online
                <>dlkfjlkd</>
                
            </div>
            <div className='chat-messages'>
                messages
            </div>
            <div className='chat-send-message'>
            <TextField sx={{ width: 3/4 }} id="filled-basic" label="write your message here" variant="filled" />
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
            <div className='chat'>
                <Chat />
            </div>
            <div className='friends'>
                Friends
            </div>
        </div>
    )
}