/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lobbie.gateway.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:26:31 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 09:48:34 by mabdelou         ###   ########.fr       */
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
      
    }
    @SubscribeMessage('JoinUser')
    handleJoinUser(client: Socket, Room: number): void {
      // let player_data:PlayerClass;
      // player_data.Player = data.myusername;
      // player_data.PlayerId = client.id;
      // player_data.PlayerSocket = client;
      // let check:RoomClass = Rooms.find(elem => elem.Points === data.Points && elem.Speed === data.Speed);
      // if(check !== undefined)
      // {
      //   if(check.players.find(elem => elem.PlayerId === client.id) !== undefined) 
      //     return;
      //   else
      //     console.log("Push New User");
      //   check.players.push(player_data);
      // }
      // else
      // {
      //   let Room:RoomClass;
      //   Room.players.push(player_data);
      //   Room.Speed = data.Speed;
      //   Room.Points = data.Points;
      //   Rooms.push(Room);
      //   console.log("Push New Room");
      // }
    }
    @SubscribeMessage('SendData')
    handleSendData(client: Socket): void {

              // getSocketById(elem.ID, this.server).emit('send_data', arr[1].myusername,true);
              // getSocketById(elem1.ID, this.server).emit('send_data',  arr[0].myusername,false);
    }
    // @SubscribeMessage('leave_user')
    handleDisconnect(client: Socket): void {
    }
  }
  