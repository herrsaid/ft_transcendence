import Message from "./message";
import Profile from "./profile";
import { VscSend } from 'react-icons/vsc'
import { socket } from "../../socket/socket";
import { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import UserContext from "../../UserContext";
import reciverContext from "../reciverContext";
import { useContext } from "react";


export default function Messages()
{
    const user = useContext(UserContext);
    const reciver = useContext(reciverContext);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const inputRef = useRef(null)
    useEffect(()=> {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/messages?id=${1}`,{
            method: 'GET', headers:{
                
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => response.json()).then(data => setMessages(data))
    }, [])
    useEffect(() => {
        socket.on('message', (data:any) =>{
            setMessages(old => [...old, {src:data.src, dst:data.dst,content:data.content}])
        })
    },[])
    const send = (e)=>{
        e.preventDefault();
        socket.emit('message', {src:user.user.id, dst:reciver.reciver.id, content:value})
        setMessages(old => [...old, {src:user.user.id, dst:reciver.reciver.id, content:value}]);
        setValue('')
    }
    return(
        <div className="flex flex-col justify-center h-[87dvh] border-r border-l border-gray-500">
            <div>
                <Profile/>
            </div>
            <div className="flex flex-col h-[90%] p-3">
                {/* <Message class="self-end rounded-lg bg-sky-900 p-2" content="hellow"></Message> */}
                {
                        messages.map((message,index) => {
                            if(message.src == user.user.id && message.dst == reciver.reciver.id)
                                return( <Message key={index} content={message.content} class="self-end rounded-lg bg-sky-900 p-2 mb-2"/>)
                            else if (message.src == reciver.reciver.id && message.dst == user.user.id)
                                return( <Message key={index} content={message.content} class="self-start rounded-lg bg-sky-900 p-2 mb-2"/>)
                        })
                }
            </div>
            <div className="self-center relative w-[90%]">
                <form onSubmit={send}>
                    <input onChange={event => setValue(event.target.value)} value={value} ref={inputRef} className="focus:outline-none rounded-full bg-sky-900 p-1 pl-2 w-full" type="text" placeholder="Message..." />
                    <button className="absolute top-2 right-2" type="submit"><VscSend /></button>
                </form>
            </div>
        </div>
    )
}