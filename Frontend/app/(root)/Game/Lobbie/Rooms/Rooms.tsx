'use client'

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


import { useEffect,useContext } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import './Rooms.css';
import UserContext from "@/app/(root)/UserContext";
import { GetGameInfoContext, GameContextType, GameInfoType } from '../../GameContext/GameContext';
import { player1,player2 } from "../../Online/Socket/start_game_socket";
import { socket } from '../../Online/Socket/auto_match_socket';
import { InGame } from '@/app/(root)/Components/Notification/Notification';
import { useToast } from '@chakra-ui/react';

let newGameInfo:GameInfoType;
let access:boolean = false; 

function JoinToRoom(Room: number, router: AppRouterInstance,GameContext:GameContextType,toast:any)
{
  // console.log("button-pressed");
  let roomNumber = Room+1;
  newGameInfo.myusername = GameContext.GameInfo.myusername;
  newGameInfo.myimage = GameContext.GameInfo.myimage;
  let username = newGameInfo.myusername;
  let myimage = newGameInfo.myimage;
  socket.emit('JoinPublicRoom',{roomNumber,username,myimage});
  socket.on('SendData', (username,playerimg,data) => {
    if(access)
    {
      newGameInfo.enemmyusername = username;
      newGameInfo.enemmyimage = playerimg;
      newGameInfo.host = data;
    }
  });
  socket.on('JoinAccepted',(speed:number,points: number)=>
  {
    if(access)
    {
      newGameInfo.Access=1;
      newGameInfo.Speed = speed;
      newGameInfo.Points = points;
      GameContext.SetGameInfo(newGameInfo);
      // console.log("conection_closed on room");
      // socket.emit('conection_closed');
      router.replace(`/Game/Online/Play`);
    }
  });
  socket.on('JoinRefused',(data: string)=>
  {
    if(access)
      toast({title: 'Error',description: data,position: 'top-right',status: 'error',duration: 5000,isClosable: true,});
  });
}
async function  GetNumberOfRooms(router: AppRouterInstance,GameContext:GameContextType,toast:any)
{
  socket.emit('GetRooms');
  await socket.on('GetRooms',(Room: number)=>
  {
    if(access)
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
          element_btn.onclick= ()=>
          {
            // InGame
            if(InGame.IG === false && InGame.IL === false)
            {
              JoinToRoom(a,router,GameContext,toast);
            }
            else
            {
              toast({title: 'Error',description: "complete your match first",position: 'top-right',status: 'error',duration: 5000,isClosable: true,});
            }
          };
          element.appendChild(element_btn);
          Rooms.appendChild(element);
        }
      }
    }
  });
}

export default function Rooms() {
  const GameContext = GetGameInfoContext();
  const contexUser = useContext(UserContext);
  const router: AppRouterInstance = useRouter();
  const toast = useToast();
  useEffect(()=>
  {
    let BottomNav:HTMLElement| null = document.getElementById('BottomNav');
    let LeftNav:HTMLElement| null = document.getElementById('LeftNav');

    if(BottomNav && LeftNav)
    {
      BottomNav.style.display = "block";
      LeftNav.style.display = "none";
    }
    // console.log('user re-enter rooms page');
    player1.emit('conection_closed');
    player2.emit('conection_closed');
    socket.emit('conection_closed');
    newGameInfo = {
      Points: 10,
      Speed: 4,
      pause_game: 0,
      RoomMood: 1,
      other_tools: 0,
      host: false,
      Online: 1,
      Access:0,
      myusername: "Player I",
      enemmyusername: "Player II",
      myimage: "/2.jpg",
      enemmyimage: "/3.jpg",
    };
    newGameInfo.myusername = contexUser.user.username;
    if (contexUser.user.is_profile_img_updated)
      newGameInfo.myimage=process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + contexUser.user.profile_img;
    else
      newGameInfo.myimage=contexUser.user.profile_img;
    return ()=> 
    {
      if(BottomNav && LeftNav)
      {
        BottomNav.style.display = "none";
        LeftNav.style.display = "block";
      }
    };
  },[]);
  useEffect(()=>
  {
    let interval: NodeJS.Timer  = setInterval(()=>{GetNumberOfRooms(router,GameContext,toast);},1000); 
    access = true;
    return ()=> 
    {
      access = false;
      clearInterval(interval);
    };
  });
    return (
      <div className="container mx-auto px-2 py-[20px] text-center items-center ">
        <div className="mx-auto">
          <div id="Rooms" className="overflow-y-auto rounded-md p-6 h-[300px] mb-[40px] shadow-2xl" >
          </div>
          <div onClick={()=>{router.replace('/Game/Lobbie/CreateRoom');}} id="CreateRoom">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block font-semibold w-[200px] shadow-2xl shadow-blue-500 hover:shadow-blue-600 " >Create Room</button>
          </div>
          <div onClick={()=>{router.replace('/Stream');}} id="WatchStream">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 mt-3 rounded-md inline-block font-semibold w-[200px] shadow-2xl shadow-blue-500 hover:shadow-blue-600 " >Watch Stream</button>
          </div>
        </div>
      </div>
    )
  }