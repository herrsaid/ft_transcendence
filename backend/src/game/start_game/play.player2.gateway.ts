import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';

  import { Socket, Server } from 'socket.io';
  import { OBJ } from '../game_brain/logic/game_server_class';
  export let Player2ID: string = '';
  export let none: Socket;
  @WebSocketGateway(1341, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayPlayer2Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket): void {
        Player2ID = client.id;
      console.log('Player2Arr_content: ', Player2ID);
    }
    @SubscribeMessage('send_player2_data')
    handleSendUser2Data(client: Socket, data: number): void {
      if(OBJ.GameHead)
      {
        for(let a = 0 ; a<OBJ.GameHead.length; a++ )
        {
          if(OBJ.GameHead[a].Player2ID === client.id)
          {
            if(OBJ.GameHead[a].Player2Client === undefined)
              OBJ.GameHead[a].Player2Client = client;
            OBJ.GameHead[a].Racket1Ypos = data;
            if(OBJ.GameHead[a].Player1Client != undefined)
              OBJ.GameHead[a].Player1Client.emit('send_player1_data', data);
          }
        }
    }
      }
	@SubscribeMessage('conection_closed')
	handleconection_closed(client: Socket): void {
    if(OBJ.GameHead)
      for(let a = 0 ; a<OBJ.GameHead.length; a++ )
        if(OBJ.GameHead[a].Player2ID === client.id)
          OBJ.GameHead[a].GameStatus = 0;
    OBJ.GameHead.filter((obj) => obj.Player2ID !== Player2ID);
	}
    handleDisconnect(client: Socket): void {
      if(OBJ.GameHead)
        for(let a = 0 ; a<OBJ.GameHead.length; a++ )
          if(OBJ.GameHead[a].Player2ID === client.id)
            OBJ.GameHead[a].GameStatus = 0;
      OBJ.GameHead.filter((obj) => obj.Player2ID !== Player2ID);
  }
  
}