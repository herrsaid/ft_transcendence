'use client'

import { Dispatch, SetStateAction, useState } from "react";
import "../Settings/Settings.css"

type GroopSet = Dispatch<SetStateAction<{
    RoomType: number;
    UserName: string;
    Password: string;
}>>;

type GroopObj = {
    RoomType: number;
    UserName: string;
    Password: string;
}

const PublicMood = (Obj:GroopObj, SetObj:GroopSet)=>
{
    const Public1: HTMLElement | null = document.getElementById("Public1");
    const Private1: HTMLElement | null = document.getElementById("Private1");
    const Protected1: HTMLElement | null = document.getElementById("Protected1");
    const password1: HTMLElement | null = document.getElementById("password1");
    const NewObj:GroopObj = Obj;
    if(Public1 && Private1 && Protected1 && password1)
    {
        Public1.style.backgroundColor = "rgb(67,56,202)";
        Private1.style.backgroundColor = "rgb(99,102,241)";
        Protected1.style.backgroundColor ="rgb(99,102,241)";
        password1.style.display = "none";
    }
    NewObj.RoomType = 1;
    SetObj(NewObj);
}

const PrivateMood = (Obj:GroopObj, SetObj:GroopSet)=>
{
    const Public1: HTMLElement | null = document.getElementById("Public1");
    const Private1: HTMLElement | null = document.getElementById("Private1");
    const Protected1: HTMLElement | null = document.getElementById("Protected1");
    const password1: HTMLElement | null = document.getElementById("password1");
    const NewObj:GroopObj = Obj;
    if(Public1 && Private1 && Protected1 && password1)
    {
        Public1.style.backgroundColor = "rgb(99,102,241)";
        Private1.style.backgroundColor = "rgb(67,56,202)";
        Protected1.style.backgroundColor ="rgb(99,102,241)";
        password1.style.display = "block";
    }
    NewObj.RoomType = 2;
    SetObj(NewObj);
}

const protectedMood = (Obj:GroopObj, SetObj:GroopSet)=>
{
    const Public1: HTMLElement | null = document.getElementById("Public1");
    const Private1: HTMLElement | null = document.getElementById("Private1");
    const Protected1: HTMLElement | null = document.getElementById("Protected1");
    const password1: HTMLElement | null = document.getElementById("password1");
    const NewObj:GroopObj = Obj;
    if(Public1 && Private1 && Protected1 && password1)
    {
        Public1.style.backgroundColor = "rgb(99,102,241)";
        Private1.style.backgroundColor = "rgb(99,102,241)";
        Protected1.style.backgroundColor ="rgb(67,56,202)";
        password1.style.display = "block";
    }
    NewObj.RoomType = 3;
    SetObj(NewObj);
}

const CreateGroupRoom = (Obj:GroopObj)=>
{
    const Username1: any = document.getElementById("Username1");
    const password1: any = document.getElementById("password1");
    const NewObj:GroopObj = Obj;
    if (Username1 && password1)
    {
        NewObj.UserName = Username1.value;
        //check if you need to hash your passwrd
        NewObj.Password = password1.value;
    }
    console.log(NewObj);
    //do your logic here
}

const GroupSettings = () => 
{
    const [Obj, SetObj] = useState({RoomType:0,UserName:"",Password:""});
    return(
        <div className=" absolute top-[10%] left-1/2 transform -translate-x-1/2 my-auto">
            <div className="container mx-auto px-2 py-[20px] text-center items-center pb-40"></div>
            <div className="bgtet h-[400px]  w-[400px] md:w-[500px] lg:w-[600px] rounded-lg shadow-2xl ">
                <p className="mx-auto text-center pt-5 text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">Create New Room</p>
                <div className="relative flex top-[25px] w-[100%] h-[30px]">
                    <p className="relative flex left-[10%] text-xl  font-semibold text-white-500">Room Type:</p>
                </div>
                <div className="relative flex top-[50px] w-[100%] h-[30px]">
                    <button onClick={()=> {PublicMood(Obj,SetObj);}}  id="Public1" className="relative w-[17%] h-[30px] flex left-[15%] bg-indigo-500 rounded-lg shadow-2xl">
                        <p className="w-[100px] h-[30px] text-center">Public</p>
                    </button>
                    <button onClick={()=> {PrivateMood(Obj,SetObj);}} id="Private1" className="relative w-[17%] h-[30px] flex left-[25%] bg-indigo-500 rounded-lg shadow-2xl">
                        <p className="w-[100px] h-[30px] text-center">Private</p>
                    </button>
                    <button onClick={()=> {protectedMood(Obj,SetObj);}} id="Protected1" className="relative w-[17%] h-[30px] flex left-[35%] bg-indigo-500 rounded-lg shadow-2xl">
                        <p className=" w-[100px] h-[30px]text-center">protected</p>
                    </button>
                </div>
                <form>
                    <input id="Username1"  className="relative h-[30px] left-1/2 transform -translate-x-1/2 top-[75px] rounded-md shadow-2xl bg-indigo-500" type='text' placeholder="username..."></input>
                </form>
                <form>
                    <input id="password1" className="relative h-[30px] left-1/2 transform -translate-x-1/2 top-[100px] rounded-md shadow-2xl bg-indigo-500" type='text' placeholder="password..."></input>
                </form>
                <button onClick={()=> {CreateGroupRoom(Obj);}} id="Create1" className="relative w-[125px] h-[40px] top-[150px] left-[calc(50%-62.5px)] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500 bg-blue-500 hover:bg-blue-700 rounded-md shadow-2xl">Create</button>
            </div>
        </div>
    );
}

export default GroupSettings;