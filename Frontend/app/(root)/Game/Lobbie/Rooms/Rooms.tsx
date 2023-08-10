/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Rooms.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:18 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/10 13:26:44 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'

import { useEffect } from 'react';
import { socket } from '../../Online/Socket/auto_match_socket'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import './Rooms.css';
import { useContext } from 'react';
import UserContext from "@/app/(root)/UserContext";

export let host2: boolean = false;
export let Points2: number = 0;
export let Speed2: number = 0;
export let Access2: number = 0,RoomNumber:number = 0;
export let myusername2: string | null = null;
export let enemmyusername2: string | null = null;
async function JoinToRoom(Room: number, router: AppRouterInstance)
{
  RoomNumber = Room+1;
  let Username = myusername2;
  socket.emit('JoinUser',{RoomNumber,Username,});
  await socket.on('SendData', (username,data) => {
    enemmyusername2 = username;
    host2 = data;
    console.log("data: "+enemmyusername2+" "+data);
  });
  await socket.on('JoinAccepted',(speed:number,points: number)=>
  {
    Access2 = 1;
    Speed2 = speed;
    Points2 = points;
    socket.disconnect();
    router.replace(`/Game/Online/Play`);
  });
  await socket.on('JoinRefused',(data: string)=>
  {
    console.log('herehere: '+data);
  });
}
async function  GetNumberOfRooms(router: AppRouterInstance)
{
  socket.emit('GetRooms');
  await socket.on('GetRooms',(Room: number)=>
  {
    let Rooms = document.getElementById('Rooms');
    if( Room === 0 && Rooms)
      Rooms.innerHTML = '<p> No Rooms available for now </p>';
    else if(Rooms)
    {
      Rooms.innerHTML = '';
      for(let a=0;a<Room;a++)
      {
        let element:HTMLElement = document.createElement("div");
        let element_btn:HTMLElement = document.createElement("button");
        element.innerHTML = `<p> Room Number: ${a+1}`;
        element_btn.innerHTML = '<p>Join</p>';
        element.setAttribute("class",`Room`);
        element_btn.setAttribute("id",`Join`);
        element_btn.onclick= ()=>{JoinToRoom(a,router)};
        element.appendChild(element_btn);
        Rooms.appendChild(element);
      }
    }
  });
}

export default function Rooms() {
  const router: AppRouterInstance = useRouter();
  const contexUser = useContext(UserContext);
  myusername2 = contexUser.user.username;
  useEffect(()=>
  {
    setInterval(()=>{GetNumberOfRooms(router);},1000);
  });
    return (
      <div className="container mx-auto px-2 py-10">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div id="Rooms" className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[450px]" >
          </div>
          <div onClick={()=>{router.replace('/Game/Lobbie/CreateRoom');}} id="CreateRoom">
              <button className="bg-white text-blue-400 font-semibold py-2 px-4 rounded-lg inline-block"> Create Room </button>
          </div>
        </div>
      </div>
    )
  }