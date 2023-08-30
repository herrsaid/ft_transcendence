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
  
  export let Rooms: RoomClass[] = [];
  export let Online: OnlineClass[] = [];
  @WebSocketGateway(1339, {
    cors: { origin: '*', credentials: true },
  })

  @UseFilters(new WebSocketGateWayFilter())
  @UsePipes(new ValidationPipe())
  export class PingPongGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    
    @SubscribeMessage('Online')
    handleOnline(@ConnectedSocket() client: Socket, @MessageBody() data:OnlineDTO ): void
    {
      OnlineLogic(client,data.username);
    }

    @SubscribeMessage('RequestRefused')
    handleRequestRefused(@ConnectedSocket() client: Socket, @MessageBody() data:RequestRefusedDTO): void
    {
      RequestRefusedLogic(data.targrt);
    }

    @SubscribeMessage('CreateRoom')
    handleCreateRoom(@ConnectedSocket() client: Socket, @MessageBody() data: RoomSettings): void
    {
      try
      {
          CreateRoomLogic(client,data);
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
          JoinPublicRoomLogic(client,data);
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
      GetRoomsLogic(client);
    }
    @SubscribeMessage('conection_closed')
    handleconection_closed(client: Socket): void {
      Rooms = ConectionClosedLogic(client);
      // console.log("Remove Old Room");
      // console.log(Rooms);
      }
    handleDisconnect(client: Socket): void {
      let obj:{Rooms:RoomClass[],Online:OnlineClass[]} = {Rooms:[new RoomClass(),],Online:[new OnlineClass(),]};
      obj = DisconnectLogic(client);
      Rooms = obj.Rooms;
      Online = obj.Online;
      // console.log(Rooms);
    }
  }
  