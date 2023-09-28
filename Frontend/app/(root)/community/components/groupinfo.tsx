import { useContext, useEffect, useState } from 'react'
import {FaHashtag} from 'react-icons/fa'
import reciverContext from '../reciverContext'
import Cookies from 'js-cookie';
import UserContext from '../../UserContext';
import Friend from './friends';
import Groupmember from './groupmember';
import { Button, Input, useToast } from '@chakra-ui/react';
import { socket } from '../../socket/socket';
export default function Groupinfo()
{
    const reciver = useContext(reciverContext);
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
        <div className="flex flex-col justify-center h-full">
            <div className="flex flex-col  h-[40%] w-[90%] self-center mb-1 rounded-lg bg-[#363672] justify-center">
                <div className=" rounded-full self-center">
                    <FaHashtag size={60}></FaHashtag>
                </div>
                <div className="self-center">
                    {reciver.reciver.name}
                </div>
                <div className="self-center">
                    {reciver.reciver.size} member
                </div>
            </div>
            <div className="flex flex-col h-[50%] w-[90%] justify-between self-center rounded-lg bg-[#363672]">
                <div className='self-center'>
                        <h1 className='font-bold'>members</h1>
                </div>
                <div className='flex-grow  overflow-auto'>
                        {
                            reciver.reciver.members.map((data:any, index:number) => 
                            {
                                return (<Groupmember data={data} key={index} />)
                            })
                        }
                </div>
                <div className='self-center'>
                    <Button onClick={leave} colorScheme='red' type="submit">leave</Button>
                    {(reciver.reciver.me != "user") && <Button onClick={() => setAdd(true)} colorScheme='whatsapp' type="submit">Add</Button>}
                </div>
            </div>
            {
                add && <div className='bg-[#18184a] flex flex-col absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] p-4 rounded-lg'>
                    <form className='flex' onSubmit={adduser}>
                        <Input id='username' variant='outline' placeholder='username' type="string" />
                         <Button onClick={adduser} colorScheme='Green' type="submit">add</Button>
                    </form>
                </div>
            }
        </div>
    )
}