'use client'

import { Dispatch, SetStateAction, useContext, useState } from "react";
import "../Settings/Settings.css"
import Cookies from 'js-cookie';
import { Input, useToast } from "@chakra-ui/react";
import {AiFillCloseCircle} from 'react-icons/ai'
import reciverContext from "../reciverContext";


type GroopObj = {
    type: string;
    name: string;
    password: string;
}


const GroupSettings = () => 
{
    const [isCreated, setIsCreated] = useState(false);
    const [Obj, SetObj] = useState({type:"public",name:"",password:""});
    const reciver = useContext(reciverContext);
    const toast = useToast();
    const CreateGroupRoom = (Obj:GroopObj, setIsCreated:any) =>
    {
        const name: any = document.getElementById("Username1");
        const password: any = document.getElementById("password1");
        const NewObj:GroopObj = Obj;
        if (name.value != '')
        {
            NewObj.name = name.value;
            //check if you need to hash your passwrd
            if(password)
                NewObj.password = password.value;
            const res = fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/create`,{
                method: 'POST', headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Obj)
            })
            res.then(data => 
            {
                if (data.status == 201)
                {
                    toast({
                        title: 'succes',
                        description: "Room Created",
                        position: 'top-right',
                        status: 'info',
                        duration: 6000,
                        isClosable: true,
                      })
                }
            }
                )
            reciver.setReciver({...reciver.reciver, action:Math.random()})
            // socket.emit('joinroom',{id:res.id})
            setIsCreated(true)
        }
        else
        {
            toast({
                title: 'error',
                description: "Please Enter a name",
                position: 'top-right',
                status: 'error',
                duration: 6000,
                isClosable: true,
              })
        }
        //do your logic here
    }
    if (isCreated)
        return (null)
    return(
        <div className="absolute transform translate-x-[-50%] 
        translate-y-[-50%] top-[50%] left-[50%] flex-col 
        bg-[#18184a] p-6 rounded-md w-[400px] z-[100]">
            <div className=" flex w-full justify-end">
                <div className="self-end">
                    <button className="" onClick={() => setIsCreated(true)}><AiFillCloseCircle></AiFillCloseCircle></button>
                </div>
            </div>
            <div>
            <div className="flex justify-between p-2">
                     <div className="p-1">
                         <input name="radio"  onClick={()=>SetObj({type:"public", name:Obj.name, password:Obj.password})} type="radio" id="public" />
                         <label className="p-1" htmlFor="public">public</label>
                     </div >
                     <div className="p-1">
                         <input name="radio" onClick={()=>SetObj({type:"private", name:Obj.name, password:Obj.password})} type="radio" id="private" />
                         <label className="p-1" htmlFor="private">private</label>
                     </div>
                     <div className="p-1">
                         <input name="radio" onClick={()=>SetObj({type:"protected", name:Obj.name, password:Obj.password})} type="radio" id="protected" />
                         <label className="p-1" htmlFor="protected">protected</label>
                     </div>
                 </div>
                 <div className=" flex-col w-full justify-center">
                    <Input id="Username1" placeholder="name..." _placeholder={{ opacity: 1, color: 'gray.500' }} className="focus:outline-none" variant='flushed'/>
                     {/* <input id="Username1"  className="" type='text' placeholder="name..."></input> */}
                     {(Obj.type == "protected")&&<Input id="password1" placeholder="password..." _placeholder={{ opacity: 1, color: 'gray.500' }} type="password" className="focus:outline-none" variant='flushed'/>}
                 </div>
            </div>

            <div className="text-center mt-8">
      
      <button  id="Create1" className="stats-bg forhover text-white py-2 px-4 rounded-lg" onClick={()=> {CreateGroupRoom(Obj, setIsCreated);}}>Create</button>
      
    </div> 
        </div>
    );
}

export default GroupSettings;