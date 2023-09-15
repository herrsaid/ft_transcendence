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
import GroupMsg from "./groupmsg";

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
    const [mptest, setMptest] = useState(new Map())
    const groupMap = new Map();

    //fetch group messages
    useEffect(()=>{
        if(reciver.reciver.isgroup)
        {
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/messages?id=${reciver.reciver.id}`,{
                method: 'GET', headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            }).then((response) => response.json()).then(data => {setGroupMessage(data)})
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/members?id=${reciver.reciver.id}`,
            {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            }).then((response) => response.json()).then(data => reciver.setReciver({...reciver.reciver,members:data}));
            console.log('rec', reciver.reciver.members)
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
    //listening to message even on the socket
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
        var mydiv = document.getElementById('scrollable')
        // mydiv?.scrollTo({top:mydiv.scrollHeight, behavior: 'instant'})
        if (value != '')
        {
            if(!reciver.reciver.isgroup)
            {
                socket.emit('message', {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:false})
                setMessages((old:any) => [...old, {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:false}]);
            }
            else
            {
                socket.emit('message', {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:true})
                setGroupMessage((old:any) => [...old, {src:user.user.id, dst:reciver.reciver.id, content:value, toGroup:true}]);
            }
            setValue('')
        }
    }
    const [current, setCurrent] = useState([])
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
                                return( <Message key={index} content={message.content} class="self-end rounded-lg  bg-[#34346e] drop-shadow-md p-2 mb-2"/>)
                            else if (message.src == reciver.reciver.id && message.dst == user.user.id)
                                return( <Message key={index} content={message.content} class="self-start rounded-lg bg-[#7d32d9] drop-shadow-md p-2 mb-2"/>)
                        })
                    ):(
                        groupMessage.map((message:any, index:number) => {
                            if (message.src == user.user.id && message.dst == reciver.reciver.id)
                                return (<GroupMsg content={{class:"self-end rounded-lg  bg-[#34346e] drop-shadow-md p-2 mb-2", content:message.content, member:message.src}} />)
                                // return( <Message key={index} content={message.content} class="self-end rounded-lg  bg-[#34346e] drop-shadow-md p-2 mb-2"/>)
                            else if (message.dst == reciver.reciver.id)
                                return( <Message key={index} content={message.content} class="self-start rounded-lg bg-[#7d32d9] drop-shadow-md p-2 mb-2"/>)
                        })
                    )
                }
            </div>
            <div className="self-center w-[90%] absolute bottom-2">
                <form onSubmit={send}>
                    <input onChange={event => setValue(event.target.value)} value={value} ref={inputRef} className="focus:outline-none rounded-full bg-[#34346e] drop-shadow-md p-1 pl-2 w-full" type="text" placeholder="Message..." />
                    <button className="absolute top-2 right-2" type="submit"><VscSend /></button>
                </form>
            </div>
        </div>
    )
}