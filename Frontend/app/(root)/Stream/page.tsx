'use client'

import { useEffect } from 'react';
import { player1 } from '../../(root)/Game/Online/Socket/start_game_socket'
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
  player1.emit('LoadStream');
  player1.on('LoadStream',(Room: number)=>
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
    setInterval(()=>{GetNumberOfRooms(router);},1000);
  });
    return (
      <div className="container mx-auto px-2 py-[250px] text-center items-center ">
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