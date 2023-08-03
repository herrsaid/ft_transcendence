/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Rooms.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:18 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 17:44:36 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'

import { useEffect } from 'react';
import { socket } from '../../Online/Socket/auto_match_socket'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import './Rooms.css';

export let Points: number = 0;
export let Speed: number = 0;
export let Access: number = 0,RoomNumber:number = 0;
export let myusername = sessionStorage.getItem('username');
function SpectatorMood(Room: number, router: AppRouterInstance)
{
  Access = 1;
  RoomNumber = Room+1;
  socket.emit('JoinUser',{RoomNumber,myusername,});
  socket.on('JoinAccepted',(speed:number,points: number)=>
  {
    Speed = speed;
    Points = points;
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
    console.log(Room);
    let Rooms = document.getElementById('Rooms');
    if(Rooms)
    {
      for(let a=0;a<Room;a++)
      {
        let element:HTMLElement = document.createElement("div");
        let element_btn:HTMLElement = document.createElement("button");
        element.innerHTML = `<p> Room Number: ${a+1}`;
        element_btn.innerHTML = '<p>Join</p>';
        element.setAttribute("id",`Room`);
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
    GetNumberOfRooms(router);
  },[]);
    return (
        <div id="Rooms">
        </div>
    )
  }