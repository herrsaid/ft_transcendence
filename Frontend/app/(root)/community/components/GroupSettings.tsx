'use client'

import { Dispatch, SetStateAction, useState } from "react";
import "../Settings/Settings.css"
import Cookies from 'js-cookie';
import { type } from "os";

type GroopSet = Dispatch<SetStateAction<{
    type: string;
    name: string;
    password: string;
}>>;

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
        <div className=" absolute top-[10%] left-1/2 transform -translate-x-1/2 my-auto z-[100]">
            <div className="container mx-auto px-2 py-[20px] text-center items-center pb-40"></div>
            <div className="bgtet h-[400px]  w-[400px] md:w-[500px] lg:w-[600px] rounded-lg shadow-2xl ">
                <p className="mx-auto text-center pt-5 text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">Create New Room</p>
                <div className="relative flex top-[25px] w-[100%] h-[30px]">
                    <p className="relative flex left-[10%] text-xl  font-semibold text-white-500">Room Type:</p>
                </div>
                <div className="relative flex top-[50px] w-[100%] h-[30px] justify-center">
                    <div className="p-1">
                        <input name="radio" onClick={()=>SetObj({type:"public", name:Obj.name, password:Obj.password})} type="radio" id="public" />
                        <label htmlFor="public">public</label>
                    </div >
                    <div className="p-1">
                        <input name="radio" onClick={()=>SetObj({type:"private", name:Obj.name, password:Obj.password})} type="radio" id="private" />
                        <label htmlFor="private">private</label>
                    </div>
                    <div className="p-1">
                        <input name="radio" onClick={()=>SetObj({type:"protected", name:Obj.name, password:Obj.password})} type="radio" id="protected" />
                        <label htmlFor="protected">protected</label>
                    </div>
                </div>
                <form>
                    <input id="Username1"  className="relative h-[30px] left-1/2 transform -translate-x-1/2 top-[75px] rounded-md shadow-2xl bg-indigo-500" type='text' placeholder="name..."></input>
                </form>
                <form>
                    {(Obj.type == "private")&&<input id="password1" className="relative h-[30px] left-1/2 transform -translate-x-1/2 top-[100px] rounded-md shadow-2xl bg-indigo-500" type='text' placeholder="password..."></input>}
                </form>
                <button onClick={()=> {CreateGroupRoom(Obj, setIsCreated);}} id="Create1" className="relative w-[125px] h-[40px] top-[150px] left-[calc(50%-62.5px)] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500 bg-blue-500 hover:bg-blue-700 rounded-md shadow-2xl">Create</button>
            </div>
        </div>
    );
}

export default GroupSettings;