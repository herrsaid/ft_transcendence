"use client";
import './community.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AiOutlineSend } from "react-icons/ai";
import SideNavBar from '../Components/SideNavBar/SideNavBar';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import { useState, useEffect, useRef, use } from 'react'
import { Input } from '@chakra-ui/react'

function Message(props: any)
{
    return(
        <div className={props.class}>
            Lorem Ipsum is simply dummy text of the 
            printing and typesetting industry.
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
    const [message, Setmessage] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [val, setValue] = useState('');
    const messagat = [<Message/>, <Message/>];
    const comps  = [<Message/>, <Message/>];
    let msgat
    let array = [{key:'01', class:'me'}, {key:'02', class:'you'}];
    const socket = io('http://10.12.2.9:3030', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
    const send = (e: any) => {
        e.preventDefault();
        console.log(val);
        socket.emit('message', val);
        const abc=[...message,[]];
        Setmessage(abc);
        console.log(message);
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
                    {message.map((data) => {return(<Message class="me"/>)})}
                </div>
            {/* <div className='chat-send-message'> */}
                <div>
                <form onSubmit={send}>
                    {/* <input onChange={event => setValue(event.target.value)} value={val} type="text" ref={inputRef} placeholder='Message....'/> */}
                    <Input placeholder='Basic usage' size='lg'/>
                    <button type='submit'><AiOutlineSend /></button>
                </form>
                </div>
            {/* </div> */}
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
             <div className='friends'>
                 Friends
             </div>
         </div>
         </>
    )
}