import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { GameObj } from './play.ball.gateway';
  export let Player2ID: string = '',speed2: number = 0,points2: number = 0,myusername2:string = '';;
  let none: Socket;
  @WebSocketGateway(1341, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayPlayer2Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket, data): void {
      Player2ID = client.id;
      speed2 = data.Speed;
      points2 = data.Points;
      myusername2 = data.myusername;
      console.log(data);
      console.log('Player2Arr_content: ', Player2ID);
    }
    @SubscribeMessage('send_player2_data')
    handleSendUser2Data(client: Socket, data: number): void {
      if(GameObj)
      {
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(GameObj[a].PlayersInfo.Player2ID === client.id)
          {
            if(GameObj[a].PlayersInfo.Player2Client === undefined)
              GameObj[a].PlayersInfo.Player2Client = client;
            GameObj[a].RacketsInfo.Racket1Ypos = data;
            if(GameObj[a].PlayersInfo.Player1Client != undefined)
              GameObj[a].PlayersInfo.Player1Client.emit('send_player1_data', data);
          }
        }
    }
      }
	@SubscribeMessage('conection_closed')
	handleconection_closed(client: Socket): void {
    if(GameObj)
    {
      for(let a = 0 ; a<GameObj.length; a++ )
      {
        if(GameObj[a].PlayersInfo.Player2ID === client.id)
        {
          GameObj[a].RoomInfo.GameStatus = 0;
          GameObj[a].PlayersInfo.Player2ID = '';
        }
      }
    }
  }
  handleDisconnect(client: Socket): void {
    if(GameObj)
    {
      for(let a = 0 ; a<GameObj.length; a++ )
      {
        if(GameObj[a].PlayersInfo.Player2ID === client.id)
        {
          GameObj[a].RoomInfo.GameStatus = 0;
          GameObj[a].PlayersInfo.Player2ID = '';
        }
      }
    }
  }
}