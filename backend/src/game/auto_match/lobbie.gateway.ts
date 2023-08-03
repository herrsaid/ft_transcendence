/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lobbie.gateway.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:26:31 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 10:28:35 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { RoomClass } from './auto_match_class/RoomClass';
  import { PlayerClass } from  './auto_match_class/PlayerClass';
  import {
    GameUserSettingsEntity,
    PingPongGamePlayEntity,
  } from '../PingPong.Entity';
  
  export let Rooms: RoomClass[] = [];
  @WebSocketGateway(1339, {
    cors: { origin: '*', credentials: true },
  })
  export class PingPongGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    
    @SubscribeMessage('CreateRoom')
    handleCreateRoom(client: Socket, data: GameUserSettingsEntity): void {
      let player_data:PlayerClass;
      player_data.Player = data.myusername;
      player_data.PlayerId = client.id;
      player_data.PlayerSocket = client;
      let check:RoomClass = Rooms.find(elem => elem.Points === data.Points && elem.Speed === data.Speed);
      if(check !== undefined)
      {
        if(check.players.find(elem => elem.PlayerId === client.id) !== undefined) 
          return;
        else
          console.log("Push New User");
        check.players.push(player_data);
      }
      else
      {
        let Room:RoomClass;
        Room.players.push(player_data);
        Room.Speed = data.Speed;
        Room.Points = data.Points;
        Rooms.push(Room);
        console.log("Push New Room");
      }
    }
    @SubscribeMessage('JoinUser')
    handleJoinUser(client: Socket, RoomNumber: number,Username:string): void {
      if(Rooms[RoomNumber])
      {
        let player_data:PlayerClass;
        player_data.Player = Username;
        player_data.PlayerId = client.id;
        player_data.PlayerSocket = client;
        if(Rooms[RoomNumber].players.length < 2)
        {
          Rooms[RoomNumber].players.push(player_data);
          client.emit('JoinAccepted',Rooms[RoomNumber].Speed,Rooms[RoomNumber].Points);
        }
          else
          client.emit('JoinRefused','Room is full or already in match');
      }
      if(Rooms[RoomNumber].players.length === 2)
      {
        Rooms[RoomNumber].players[0].PlayerSocket.emit('SendData',Rooms[RoomNumber].players[1].Player,true);
        Rooms[RoomNumber].players[1].PlayerSocket.emit('SendData',Rooms[RoomNumber].players[0].Player,false);
      }
    }
    @SubscribeMessage('GetRooms')
    handleGetRooms(client: Socket): void
    {
      client.emit('GetRooms',Rooms.length);
    }
    handleDisconnect(client: Socket): void {
      for(let a = 0;a<Rooms.length; a++)
      {
        Rooms[a].players = Rooms[a].players.filter(player => player.PlayerSocket !== client)
        break;
      }
      Rooms = Rooms.filter(elem => elem.players.length !== 0);
    }
  }
  