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
  import { Player1Arr, server1 } from './play.player1.gateway'
  export let Player2Arr: string[] = [];
  export let server2: Server;
  @WebSocketGateway(1341, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayPlayer2Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket): void {
      if (
        Player2Arr.find((elem) => elem === client.id) === undefined ||
        Player2Arr.length === 0
      )
        Player2Arr.push(client.id);
      console.log('Player2Arr_content: ', Player2Arr);
    }
    @SubscribeMessage('send_player2_data')
    handleSendUser2Data(client: Socket, data: number): void {
      server2 = this.server;
      const socket: Socket = getSocketById(Player1Arr[0], server1);
      if (socket != undefined) {
        socket.emit('send_player1_data', data);
      }
    }
	@SubscribeMessage('conection_closed')
	handleconection_closed(client: Socket): void {
	  Player2Arr = Player2Arr.filter((elem) => elem !== client.id);
      console.log(client.id + ' leave party');
      console.log('Player2Arr_content: ', Player2Arr);

	}
    handleDisconnect(client: Socket): void {
      //  const socket: Socket = getSocketById(Player2Arr[0], this.server);
      //  const socket1: Socket = getSocketById(Player2Arr[1], this.server);
      //   if(socket !== undefined)
      //     socket.emit('conection_closed');
      //   if(socket1 !== undefined)
      //     socket1.emit('conection_closed');
      Player2Arr = Player2Arr.filter((elem) => elem !== client.id);
      console.log(client.id + ' leave party');
      console.log('Player2Arr_content: ', Player2Arr);
    }
  }
  