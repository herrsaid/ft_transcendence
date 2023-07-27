"use client"
import './community.css'
import React from 'react';
import { AiOutlineSend } from "react-icons/ai";
import SideNavBar from '../Components/SideNavBar/SideNavBar';
import { io } from 'socket.io-client';
import { useState, useEffect, useRef, useContext, createContext } from 'react'
import SideNavBar_Res from '../Components/SideNavBar_Res/SideNavBar_Res';
import Cookies from 'js-cookie';
import {socket} from '../socket/socket'

const Reciver = createContext(0);

function Message(props: any)
{
    return(
        <div className={props.class}>
            {props.content}
        </div>
    )
}

function Profile_box(props:any)
{
    const reciver_id = useContext(Reciver);
    const clicked = () =>{
        reciver_id.setId(props.id);
        console.log('id', reciver_id.id)
    }
    return(
        <div onClick={clicked} className='profile_box'>
            <div className='chat-img'>
                <img src={props.avatar} alt="chatimg" />
            </div>
            <div className='profile-name'>
                <h1>{props.username}</h1>
                <h4>Wach a said</h4>
            </div>
        </div>
    )
}


export default function Community()
{
    const [friends, setFriends] = useState([])
    const [id, setId] = useState<any>(5)
    const v = {id , setId}
    useEffect(()=>{
        
        fetch("http://localhost:1337/user/friends", {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
            
        }).then((response) => response.json())
        .then(data => setFriends(data))  
    },[]);
    return (
        <Reciver.Provider value={v}>
         <div className="all">
             <div className='groups'>
                <div className='chat-header'>
                    <h1>
                        Chats
                    </h1>
                </div>
                <div className='chats'>
                 {friends.map((frnd)=>{return (<Profile_box id={frnd.id} avatar={frnd.profile_img} username={frnd.username} />)})}
                </div>
             </div>
                <Chat />
             <div className='friends'>
                 Friends
             </div>
         </div>
        </Reciver.Provider>
    )
}

function Chat()
{
    const con = useContext(Reciver);
    const inputRef = useRef(null);
    const [val, setValue] = useState('')
    const [messages, setMssages] = useState([]);
    let msg = messages
    const send = (e: any) => {
        e.preventDefault();
        const env = process.env.NEXT_PUBLIC_SOCKET;
        console.log(env);
        if (val != '')
        {
            socket.emit('message', {src:sessionStorage.getItem('userId'),dst:con.id, content:val});
            msg.push({key:(Date.now() + Math.random()) , reciver:con.id, content:val, class:'me'})
            setMssages(msg);
            console.log(con.id);
            setValue('');
        }
    };
    const [rerender, setRerender] = useState(0);
    useEffect (() =>{
        socket.on('message', (data:any) => {
            if (data != '')
            {
                setRerender(0)
                msg.push({sender: data.src, key:(Date.now() + Math.random()),content:data.content, class:'you'})
                console.log(rerender)
                setMssages(msg)
            }
        })
    }, [rerender]);
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
                    {messages.map((data) => {
                        if (data.sender == con.id || data.reciver == con.id){
                            return (<Message key={data.key} class={data.class} content={data.content} />)}
                    })}
                </div>
            <div className='chat-send-message'>
                <form onSubmit={send}>
                    <input onChange={event => setValue(event.target.value)} value={val} type="text" ref={inputRef} placeholder='Message....'/>
                    <button className='send-btn' type='submit'><AiOutlineSend size={20}/></button>
                </form>
            </div>
            </div>
        </div>
    );
}