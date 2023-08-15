/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Rooms.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:18 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 18:42:31 by mabdelou         ###   ########.fr       */
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
export let myimage2: string | null = null;
export let enemmyimage2: string | null = null;
async function JoinToRoom(Room: number, router: AppRouterInstance)
{
  RoomNumber = Room+1;
  let Username = myusername2;
  let myimage = myimage2;
  socket.emit('JoinUser',{RoomNumber,Username,myimage});
  await socket.on('SendData', (username,playerimg,data) => {
    enemmyusername2 = username;
    enemmyimage2 = playerimg
    host2 = data;
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
    console.log(data);
  });
}
async function  GetNumberOfRooms(router: AppRouterInstance)
{
  socket.emit('GetRooms');
  await socket.on('GetRooms',(Room: number)=>
  {
    let Rooms = document.getElementById('Rooms');
    if( Room === 0 && Rooms)
    {
      Rooms.innerHTML = '<p > No Rooms available for now </p>';
    }
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
    if (contexUser.user.is_profile_img_updated)
        myimage2 = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + contexUser.user.profile_img;
    else
        myimage2 = contexUser.user.profile_img;
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block font-semibold w-[200px] shadow-2xl shadow-blue-500 hover:shadow-blue-600 " >Create Room</button>
          </div>
        </div>
      </div>
    )
  }