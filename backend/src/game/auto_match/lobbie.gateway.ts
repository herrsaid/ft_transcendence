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


import * as dotenv from 'dotenv';
dotenv.config();

import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Socket } from 'socket.io';
  import { RoomClass } from './auto_match_class/RoomClass';
  import { OnlineClass } from './auto_match_class/OnlineClass';
  import {
    OnlineDTO,
    RequestRefusedDTO,
    RoomSettings,
    UserInfo,
    UserInfo1,
  } from '../PingPong.dto';
import { OnlineLogic } from './Functions/Online';
import { RequestRefusedLogic } from './Functions/RequestRefused';
import { CreateRoomLogic } from './Functions/CreateRoom';
import { JoinPublicRoomLogic } from './Functions/JoinPublicRoom';
import { JoinPrivateRoomLogic } from './Functions/JoinPivateRoom';
import { GetRoomsLogic } from './Functions/GetRooms';
import { ConectionClosedLogic, DisconnectLogic } from './Functions/Disconnect_ConnectionClosed';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebSocketGateWayFilter } from '../PingPong.filter';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';

const jwt = require('jsonwebtoken');

  export let Rooms: RoomClass[] = [];
  export let Online: OnlineClass[] = [];
  @WebSocketGateway(1339, {
    cors: { origin: '*', credentials: true },
  })

  @UseFilters(new WebSocketGateWayFilter())
  @UsePipes(new ValidationPipe())
  export class PingPongGateway implements OnGatewayDisconnect {
    constructor(private UserManager:UserService,private jwtService: JwtService)
    {
      
    };

    async handleConnection(socket: Socket)
    {
      try{
        const token = socket.handshake.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        
      }catch(error){
        socket.disconnect(); 
      }
    }
    @SubscribeMessage('Online')
    async handleOnline(@ConnectedSocket() client: Socket, @MessageBody() data:OnlineDTO ): Promise<void>
    {
      try
      {
        await OnlineLogic(client,data.username,this.UserManager);
      }
      catch(error)
      {
        console.log("error");
      }
    }

    @SubscribeMessage('RequestRefused')
    handleRequestRefused(@ConnectedSocket() client: Socket, @MessageBody() data:RequestRefusedDTO): void
    {
      try
      {
        RequestRefusedLogic(data.targrt);
      }
      catch(error)
      {
        console.log("error");
      }
    }

    @SubscribeMessage('CreateRoom')
    handleCreateRoom(@ConnectedSocket() client: Socket, @MessageBody() data: RoomSettings): void
    {
      try
      {
          CreateRoomLogic(client,data,this.UserManager);
      }
      catch(error)
      {
          client.emit('CreateRefused', 'Invalid data');
      }
    }

    @SubscribeMessage('JoinPublicRoom')
    handleJoinPublicRoom(@ConnectedSocket() client: Socket, @MessageBody() data: UserInfo): void
    {
      try
      {
          JoinPublicRoomLogic(client,data,this.UserManager);
      }
      catch(error)
      {
          client.emit('JoinRefused', 'Invalid data');
      }
    }
    @SubscribeMessage('JoinPrivateRoom')
    handleJoinPrivateRoom(@ConnectedSocket() client: Socket, @MessageBody() data: UserInfo1): void 
    {
      try
      {
          JoinPrivateRoomLogic(client,data);
      }
      catch(error)
      {
          client.emit('JoinRefused', 'Invalid data');
      }
    }

    @SubscribeMessage('GetRooms')
    handleGetRooms(client: Socket): void
    {
      try
      {
        GetRoomsLogic(client);
      }
      catch(error)
      {
        console.log("error");
      }
    }
    @SubscribeMessage('conection_closed')
    handleconection_closed(client: Socket): void {
      try
      {
        Rooms = ConectionClosedLogic(client);
      }
      catch(error)
      {
        console.log("error");
      }
      // console.log("Remove Old Room");
      // console.log(Rooms);
      }
    async handleDisconnect(client: Socket): Promise<void> {
      try
      {
        let obj:{Rooms:RoomClass[],Online:OnlineClass[]} = {Rooms:[new RoomClass(),],Online:[new OnlineClass(),]};
        obj =  await DisconnectLogic(client,this.UserManager);
        Rooms = obj.Rooms;
        Online = obj.Online;
      }
      catch(error)
      {
        console.log("error");
      }
      // console.log(Rooms);
    }
  }
  