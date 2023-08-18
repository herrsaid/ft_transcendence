/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lobbie.gateway.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:26:31 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 18:43:29 by mabdelou         ###   ########.fr       */
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
    RoomSettingsEntity,
    UserInfo,
    PingPongGamePlayEntity,
  } from '../PingPong.Entity';
  
  export let Rooms: RoomClass[] = [];
  @WebSocketGateway(1339, {
    cors: { origin: '*', credentials: true },
  })
  export class PingPongGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    
    @SubscribeMessage('CreateRoom')
    handleCreateRoom(client: Socket, data: RoomSettingsEntity): void {
      if(data.myusername === null)
      {
        client.emit('CreateRefused','please (log-in/sign-in) to accept your join');
        return ;
      }
      if(Rooms.find((elem)=> elem.players[0].Player === data.myusername) !== undefined)
      {
        client.emit('CreateRefused',"you can't Create two Rooms");
        return ;
      }
      // console.log(data);
      let player_data:PlayerClass = new PlayerClass;
      player_data.Player = data.myusername;
      player_data.PlayerImg = data.myimage;
      player_data.PlayerId = client.id;
      player_data.PlayerSocket = client;
      let check:RoomClass = Rooms.find(elem => elem.Points === data.Points && elem.Speed === data.Speed);
      if(check !== undefined && check.RoomMood !== false)
      {
        if(check.players.find(elem => elem.PlayerId === client.id) !== undefined)
          return ;
        else
          console.log("Push New User");
        check.players.push(player_data);
        check.players[0].PlayerSocket.emit('SendData',check.players[1].Player,check.players[1].PlayerImg,true);
        check.players[1].PlayerSocket.emit('SendData',check.players[0].Player,check.players[0].PlayerImg,false);
        console.log(Rooms);
        console.log("Launch Private Room");
        return;
      }
      else
      {
        let Room:RoomClass = new RoomClass;
        Room.players.push(player_data);
        Room.Speed = data.Speed;
        Room.Points = data.Points;
        Room.RoomMood = data.RoomMood;
        Rooms.push(Room);
        console.log("Push New Room");
      }
      console.log(Rooms);
    }
    @SubscribeMessage('JoinUser')
    handleJoinUser(client: Socket, data: UserInfo): void {
      let Public_Rooms= 0;
      for(let a = 0;a<Rooms.length;a++)
      {
        if(Rooms[a].RoomMood != false)
          Public_Rooms++;
        if(Public_Rooms == data.RoomNumber)
        {
          data.RoomNumber = a;
          break;
        }
      }
      if(Rooms[data.RoomNumber])
      {
        let player_data:PlayerClass = new PlayerClass;
        if(data.Username === null)
        {
          client.emit('JoinRefused','please (log-in/sign-in) to accept your join');
          return ;
        }
        else if (data.Username === Rooms[data.RoomNumber].players[0].Player)
        {
          client.emit('JoinRefused',"You can't Join to yourself");
          return ;
        }
        player_data.Player = data.Username;
        player_data.PlayerImg = data.myimage;
        player_data.PlayerId = client.id;
        player_data.PlayerSocket = client;
        if(Rooms[data.RoomNumber].players.length < 2)
        {
          Rooms[data.RoomNumber].players.push(player_data);
          console.log("Push New Room");
          Rooms[data.RoomNumber].players[0].PlayerSocket.emit(
            'SendData',Rooms[data.RoomNumber].players[1].Player,Rooms[data.RoomNumber].players[1].PlayerImg,true);
            Rooms[data.RoomNumber].players[1].PlayerSocket.emit(
              'SendData',Rooms[data.RoomNumber].players[0].Player,Rooms[data.RoomNumber].players[0].PlayerImg,false);
              client.emit('JoinAccepted',Rooms[data.RoomNumber].Speed,Rooms[data.RoomNumber].Points);
        }
        else
        {
          client.emit('JoinRefused','Room is full or already in match');
          return ;
        }
      }
      console.log(Rooms);
      console.log("Launch Public Room");
    }
    @SubscribeMessage('GetRooms')
    handleGetRooms(client: Socket): void
    {
      let Public_Rooms= 0;
      for(let a = 0;a<Rooms.length;a++)
        if(Rooms[a].RoomMood != false)
          Public_Rooms++;
      client.emit('GetRooms',Public_Rooms);
    }
    @SubscribeMessage('conection_closed')
    handleconection_closed(client: Socket): void {
        for(let a = 0;a<Rooms.length; a++)
          Rooms[a].players = Rooms[a].players.filter(player => player.PlayerSocket !== client);
        Rooms = Rooms.filter(elem => elem.players.length !== 0);
        console.log("Remove Old Room");
        console.log(Rooms);
      }
    handleDisconnect(client: Socket): void {
      for(let a = 0;a<Rooms.length; a++)
        Rooms[a].players = Rooms[a].players.filter(player => player.PlayerSocket !== client);
      Rooms = Rooms.filter(elem => elem.players.length !== 0);
      console.log("Remove Old Room");
      console.log(Rooms);
    }
  }
  