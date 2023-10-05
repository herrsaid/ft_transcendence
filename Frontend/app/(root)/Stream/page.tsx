'use client'

import { useEffect } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import './style/style.css';
import {StreamInfoType,GetStreamInfoContext, StreamContextType} from '../Stream/StreamContext/StreamContext'
import { stream } from './Socket/start_stream_socket';
import { player1, player2 } from '../Game/Online/Socket/start_game_socket';
import { socket } from '../Game/Online/Socket/auto_match_socket';
import { GameContextType, GetGameInfoContext } from '../Game/GameContext/GameContext';
import { useToast } from '@chakra-ui/react';


let NewStreamInfo:StreamInfoType = new StreamInfoType;

function SpectatorMood(toast:any,MyUserName:String,Room: number, router: AppRouterInstance,StreamContext:StreamContextType)
{
  NewStreamInfo.RoomNumber = Room;
  stream.emit("new_spectator",{RoomNumber: StreamContext.StreamInfo.RoomNumber,User:MyUserName});
  stream.on("LoadStreamFail",(message: string)=>
  {
    toast.closeAll();
    toast({title: 'Error',description: message,position: 'top-right',status: 'error',duration: 5000,isClosable: true,});
    NewStreamInfo.Access = 0;
      
  });
  stream.on("InvalidData",(message: string)=>
  {
    toast.closeAll();
    toast({title: 'Error',description: message,position: 'top-right',status: 'error',duration: 5000,isClosable: true,});
    NewStreamInfo.Access = 0;
      
  });
  stream.on("LoadStreamAccept",()=>
  {
    NewStreamInfo.Access = 1;
    StreamContext.SetStreamInfo(NewStreamInfo);
    router.replace(`/Stream/Room${Room+1}`);
  })
}

function  GetNumberOfRooms(router: AppRouterInstance,toast:any,MyUserName:String,StreamContext:StreamContextType)
{
  stream.emit('LoadStream');
  stream.on('LoadStream',(Room: number)=>
  {
    let Rooms = document.getElementById('Rooms');
    if( Room === 0 && Rooms)
      Rooms.innerHTML = '<p> No Streams available for now </p>';
    else if(Rooms)
    {
      Rooms.innerHTML = '';
      for(let a=0;a<Room;a++)
      {
        let element:HTMLElement = document.createElement("div");
        let element_btn:HTMLElement = document.createElement("button");
        element.innerHTML = `<p> Room Number: ${a+1}`;
        element_btn.innerHTML = '<p>Watch</p>';
        element.setAttribute("id",`Room`);
        element_btn.setAttribute("id",`Watch`);
        element_btn.onclick= ()=>{SpectatorMood(toast,MyUserName,a,router,StreamContext)};
        element.appendChild(element_btn);
        Rooms.appendChild(element);
      
      }
    }
  });
}

export default function Stream() {
  const StreamContext:StreamContextType = GetStreamInfoContext();
  const GameContext:GameContextType = GetGameInfoContext();
  const router: AppRouterInstance = useRouter();
  const toast = useToast();
  useEffect(()=>
  {
    let interval:NodeJS.Timer = setInterval(()=>{GetNumberOfRooms(router,toast,GameContext.GameInfo.myusername,StreamContext);},1000);
    return ()=> 
    {
      clearInterval(interval);
    };
  });
  useEffect(()=>
  {
    let BottomNav:HTMLElement| null = document.getElementById('BottomNav');
    let LeftNav:HTMLElement| null = document.getElementById('LeftNav');
    if(BottomNav && LeftNav)
    {
        BottomNav.style.display = "block";
        LeftNav.style.display = "none";
    }
    // console.log('user re-enter stream page');
    player1.emit('conection_closed');
    player2.emit('conection_closed');
    socket.emit('conection_closed');
    NewStreamInfo = new StreamInfoType;
    return()=>
    {
        // if(BottomNav && LeftNav)
        // {
        //     BottomNav.style.display = "none";
        //     LeftNav.style.display = "block";
        // }
    };
  },[]);
    return (
      <div className="container mx-auto px-2 py-[20px] text-center items-center ">
        <div className="mx-auto">
          <div id="Rooms" className="overflow-y-auto rounded-md p-6 h-[300px] mb-[40px] shadow-2xl" >
          </div>
          <div onClick={()=>{router.replace('/Game/Lobbie/CreateRoom');}} id="CreateRoom">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block font-semibold w-[200px] shadow-2xl shadow-blue-500 hover:shadow-blue-600 "> Create Room </button>
          </div>
        </div>
      </div>
    )
  }