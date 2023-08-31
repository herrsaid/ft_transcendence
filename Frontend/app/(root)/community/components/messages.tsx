import Message from "./message";
import Profile from "./profile";
import { VscSend } from 'react-icons/vsc'
import { socket } from "../../socket/socket";
import { use, useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import UserContext from "../../UserContext";
import reciverContext from "../reciverContext";
import { useContext } from "react";
import activeContext from "../activeContext";
import Chats from "./chats";


export default function Messages()
{
    const active = useContext(activeContext);
    const user = useContext(UserContext);
    const reciver = useContext(reciverContext);
    const [messages, setMessages] = useState<any>([]);
    const [groupMessage, setGroupMessage] = useState<any>([])
    const [value, setValue] = useState('');
    const inputRef = useRef(null)
    const [mptest, setMptest] = useState(new Map())
    const groupMap = new Map();

    //fetch group messages
    useEffect(()=>{
        if(reciver.reciver.isgroup)
        {
            console.log('daba ah')
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/messages?id=${reciver.reciver.id}`,{
                method: 'GET', headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            }).then((response) => response.json()).then(data => {setGroupMessage(data)})
        }
    },[reciver.reciver.isgroup])
    //fetch private messages
    useEffect(()=> {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/messages?id=${user.user.id}`,{
            method: 'GET', headers:{
                
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => response.json()).then(data => setMessages(data))
    }, [])
    //listening to message even on the socket
    useEffect(() => {
        socket.on('message', (data:any) =>{
            if(!reciver.reciver.isgroup)
            {
                setMessages((old:any) => [...old, {src:data.src, dst:data.dst,content:data.content}])
            }
            else
            {
                setGroupMessage((old:any) => [...old, {src:data.src, dst:data.dst,content:data.content}])
            }
            console.log(groupMessage);
        })
    },[reciver.reciver.isgroup])
    const send = (e:any)=>{
        e.preventDefault();
        if (value != '')
        {
            if(!reciver.reciver.isgroup)
            {
                socket.emit('message', {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:false})
                setMessages((old:any) => [...old, {src:user.user.id, dst:reciver.reciver.id, content:value}]);
            }
            else
            {
                socket.emit('message', {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:true})
                setGroupMessage((old:any) => [...old, {src:user.user.id, dst:reciver.reciver.id, content:value}]);
            }
            setValue('')
        }
    }
    const [current, setCurrent] = useState([])
    useEffect(()=>{setCurrent(mptest.get('3'));},[])
    if (reciver.reciver.id == undefined)
        return(<div className="sm:hidden"><Chats/></div>)
    return(
        <div className="flex flex-col  justify-center relative  h-full">
            <div>
                <Profile/>
            </div>
            <div className="flex flex-col h-[87%] p-3 overflow-auto">
                {
                    (!reciver.reciver.isgroup && messages)?
                    (
                        messages.map((message:any,index:number) => {
                            if(message.src == user.user.id && message.dst == reciver.reciver.id)
                                return( <Message key={index} content={message.content} class="self-end rounded-lg bg-sky-900 p-2 mb-2"/>)
                            else if (message.src == reciver.reciver.id && message.dst == user.user.id)
                                return( <Message key={index} content={message.content} class="self-start rounded-lg bg-sky-900 p-2 mb-2"/>)
                        })
                    ):(
                        groupMessage.map((message:any, index:number) => {
                            if (message.src == user.user.id && message.dst == reciver.reciver.id)
                                return( <Message key={index} content={message.content} class="self-end rounded-lg bg-sky-900 p-2 mb-2"/>)
                            else if (message.dst == reciver.reciver.id)
                                return( <Message key={index} content={message.content} class="self-start rounded-lg bg-sky-900 p-2 mb-2"/>)
                        })
                    )
                }
            </div>
            <div className="self-center w-[90%] absolute bottom-2">
                <form onSubmit={send}>
                    <input onChange={event => setValue(event.target.value)} value={value} ref={inputRef} className="focus:outline-none rounded-full bg-sky-900 p-1 pl-2 w-full" type="text" placeholder="Message..." />
                    <button className="absolute top-2 right-2" type="submit"><VscSend /></button>
                </form>
            </div>
        </div>
    )
}