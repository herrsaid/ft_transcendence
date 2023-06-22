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
} from './PingPong.Entity';

export const arr: GameUserSettingsEntity[] = [];
export const GameArr: PingPongGamePlayEntity[] = [];
export function getSocketById(
  socketId: string,
  server: Server,
): Socket | undefined {
  return server.sockets.sockets.get(socketId);
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
    // console.log(data.Speed);
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
            // const u1: PingPongGamePlayEntity = {
            //   ballxpos: 0,
            //   ballypos: 0,
            //   ping1ypos: 0,
            //   ping2ypos: 0,
            //   result1: 0,
            //   result2: 0,
            //   ID: '',
            //   obj: elem,
            // };
            // GameArr.push(u1);
            // u1.obj = elem1;
            // GameArr.push(u1);
            // console.log(GameArr);
          }
        }
      }
    }
    console.log('arr_content: ', arr);
  }
  @SubscribeMessage('leave_user')
  handleDisconnect(client: Socket): void {
    arr.splice(arr.findIndex((elm) => elm.ID === client.id));
    // client.emit('leave_user', 'old User leave party ');
    console.log('old User leave party');
    console.log('arr_content: ', arr);
  }
}