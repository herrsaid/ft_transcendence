import { useContext, useState } from "react";
import {HiUserGroup} from 'react-icons/hi'
import {MdOutlineGroupAdd} from 'react-icons/md'
import Cookies from 'js-cookie';
import UserContext from "../../UserContext";
import { socket } from "../../socket/socket";

function Result(res:any)
{
    const user = useContext(UserContext);
    const join = (e:any)=>{
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/join?id=${res.id}&user=${user.user.id}`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
        socket.emit('joinroom',{id:res.id})
    }
    return (
        <div className="flex justify-between hover:bg-[#18184a] cursor-pointer p-2 rounded-lg">
            <div className="flex">
            <HiUserGroup size={30} />
            {res.name}
            </div>
            <div className="p-1 rounded-full hover:bg-green-200">
                <button onClick={join}><MdOutlineGroupAdd size={20} /></button>
            </div>
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
                props.search.map((data:any,index:number) => {return(<Result key={index} name={data.name} id={data.id}/>)})
            ):<>no groups</>
            }
        </div>
    )
}