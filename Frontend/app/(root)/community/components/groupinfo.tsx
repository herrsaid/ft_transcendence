import { useContext, useEffect, useState } from 'react'
import {FaHashtag} from 'react-icons/fa'
import reciverContext from '../reciverContext'
import Cookies from 'js-cookie';
import UserContext from '../../UserContext';
import Friend from './friends';
import Groupmember from './groupmember';
import { Button, Input, useToast } from '@chakra-ui/react';
import { socket } from '../../socket/socket';
import {BiArrowBack} from 'react-icons/bi'
import activeContext from '../activeContext';
import {AiFillSetting} from 'react-icons/ai'

export default function Groupinfo()
{
    const reciver = useContext(reciverContext);
    const active = useContext(activeContext);
    const user = useContext(UserContext)
    const [members, setMembers] = useState([]);
    const [add, setAdd] = useState(false);
    const toast = useToast();
    const adduser =  async (e:any)=>{
        e.preventDefault();
        const input:any = document.getElementById('username');
        if (input.value)
        {
            const res =  fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/addmember?id=${reciver.reciver.id}&username=${input.value}`,
                {
                    method: 'GET',
                    headers:{
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                })
            res.then(data =>{
                if (data.status == 404)
                {
                    toast({
                        title: 'error',
                        description: "user Not Found",
                        position: 'top-right',
                        status: 'error',
                        duration: 6000,
                        isClosable: true,
                      })
                }
                else
                {
                    fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/members?id=${reciver.reciver.id}`,
                    {
                        method: 'GET',
                        headers:{
                            Authorization: `Bearer ${Cookies.get('access_token')}`
                        }
                    }).then((response) => response.json()).then(res => {
                        reciver.setReciver({...reciver.reciver,members:res})
                    });
                    toast({
                        title: 'Great',
                        description: "user Added",
                        position: 'top-right',
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                      })
                      socket.emit('joinroom',{id:reciver.reciver.id})
                      setAdd(!add);
                }
            })
        }
    }
    const remove = (e:any)=>{
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/remove?id=${reciver.reciver.id}`,
                    {
                        method: 'GET',
                        headers:{
                            Authorization: `Bearer ${Cookies.get('access_token')}`
                        }
                    }).then((response) => {
                        if (response.status == 200)
                        {
                            toast({
                                title: 'great',
                                description: "password removed",
                                position: 'top-right',
                                status: 'info',
                                duration: 6000,
                                isClosable: true,
                              })
                        }
                    })
    }
    const change = (e:any) => {
        e.preventDefault();
        const element:any = document.getElementById('password');
        const value = element.value.trim();
        if (value != '')
        {
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/change`,{
                method: 'POST', headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id:reciver.reciver.id, password:value})
            }).then(res => {
                if (res.status == 201)
                {
                    toast({
                        title: 'Greate',
                        description: "password changed",
                        position: 'top-right',
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                      })
                }
            })
        }
    }
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/members?id=${reciver.reciver.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => response.json()).then(data => setMembers(data));
    },[reciver.reciver.id])
    const leave = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/leave?id=${reciver.reciver.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
        reciver.setReciver({})
    }
    return (
        <div className=" relative flex flex-col justify-center h-full">
            <div className='absolute top-0 left-5 sm:hidden'>
                <button onClick={() => {active.setActive('message')}} className='btn btn-outline btn-info'><BiArrowBack/></button>
            </div>
            <div className="flex flex-col  h-[40%] w-[90%] self-center mb-1 rounded-lg bg-[#363672] justify-center">
                <div className=" rounded-full self-center">
                    <FaHashtag size={60}></FaHashtag>
                </div>
                <div className="self-center">
                    {reciver.reciver.name}
                </div>

                <div className="self-center">
                    {(reciver.reciver.me == "owner" && reciver.reciver.type != "private") && <button onClick={()=>{const id:any =document.getElementById('setting'); id.showModal()}} className='btn btn-outline btn-secondary'><AiFillSetting size={30}></AiFillSetting></button>}
                </div>
            </div>
            <div className="flex flex-col h-[50%] w-[90%] justify-between self-center rounded-lg bg-[#363672]">
                <div className='self-center'>
                        <h1 className='font-bold'>members</h1>
                </div>
                <div className='flex-grow overflow-auto'>
                        {
                            reciver.reciver.members.map((data:any, index:number) => 
                            {
                                return (<Groupmember member={data} key={index} />)
                            })
                        }
                </div>
                <div className='flex self-center w-[90%]'>
                    <button onClick={leave} className='btn btn-error w-1/2 m-1' type="submit">leave</button>
                    {(reciver.reciver.me != "user") && <button onClick={()=>{const id:any =document.getElementById('add'); id.showModal()}} className='btn btn-success w-1/2 m-1' type="submit">Add</button>}
                </div>
            </div>
            {
                // add && <div className='bg-[#18184a] flex flex-col absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] p-4 rounded-lg'>
                //     <form className='flex' onSubmit={adduser}>
                //         <Input id='username' variant='outline' placeholder='username' type="string" />
                //          <Button onClick={adduser} colorScheme='Green' type="submit">add</Button>
                //     </form>
                // </div>
            }
            {/* <button className="btn" onClick={()=>document.getElementById('add').showModal()}>open modal</button> */}
                <dialog id="add" className="modal">
                  <div className="modal-box bg-[#18184a]">
                  <div className='bg-[#18184a] flex flex-col absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] p-4 rounded-lg'>
                    <form className='flex' onSubmit={adduser}>
                        <Input id='username' variant='outline' placeholder='username' type="string" />
                         <Button onClick={adduser} colorScheme='Green' type="submit">add</Button>
                    </form>
                </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
                <dialog id="setting" className="modal">
                  <div className="modal-box bg-[#18184a]">   
                    <div className='flex flex-col justify-center'>
                        <div className='flex self-center'>
                            <h1 className=' font-bold'>Settings</h1>
                        </div>
                        <div className='flex self-center p-2'>
                            <form action="">
                                <div>
                                    <input id='password' type="password" placeholder="New Password" className="input bg-[#18184a] input-secondary w-full max-w-xs m-2" />
                                </div>
                                <div className='flex flex-col self-center'>
                                    <button onClick={change} type='submit' className='btn btn-success m-1'>change</button>
                                    {(reciver.reciver.type == "protected") && <button onClick={remove} className='btn btn-error m-1'>remove password</button>}
                                </div>
                            </form>
                        </div>
                </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
        </div>
    )
}
