'use client'

import { useEffect } from 'react';
import { player1 } from '../Game/Online/Socket/start_game_socket'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import './style/style.css';


export let Access: number = 0,RoomNumber:number = 0;
function SpectatorMood(Room: number, router: AppRouterInstance)
{
  Access = 1;
  RoomNumber = Room;
    router.replace(`/Stream/Room${Room+1}`);
}

function  GetNumberOfRooms(router: AppRouterInstance)
{
  console.log("here");
  player1.emit('LoadStream');
  player1.on('LoadStream',(Room: number)=>
  {
    console.log(Room);
    let Rooms = document.getElementById('Rooms');
    if(Rooms)
    {
      console.log("inside Rooms");
      for(let a=0;a<Room;a++)
      {
        if(a === 0)
        console.log("inside Loop");
        let element:HTMLElement = document.createElement("div");
        let element_btn:HTMLElement = document.createElement("button");
        element.innerHTML = `<p> Room Number: ${a+1}`;
        element_btn.innerHTML = '<p>Watch</p>';
        element.setAttribute("id",`Room`);
        element_btn.setAttribute("id",`Watch`);
        element_btn.onclick= ()=>{SpectatorMood(a,router)};
        element.appendChild(element_btn);
        Rooms.appendChild(element);
      
      }
    }
  });
}

export default function Stream() {
  const router: AppRouterInstance = useRouter();
  useEffect(()=>
  {
    GetNumberOfRooms(router);
  },[]);
    return (
        <div id="Rooms">
        </div>
    )
  }