import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket } from 'socket.io';
  import { Interval } from "@nestjs/schedule";
  import { getSocketById } from '../auto_match/lobbie.gateway';
  import { Player2Arr, server2 } from './play.player2.gateway'
  import { Player1Arr, server1 } from './play.player1.gateway'
  import { GameHead } from '../game_brain/game_server_logic';
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class BallGateway{
    @WebSocketServer()
    @Interval(16)
    handleSendBallPos()
    {
      if(GameHead.GetSleep() <= 0)
        GameHead.test();
      else
        GameHead.SetSleep(GameHead.GetSleep() - 16);
      const Gameinfo = 
      {
        BallXpos: GameHead.GetBallXpos(),
        BallYpos: GameHead.GetBallYpos(),
        Result1Val: GameHead.GetResult1Val(),
        Result2Val: GameHead.GetResult2Val(),
      }
      const socket: Socket = getSocketById(Player1Arr[0], server1);
      const socket2: Socket = getSocketById(Player2Arr[0], server2);
      if (socket != undefined) {
        socket.emit('BallPos', Gameinfo);
      }
      if (socket2 != undefined) {
        socket2.emit('BallPos', Gameinfo);
      }
    }
  }
  
