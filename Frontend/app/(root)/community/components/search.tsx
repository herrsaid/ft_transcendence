import { useContext, useEffect, useRef, useState } from "react";
import {HiUserGroup} from 'react-icons/hi'
import {MdOutlineGroupAdd} from 'react-icons/md'
import Cookies from 'js-cookie';
import UserContext from "../../UserContext";
import { socket } from "../../socket/socket";
import { useToast } from "@chakra-ui/react";
import reciverContext from "../reciverContext";

function Result({res}:any)
{
    const [password, setpassword] = useState(false);
    const user = useContext(UserContext);
    const reciver = useContext(reciverContext);
    const toast = useToast()
    const join = (e:any)=>{
        e.preventDefault();
        if (res.type == "public")
        {
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/join?id=${res.id}&user=${user.user.id}`, {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            })
            socket.emit('joinroom',{id:res.id})
            reciver.setReciver({...res, isGroup:true});
        }
        else
            setpassword(true)
    }
    const joinprotected = async (e:any)=>{
        e.preventDefault();
        const passowrd = document.getElementById('passwd');
        if (passowrd)
        {
            const obj = {id:res.id, password:passowrd.value}
            const respond = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/protectedjoin`, {
                method: 'POST',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            if (respond.status == 201)
            {
                setpassword(false)
                toast({
                    title: 'Joined',
                    description: "thanks for joining",
                    position: 'top-right',
                    status: 'info',
                    duration: 6000,
                    isClosable: true,
                  })
                  socket.emit('joinroom',{id:res.id})
                  reciver.setReciver({...res, isGroup:true});
            }
            else
            {
                toast({
                    title: 'error',
                    description: "Wrong password",
                    position: 'top-right',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                  })
            }
        }
    }
    return (
        <div className="flex justify-between hover:bg-[#18184a] cursor-pointer p-2 rounded-lg">
            <div className="flex">
            <HiUserGroup size={30} />
            {res.name}
            </div>
            <div className="p-1 rounded-full hover:bg-green-500">
                <button onClick={join}><MdOutlineGroupAdd size={20} /></button>
            </div>
            { password &&
                <div className="h-96 w-96 absolute bg-[#363672] rounded-md flex flex-col justify-center">
                    <div className="self-center m-2"><h1 className="font-bold ">Password neaded:</h1></div>
                    <div  className="self-center m-2">
                        <input id="passwd" className="rounded-full bg-[#18184a] p-1" type="password" placeholder="password"/>
                    </div>
                    <div className="self-center">
                        <input onClick={joinprotected} className="rounded-sm bg-blue-600 px-1 m-2" type="button" value="join" />
                    </div>
                </div>
            }
        </div>
    )
}

export default function Search(props:any)
{
    if (!props.search)
        return(<>no groups</>)
    return (
        <div className="flex flex-col">
            {
            (props.search != undefined)?(
                props.search.map((data:any,index:number) => {return(<Result key={index} res={data}/>)})
            ):<>no groups</>
            }  
        </div>
    )
}