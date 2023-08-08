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
import Messages from '../messages/messages';
import  useSWR  from 'swr';
import { useRouter } from 'next/navigation';


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
    let new_src_img:string;
    const [friends, setFriends] = useState([])
    const [id, setId] = useState<any>(5)
    const v = {id , setId}
    useEffect(()=>{
        
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
            
        }).then((response) => response.json())
        .then(data => setFriends(data))  
    },[]);

   

    const newArray = friends.map((frnd:any)=>
    {
        if (frnd.is_profile_img_updated)
        {
            new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + frnd.profile_img;
        }
        return (<Profile_box id={frnd.id} avatar={frnd.is_profile_img_updated ? new_src_img : frnd.profile_img} username={frnd.username} />)
    })


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
                 {newArray}
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
    // const router = useRouter();
    const con = useContext(Reciver);
    const inputRef = useRef(null);
    const [val, setValue] = useState('')
    const [messages, setMessages] = useState([]);
    const myId = sessionStorage.getItem('userId')
    console.log('id', myId)
    // const fetcher = async (url:string) => {
        //     const res = await fetch(url,
        //     {
            //         method: 'GET', headers:{
                
                //         Authorization: `Bearer ${Cookies.get('access_token')}`
                //     }});
                //     // if (res.status == 401)
                //     //     router.replace("/login");
                
                //     if (!res.ok)
                //         throw new Error("fetch error");
                //     return res.json();
                // }
                
                // const {data, error, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/messages?id=${myId}`, fetcher)
                const [data, setData] = useState([]);
    useEffect(()=> {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/messages?id=${myId}`,{
            method: 'GET', headers:{
                
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => response.json()).then(data => setData(data))
    }, [])
    console.log(data);
    const [rerender, setRerender] = useState(1);
    let msg: any[] = data
    useEffect (() =>{
        socket.on('message', (message:any) => {
            if (message != '' && msg)
            {
                // msg.push({src:message.src, content:message.content, dst:message.dst})
                setData(old => [...old, {src:message.src, content:message.content, dst:message.dst}]);
                setRerender(Math.random());
                console.log(data)
                console.count('useEffecte')
            }
        })
        return () => {
            socket.disconnect();}
    }, []);
    const send = (e: any) => {
        e.preventDefault();
        if (val != '')
        {
            socket.emit('message', {src:sessionStorage.getItem('userId'),dst:con.id, content:val});
            data.push({src:myId, dst:con.id, content:val});
            console.log(con.id);
            setValue('');
        }
    };
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
                    {/* {msg.map((data) => {
                        if (data.sender == con.id || data.reciver == con.id){
                            return (<Message key={data.key} class={data.class} content={data.content} />)}
                    })} */}
                    {
                        data.map((data, index) => {
                            if (data.src == myId && data.dst == con.id)
                                return (<Message key={index} class="me" content={data.content}/>)
                            else if (data.dst == myId && data.src == con.id)
                            {
                                return (<Message key={index} class="you" content={data.content}/>)
                            }
                        })
                    }
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