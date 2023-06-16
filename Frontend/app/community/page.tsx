"use client";
import './community.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FaBeer } from "react-icons/fa";
import SideNavBar from '../Components/SideNavBar/SideNavBar';
import { io } from 'socket.io-client';
import { useState, useEffect, useRef, use } from 'react'

function Message()
{
    return(
        <div className='msg'>
            message
        </div>
    )
}

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
    const inputRef = useRef(null);
    const [message, Setmessage] = useState("none");
    const [val, setValue] = useState('');
    const messagat = [<Message/>];
    let socket = io('http://10.12.2.9:3030', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
    // socket.emit('message', "hello form react");
    // useEffect(() => {
    //     socket.emit('message', "hello form effect");
    // }, []);
    const send = (e: any) => {
        e.preventDefault();
        console.log(val);
        socket.emit('message', val);
        messagat.push(<Message />)
        console.log(messagat);
        setValue('');
    };
    useEffect (() =>{}, [messagat]);
    socket.on("message", (data) => {
        console.log(data);
        Setmessage(data);
    })
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
                <div className='messagat'>
                    {messagat}
                </div>
            </div>
            <div className='chat-send-message'>
                <div>
                <form onSubmit={send}>
                    <input onChange={event => setValue(event.target.value)} value={val} type="text" ref={inputRef} placeholder='Message....'/>
                    <button type='submit'><FaBeer /></button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default function Community()
{
    const Porfiles = [
        <Profile_box/>,
        <Profile_box/>,
    ];
    return (
        <>
        <SideNavBar/>
         <div className="all">
             <div className='groups'>
                <div className='chat-header'>
                    <h1>
                        Chats
                    </h1>
                </div>
                <div className='chats'>
                 <Profile_box/>
                 {Porfiles}
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
         </>
    )
}