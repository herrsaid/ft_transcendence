import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import {
    GameUserSettingsEntity,
    PingPongGamePlayEntity,
  } from '../PingPong.Entity';
  import { Socket, Server } from 'socket.io';
  import { getSocketById } from '../auto_match/lobbie.gateway';
  
  const GameArr: string[] = [];
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket): void {
      if (
        GameArr.find((elem) => elem === client.id) === undefined ||
        GameArr.length === 0
      )
        GameArr.push(client.id);
      console.log('GameArr_content: ', GameArr);
    }
    @SubscribeMessage('send_user1_data')
    handleSendUser1Data(client: Socket, data: object): void {
      const socket: Socket = getSocketById(GameArr[1], this.server);
      if (socket != undefined) {
        socket.emit('send_user2_data', data);
        console.log('here1 ' + data + ' ' + GameArr[1]);
      }
    }
    @SubscribeMessage('send_user2_data')
    handleSendUser2Data(client: Socket, data: number): void {
      const socket: Socket = getSocketById(GameArr[0], this.server);
      if (socket != undefined) {
        socket.emit('send_user1_data', data);
        console.log('here2 ' + data + ' ' + GameArr[0]);
      }
    }
    handleDisconnect(client: Socket): void {
      GameArr.splice(GameArr.findIndex((str) => str === client.id));
      console.log('old User leave party');
      console.log('GameArr_content: ', GameArr);
    }
  }
  