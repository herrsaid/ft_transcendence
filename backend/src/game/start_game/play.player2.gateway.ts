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
  import { Player1Arr, server1 } from './play.player1.gateway';
  import { GameHead } from '../game_brain/game_server_logic';
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
      GameHead.SetRacket2Ypos(data);
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
      Player2Arr = Player2Arr.filter((elem) => elem !== client.id);
      console.log(client.id + ' leave party');
      console.log('Player2Arr_content: ', Player2Arr);
    }
  }
  
