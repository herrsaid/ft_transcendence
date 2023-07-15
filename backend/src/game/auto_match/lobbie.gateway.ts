import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import {
    GameUserSettingsEntity,
    PingPongGamePlayEntity,
  } from '../PingPong.Entity';
  
  export let arr: GameUserSettingsEntity[] = [];
  export const GameArr: PingPongGamePlayEntity[] = [];
  export function getSocketById(
    socketId: string,
    server: Server,
  ): Socket | undefined {
    if(socketId !== undefined && server != undefined)
      return server.sockets.sockets.get(socketId);
    return undefined;
  }
  @WebSocketGateway(1339, {
    cors: { origin: '*', credentials: true },
  })
  export class PingPongGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('join_user')
    handleJoinUser(client: Socket, data: string): void {
      if (arr.find((elm) => elm.ID === client.id)) return;
      else {
        console.log('user_joined: ', data);
      }
    }
    @SubscribeMessage('send_data')
    handleSendData(client: Socket, data: GameUserSettingsEntity): void {
      data.ID = client.id;
      data.UsedStatus = false;
      if (arr.find((elm) => elm.ID === client.id)) {
        arr[arr.findIndex((elm) => elm.ID === client.id)] = data;
        console.log('update');
      } else {
        arr.push(data);
        console.log('push');
        for (let a = 0; a < arr.length; a++) {
          getSocketById(arr[a].ID, this.server).emit(
            'join_user',
            'new User join party',
          );
        }
      }
      if (arr.length >= 2) {
        for (let a = 0; a < arr.length; a++) {
          if (arr[a].UsedStatus === false) {
            const elem = arr[a];
            const elem1 = arr.find((elm) => {
              if (
                elm.UsedStatus === false &&
                elm.Speed === elem.Speed &&
                elm.MapNumber === elem.MapNumber &&
                elm.ID !== elem.ID
              )
                return elm;
            });
            if (elem1 != undefined) {
              console.log('data_has_been_send: ');
              getSocketById(elem.ID, this.server).emit('send_data', true);
              getSocketById(elem1.ID, this.server).emit('send_data', false);
              elem.UsedStatus = true;
              elem1.UsedStatus = true;
            }
          }
        }
      }
      console.log('arr_content: ', arr);
    }
    @SubscribeMessage('leave_user')
    handleDisconnect(client: Socket): void {
      arr = arr.filter((elm) => elm.ID !== client.id);
      console.log(client.id + ' leave party');
      console.log('arr_content: ', arr);
    }
  }
  