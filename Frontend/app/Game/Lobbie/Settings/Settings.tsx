/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Settings.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:18 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 08:51:25 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'

import { useEffect } from 'react';
import { player1 } from '../../../Game/Online/Socket/start_game_socket'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import './Settings.css';


export let Access: number = 0,RoomNumber:number = 0;
function SpectatorMood(Room: number, router: AppRouterInstance)
{
  Access = 1;
  RoomNumber = Room;
    router.replace(`/Game/Online`);
}

function  GetNumberOfRooms(router: AppRouterInstance)
{
  player1.emit('LoadRooms');
  player1.on('LoadRooms',(Room: number)=>
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