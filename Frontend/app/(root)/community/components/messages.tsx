import Message from "./message";
import Profile from "./profile";
import { VscSend } from 'react-icons/vsc'
import { socket } from "../../socket/socket";
import {useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import UserContext from "../../UserContext";
import reciverContext from "../reciverContext";
import { useContext } from "react";
import activeContext from "../activeContext";
import Chats from "./chats";
import GroupMsg from "./groupmsg";
import useSWR from "swr";

export default function Messages()
{
    const audio = new Audio('https://cdn.jsdelivr.net/npm/whatsapp-notification-sound@1.0.0/notification.mp3')
    const active = useContext(activeContext);
    const user = useContext(UserContext);
    const reciver = useContext(reciverContext);
    const [messages, setMessages] = useState<any>([]);
    const [groupMessage, setGroupMessage] = useState<any>([])
    const [value, setValue] = useState('');
    const inputRef = useRef(null)
    const [muted, setMuted] = useState<any>([])
    const [status, setStatus] = useState('')
    const scrollToBottom = (id:string) => {
        if(document)
            var element:any = document.getElementById(id);
        if(element)
            element.scrollTop = element.scrollHeight;
   }
   const fetchData = async (url:string) => {
    try{
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    twofactortoken: Cookies.get('twofactortoken')!,
                }});
            return res.json();
    }
    catch{
         console.log("error");
    }
    }
    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/status/${reciver.reciver.id}`, fetchData)
    useEffect(()=>{
        if(data)
            setStatus(data.status)
    }, [data])
    useEffect(()=>{
       socket.on('status', (data) =>{
        if(data.action == "mute" && data.user == user.user.id)
        {
            setMuted((old:any) => [...old, data.id])
        }
        if(data.action == "unmute" && data.user == user.user.id)
        {
            setMuted(muted.slice(1, muted.findIndex((ev:any) => (ev.id == data.id))))
        }
        if(data.action == "out" && data.user == user.user.id)
            reciver.setReciver({});
       }) 
    },[])
    useEffect(()=> {
        
        scrollToBottom('scrollable');

    },[messages])
    useEffect(()=>{
            const msginput:any = document.getElementById('message');
            if (reciver.reciver.id)
            {
                if (muted.find((data:any)=> (reciver.reciver.id == data)) && reciver.reciver.isgroup)
                    msginput.disabled = true;
                else
                    msginput.disabled = false;
            }

    },[reciver.reciver.id,muted])
    //fetch group messages
    useEffect(()=>{
        if(reciver.reciver.isgroup)
        {
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/members?id=${reciver.reciver.id}`,
            {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            }).then((response) => response.json()).then(data => reciver.setReciver({...reciver.reciver,members:data}));
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/messages?id=${reciver.reciver.id}`,{
                method: 'GET', headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            }).then((response) => response.json()).then(data => {setGroupMessage(data)})
        }
    },[reciver.reciver.isgroup, reciver.reciver.id])
    //fetch private messages
    useEffect(()=> {
        console.log('user = ', user.user.id);
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/messages?id=${user.user.id}`,{
            method: 'GET', headers:{
                
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => response.json()).then(data => setMessages(data))
    }, [])
    //listening to message event on the socket
    useEffect(() => {
        socket.on('message', (data:any) =>{
            audio.play();
            console.log(data)
            if(!data.toGroup)
            {
                setMessages((old:any) => [...old, {src:data.src, dst:data.dst,content:data.content}])
            }
            else
            {
                setGroupMessage((old:any) => [...old, {src:data.src, dst:data.dst,content:data.content}])
            }
        })
    },[])
    const send = (e:any)=>{
        e.preventDefault();
        if (value != '')
        {
            if(!reciver.reciver.isgroup)
            {
                if (data)
                {
                    console.log('status', status)
                    if((status != "blocked") && (status != "waiting-for-unblock"))
                    {
                        socket.emit('message', {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:false})
                        setMessages((old:any) => [...old, {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:false}]);
                    }
                }
            }
            else
            {
                        socket.emit('message', {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:true})
                        setGroupMessage((old:any) => [...old, {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:true}]);
            }
            setValue('')
        }
    }  
    if (reciver.reciver.id == undefined)
        return(<div className="sm:hidden"><Chats/></div>)
    return(
        <div className="flex flex-col relative  h-full">
            <div className="rounded-lg bg-[#363672] drop-shadow-md">
                <Profile/>
            </div>
            <div id='scrollable' className="flex flex-col h-[80%] p-3 overflow-auto">
                {
                    (!reciver.reciver.isgroup && messages)?
                    (
                        messages.map((message:any,index:number) => {
                            if(message.src == user.user.id && message.dst == reciver.reciver.id)
                                return( <Message key={index} content={message.content} class="self-end max-w-[300px] rounded-lg  bg-[#34346e] drop-shadow-md p-2 mb-2"/>)
                            else if (message.src == reciver.reciver.id && message.dst == user.user.id)
                                return( <Message key={index} content={message.content} class="self-start max-w-[300px] rounded-lg bg-[#7d32d9] drop-shadow-md p-2 mb-2"/>)
                        })
                    ):(
                        groupMessage.map((message:any, index:number) => {
                            if (message.src == user.user.id && message.dst == reciver.reciver.id)
                            return (<GroupMsg key={index} content={{class:"me", content:message.content, member:message.src}} />)
                            else if (message.dst == reciver.reciver.id)
                            return(<GroupMsg key={index} content={{class:"you", content:message.content, member:message.src}} />)
                        })
                    )
                }
            </div>
            <div className="self-center w-[90%] absolute bottom-2">
                <form onSubmit={send}>
                    <input id="message" onChange={event => setValue(event.target.value)} value={value} ref={inputRef} className="focus:outline-none rounded-full bg-[#34346e] drop-shadow-md p-1 pl-2 w-full" type="text" placeholder="Message..." />
                    <button className="absolute top-2 right-2" type="submit"><VscSend /></button>
                </form>
            </div>
        </div>
    )
}