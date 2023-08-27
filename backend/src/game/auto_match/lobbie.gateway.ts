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
  import { Socket } from 'socket.io';
  import { RoomClass } from './auto_match_class/RoomClass';
  import { OnlineClass } from './auto_match_class/OnlineClass';
  import {
    RoomSettingsEntity,
    UserInfo,
    UserInfo1,
  } from '../PingPong.Entity';
import { OnlineLogic } from './Functions/Online';
import { RequestRefusedLogic } from './Functions/RequestRefused';
import { CreateRoomLogic } from './Functions/CreateRoom';
import { JoinPublicRoomLogic } from './Functions/JoinPublicRoom';
import { JoinPrivateRoomLogic } from './Functions/JoinPivateRoom';
import { GetRoomsLogic } from './Functions/GetRooms';
import { ConectionClosedLogic, DisconnectLogic } from './Functions/Disconnect_ConnectionClosed';
  
  export let Rooms: RoomClass[] = [];
  export let Online: OnlineClass[] = [];
  @WebSocketGateway(1339, {
    cors: { origin: '*', credentials: true },
  })
  export class PingPongGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    
    @SubscribeMessage('Online')
    handleOnline(client: Socket, username:string ): void
    {
      OnlineLogic(client,username);
    }

    @SubscribeMessage('RequestRefused')
    handleRequestRefused(client: Socket,targrt:string): void
    {
      RequestRefusedLogic(targrt);
    }

    @SubscribeMessage('CreateRoom')
    handleCreateRoom(client: Socket, data: RoomSettingsEntity): void
    {
      CreateRoomLogic(client,data);
    }

    @SubscribeMessage('JoinPublicRoom')
    handleJoinPublicRoom(client: Socket, data: UserInfo): void
    {
      JoinPublicRoomLogic(client,data);
    }
    @SubscribeMessage('JoinPrivateRoom')
    handleJoinPrivateRoom(client: Socket, data: UserInfo1): void 
    {
      JoinPrivateRoomLogic(client,data);
    }

    @SubscribeMessage('GetRooms')
    handleGetRooms(client: Socket): void
    {
      GetRoomsLogic(client);
    }
    @SubscribeMessage('conection_closed')
    handleconection_closed(client: Socket): void {
      Rooms = ConectionClosedLogic(client);
      console.log("Remove Old Room");
      console.log(Rooms);
      }
    handleDisconnect(client: Socket): void {
      let obj:{Rooms:RoomClass[],Online:OnlineClass[]} = {Rooms:[new RoomClass(),],Online:[new OnlineClass(),]};
      obj = DisconnectLogic(client);
      Rooms = obj.Rooms;
      Online = obj.Online;
      console.log(Rooms);
    }
  }
  