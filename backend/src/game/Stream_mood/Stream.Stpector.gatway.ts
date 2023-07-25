import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { OBJ } from '../start_game/play.ball.gateway';
import { GameStream } from '../game_brain/methods/Game_stream_attribute';
  let none: Socket;
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class PlaySpactatorGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('LoadStream')
    handleLoadStream(client: Socket): void {
      console.log("Connecting");
      client.emit("LoadStream",OBJ.GameHead.length);
    }
    @SubscribeMessage('new_spectator')
    handleNewSpectator(client: Socket,RoomNumber: number): void {
      if(OBJ.GameHead.length && OBJ.GameHead[RoomNumber] !== undefined)
        OBJ.GameHead[RoomNumber].GameStreamObj.push(new GameStream);
      console.log('new_spectator at: ',RoomNumber,OBJ.GameHead[RoomNumber].GameStreamObj.length );
      if(OBJ.GameHead.length
        && OBJ.GameHead[RoomNumber] !== undefined
        && OBJ.GameHead[RoomNumber].GameStreamObj[OBJ.GameHead[RoomNumber].GameStreamObj.length - 1] !== undefined)
      {
        OBJ.GameHead[RoomNumber].GameStreamObj[OBJ.GameHead[RoomNumber].GameStreamObj.length - 1].SpectatorID = client.id;
        OBJ.GameHead[RoomNumber].GameStreamObj[OBJ.GameHead[RoomNumber].GameStreamObj.length - 1].SpectatorSocket = client;
      }
    }
	@SubscribeMessage('spectator_leave')
	handleconection_closed(client: Socket): void {
    if(OBJ.GameHead)
    {
      for(let a = 0 ; a<OBJ.GameHead.length; a++ )
      { 
        if(OBJ.GameHead[a].Player1ID === client.id)
        { 
          OBJ.GameHead[a].GameStatus = 0;
          OBJ.GameHead[a].Player1ID = '';
        }
      }
    }
  }
    handleDisconnect(client: Socket): void {
      if(OBJ.GameHead)
      {
        for(let a = 0 ; a<OBJ.GameHead.length; a++ )
        { 
          if(OBJ.GameHead[a].Player1ID === client.id)
          { 
            OBJ.GameHead[a].GameStatus = 0;
            OBJ.GameHead[a].Player1ID = '';
          }
        }
      }
    }
  }
  
