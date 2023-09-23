'use client'

import { Dispatch, SetStateAction, useState } from "react";
import "../Settings/Settings.css"
import Cookies from 'js-cookie';
import { Input } from "@chakra-ui/react";
import {AiFillCloseCircle} from 'react-icons/ai'
// type GroopSet = Dispatch<SetStateAction<{
//     type: string;
//     name: string;
//     password: string;
// }>>;

type GroopObj = {
    type: string;
    name: string;
    password: string;
}

const CreateGroupRoom = (Obj:GroopObj, setIsCreated:any)=>
{
    const name: any = document.getElementById("Username1");
    const password: any = document.getElementById("password1");
    const NewObj:GroopObj = Obj;
    if (name)
    {
        NewObj.name = name.value;
        //check if you need to hash your passwrd
        if(password)
            NewObj.password = password.value;
    }
    console.log(NewObj);
    //do your logic here
    fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/create`,{
        method: 'POST', headers:{
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Obj)
    })
    setIsCreated(true)
}

const GroupSettings = () => 
{
    const [isCreated, setIsCreated] = useState(false);
    const [Obj, SetObj] = useState({type:"public",name:"",password:""});
    if (isCreated)
        return (<></>)
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
        // <div className=" absolute top-[10%] left-1/2 transform -translate-x-1/2 my-auto z-[100]">
        //     <div className="container mx-auto px-2 py-[20px] text-center items-center pb-40"></div>
        //     <div className="bgtet h-[400px]  w-[400px] md:w-[500px] lg:w-[600px] rounded-lg shadow-2xl ">
        //         <p className="mx-auto text-center pt-5 text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">Create New Room</p>
        //         <div className="relative flex top-[25px] w-[100%] h-[30px]">
        //             <p className="relative flex left-[10%] text-xl  font-semibold text-white-500">Room Type:</p>
        //         </div>
        //         <div className="relative flex top-[50px] w-[100%] h-[30px] justify-center">
        //             <div className="p-1">
        //                 <input name="radio" onClick={()=>SetObj({type:"public", name:Obj.name, password:Obj.password})} type="radio" id="public" />
        //                 <label htmlFor="public">public</label>
        //             </div >
        //             <div className="p-1">
        //                 <input name="radio" onClick={()=>SetObj({type:"private", name:Obj.name, password:Obj.password})} type="radio" id="private" />
        //                 <label htmlFor="private">private</label>
        //             </div>
        //             <div className="p-1">
        //                 <input name="radio" onClick={()=>SetObj({type:"protected", name:Obj.name, password:Obj.password})} type="radio" id="protected" />
        //                 <label htmlFor="protected">protected</label>
        //             </div>
        //         </div>
        //         <form>
        //             <input id="Username1"  className="relative h-[30px] left-1/2 transform -translate-x-1/2 top-[75px] rounded-md shadow-2xl bg-indigo-500" type='text' placeholder="name..."></input>
        //         </form>
        //         <form>
        //             {(Obj.type == "private")&&<input id="password1" className="relative h-[30px] left-1/2 transform -translate-x-1/2 top-[100px] rounded-md shadow-2xl bg-indigo-500" type='text' placeholder="password..."></input>}
        //         </form>
        //         <button onClick={()=> {CreateGroupRoom(Obj, setIsCreated);}} id="Create1" className="relative w-[125px] h-[40px] top-[150px] left-[calc(50%-62.5px)] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500 bg-blue-500 hover:bg-blue-700 rounded-md shadow-2xl">Create</button>
        //         <button className=" relative bg-blue-700 p-2 rounded-md w-[125px] h-[40px] top-[150px] left-[200px]">cancel</button>
        //     </div>
        // </div>
    );
}

export default GroupSettings;