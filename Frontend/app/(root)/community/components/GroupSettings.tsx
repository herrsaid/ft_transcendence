'use client'

import { Dispatch, SetStateAction, useContext, useState } from "react";
import "../Settings/Settings.css"
import Cookies from 'js-cookie';
import { Input, useToast } from "@chakra-ui/react";
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
        var name: any = document.getElementById("Username1");
        var password: any = document.getElementById("password1");
        name.value = name.value.trim();
        const NewObj:GroopObj = Obj;
        if (name.value != '' && name.value.length <= 10)
        {
            NewObj.name = name.value;
            //check if you need to hash your passwrd
            if (Obj.type == 'protected')
            {
                const passwrd = password.value.trim();
                if(passwrd != '')
                    NewObj.password = passwrd;
                else
                {
                    toast({
                        title: 'error',
                        description: "enter a valid password",
                        position: 'top-right',
                        status: 'error',
                        duration: 6000,
                        isClosable: true,
                      })
                      return;
                }
            }
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
                else
                {
                    toast({
                        title: 'error',
                        description: "this name is used before",
                        position: 'top-right',
                        status: 'error',
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
    // if (isCreated)
    //     return (null)
    return(
        <div className="bg-[#18184a]">
            <div className="flex w-full justify-center">
                <div className="">
                    <p className=" font-bold">Create New Room</p>
                    {/* <button className="" onClick={() => setIsCreated(true)}><AiFillCloseCircle></AiFillCloseCircle></button> */}
                </div>
            </div>
            <div>
            <div className="flex justify-between p-2">
                     <div className="">
                         <label className="label cursor-pointer" htmlFor="public">
                            <span className="p-1">Public</span> 
                            <input className="radio radio-success" name="radio-10" onClick={()=>SetObj({type:"public", name:Obj.name, password:Obj.password})} type="radio" id="public" />
                         </label>
                     </div >
                     <div className="">
                         <label className="label cursor-pointer" htmlFor="private">
                         <span className="p-1">Private</span> 
                         <input className="radio radio-success" name="radio-10" onClick={()=>SetObj({type:"private", name:Obj.name, password:Obj.password})} type="radio" id="private" />
                         </label>
                     </div>
                     <div className="">
                         <label className="label cursor-pointer" htmlFor="protected">
                         <span className="p-1">Protected</span> 
                         <input className="radio radio-success" name="radio-10" onClick={()=>SetObj({type:"protected", name:Obj.name, password:Obj.password})} type="radio" id="protected" />
                         </label>
                     </div>
                 </div>
                 <div className=" flex-col w-full justify-center">
                    <input  id="Username1" maxLength={8} type="text" placeholder="name" className="input input-bordered w-full max-w-xs bg-[#18184a]" />
                    {/* <Input id="Username1" maxLength={8} placeholder="name..." _placeholder={{ opacity: 1, color: 'gray.500' }} className="focus:outline-none" variant='flushed'/> */}
                     {(Obj.type == "protected")&&<input id="password1" type="password" maxLength={20} placeholder="password" className="input input-bordered w-full max-w-xs bg-[#18184a]" />}
                 </div>
            </div>

            <div className="text-center mt-8">
      
      <button  id="Create1" className="stats-bg forhover text-white py-2 px-4 rounded-lg" onClick={()=> {CreateGroupRoom(Obj, setIsCreated);}}>Create</button>
      
    </div> 
        </div>
    );
}

export default GroupSettings;