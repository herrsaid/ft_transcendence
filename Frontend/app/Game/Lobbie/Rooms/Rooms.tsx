/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Rooms.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:18 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/04 11:51:16 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'

import { useEffect } from 'react';
import { socket } from '../../Online/Socket/auto_match_socket'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import './Rooms.css';

export let host2: boolean = false;
export let Points2: number = 0;
export let Speed2: number = 0;
export let Access2: number = 0,RoomNumber:number = 0;
export let myusername2 = sessionStorage.getItem('username');
export let enemmyusername2: string | null = null;
function SpectatorMood(Room: number, router: AppRouterInstance)
{
  RoomNumber = Room+1;
  let Username = myusername2;
  socket.emit('JoinUser',{RoomNumber,Username,});
  socket.on('SendData', (username,data) => {
    enemmyusername2 = username;
    host2 = data;
    console.log("data: "+enemmyusername2+" "+data);
  });
  socket.on('JoinAccepted',(speed:number,points: number)=>
  {
    Access2 = 1;
    Speed2 = speed;
    Points2 = points;
    socket.disconnect();
    router.replace(`/Game/Online/Play`);
  });
  socket.on('JoinRefused',(data: string)=>
  {
    console.log(data);
  });
}
function  GetNumberOfRooms(router: AppRouterInstance)
{
  socket.emit('GetRooms');
  socket.on('GetRooms',(Room: number)=>
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
        element_btn.onclick= ()=>{SpectatorMood(a,router)};
        element.appendChild(element_btn);
        Rooms.appendChild(element);
      }
    }
  });
}

export default function Rooms() {
  const router: AppRouterInstance = useRouter();
  useEffect(()=>
  {
    setInterval(()=>{GetNumberOfRooms(router);},1000);
  });
    return (
      <>
        <div id="Rooms">
        </div>
        <div onClick={()=>{router.replace('/Game/Lobbie/CreateRoom');}} id="CreateRoom">
            <button> Create Room </button>
        </div>
      </>
    )
  }