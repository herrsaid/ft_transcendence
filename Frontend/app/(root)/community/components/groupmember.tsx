
import { useContext, useEffect, useState } from 'react'
import {SlOptionsVertical} from 'react-icons/sl'
import reciverContext from '../reciverContext'
import UserContext from '../../UserContext';
import { GiMute } from 'react-icons/gi';
import Cookies from 'js-cookie';
import { Button, Input, useToast } from '@chakra-ui/react';
import { dividerClasses } from '@mui/material';
import useSWR from 'swr';

export default function Groupmember({member}:any)
{
    const reciver = useContext(reciverContext);
    const user = useContext(UserContext);
    const [click, setClick] = useState(false)
    const [kick, setKick] = useState(false)
    const [mute, setMute] = useState(false);
    const toast = useToast();
    const handlemute = () => {
        setMute(!mute);
    }
    const showerror = (err:string) =>{
        toast({
            title: 'error',
            description: err,
            position: 'top-right',
            status: 'error',
            duration: 6000,
            isClosable: true,
          })
    }
    const handlekick = ()=>
    {
        if (member.role == "owner")
        {
            showerror("Can't Kick Owner")
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/kick?id=${reciver.reciver.id}&toremove=${member.user.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
        setClick(!click);
        setKick(!kick);
    }
    const handleban = ()=>{
        if (member.role == "owner")
        {
            showerror("Can't Ban Owner")
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/ban?id=${reciver.reciver.id}&toban=${member.user.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
    }
    const addAdmin = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/newadmin?id=${reciver.reciver.id}&new=${member.user.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/members?id=${reciver.reciver.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => response.json()).then(res => {
            reciver.setReciver({...reciver.reciver,members:res})
        });
        setClick(!click);
    }
    const submitmute = (e:any)=>{
        e.preventDefault();
        const time:any = document.getElementById('time');
        if (member.role == "owner")
        {
            showerror("Can't Mute Owner")
            return;
        }
        if (time && time.value >= 0 && time.value <= 60 && time.value != '')
        {
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/mute?id=${reciver.reciver.id}&tomute=${member.user.id}&time=${time.value}`,
            {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            })
            toast({
                title: 'success',
                description: 'muted',
                position: 'top-right',
                status: 'success',
                duration: 6000,
                isClosable: true,
              })
            time.value = '';
        }
        else
        {
            showerror("Max time to mute is 60 min")
        }
    }
    if (member.user.id == user.user.id)
        return(<></>)
    if(kick)
        return(<></>)
    return(
        <div className=" p-1 w-full flex justify-between hover:bg-[#7d32d9]">
            <div className="flex ">
                <img className="w-10 h-10 rounded-full" src={member.user.avatar} alt="No image" />
                <h1 className="p-1">{member.user.username} {<h6 className=' text-green-600 text-sm text-center border border-green-500 rounded-full'>{member.role}</h6>}</h1>
            </div>
            <div className='p-2'>
                {(reciver.reciver.me != "user")&&<button id={member.user.id} onClick={()=>{const id:any = document.getElementById(member.user.username); id.showModal()}}><SlOptionsVertical/> </button>}
                <dialog id={member.user.username} className="modal">
                <div className="modal-box flex bg-[#18184a]">
                    <div className=' flex flex-col w-1/2 justify-center'>
                        <div className=' self-center'>
                            <img className='w-24 rounded-full' src={member.user.avatar} alt="" />
                        </div>
                        <div className=' font-bold self-center'>
                            <h1>{member.user.username}</h1>
                        </div>
                    </div>
                  <div className='bg-[#18184a] flex flex-colp-4 rounded-lg  self-center'>
                            <div>
                                <form className='flex' onSubmit={submitmute}>
                                    <input className=' bg-[#18184a] input input-bordered input-primary w-full max-w-xs m-1' id='time'  placeholder='Time' type="number"  min='1' max='5' />
                                    <button id='unmute' onClick={submitmute} className='btn btn-outline btn-success m-1' type="submit">mute</button>
                                </form>
                                <div className='flex flex-col'>
                                    <button className='m-1 btn btn-outline btn-error' onClick={handlekick} >Kick</button>
                                    <button className='m-1 btn btn-outline btn-error' onClick={handleban} >Ban/Unban</button>
                                    {(member.role == 'user' ) && <button className='m-1 btn btn-outline btn-success' onClick={addAdmin} >Set Admin</button>}
                                </div>
                            </div>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
            </div>
        </div>
    ) 
}