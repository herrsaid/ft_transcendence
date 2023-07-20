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
  import { Player2Arr, server2 } from './play.player2.gateway';
  import { GameHead } from '../game_brain/game_server_logic';
  export let Player1Arr: string[] = [];
  export let server1: Server;
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayPlayer1Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket): void {
      if (
        Player1Arr.find((elem) => elem === client.id) === undefined ||
        Player1Arr.length === 0
      )
        Player1Arr.push(client.id);
      console.log('Player1Arr_content: ', Player1Arr);
    }
    @SubscribeMessage('send_player1_data')
    handleSendUser1Data(client: Socket, data: number): void {
      server1 = this.server;
      GameHead.SetRacket1Ypos(data);
      const socket: Socket = getSocketById(Player2Arr[0], server2);
      if (socket != undefined) {
        socket.emit('send_player2_data', data);
      }
    }
	@SubscribeMessage('conection_closed')
	handleconection_closed(client: Socket): void {
	  Player1Arr = Player1Arr.filter((elem) => elem !== client.id);
      console.log(client.id + ' leave party');
      console.log('Player1Arr_content: ', Player1Arr);

	}
    handleDisconnect(client: Socket): void {
      Player1Arr = Player1Arr.filter((elem) => elem !== client.id);
      console.log(client.id + ' leave party');
      console.log('Player1Arr_content: ', Player1Arr);
    }
  }
  
