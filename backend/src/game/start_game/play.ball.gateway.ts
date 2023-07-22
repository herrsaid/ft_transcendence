import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket } from 'socket.io';
  import { Interval } from "@nestjs/schedule";
  import { getSocketById } from '../auto_match/lobbie.gateway';
  import { Player1ID} from './play.player1.gateway'
  import { Player2ID} from './play.player2.gateway'
  import { GameHead } from '../game_brain/logic/GameHead';
  import { OBJ } from '../game_brain/logic/game_server_class';
import { exit } from 'process';
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class BallGateway{
    @WebSocketServer()
    @Interval(16)
    handleSendBallPos()
    {
      if(OBJ.GameHead.length)
      {
        if(OBJ.GameHead.find((elem)=> elem.Player1ID === Player1ID) === undefined
        && OBJ.GameHead.find((elem)=> elem.Player2ID === Player2ID) === undefined)
        {
          OBJ.GameHead.push(new GameHead());
          OBJ.GameHead[OBJ.GameHead.length - 1].GameStatus = 1;
          OBJ.GameHead[OBJ.GameHead.length - 1].Player1ID = Player1ID;
          OBJ.GameHead[OBJ.GameHead.length - 1].Player2ID = Player2ID;
        }
        for(let a = 0 ; a<OBJ.GameHead.length; a++ )
        {
          if(OBJ.GameHead[a].Sleep <= 0 && OBJ.GameHead[a].GameStatus === 1)
            OBJ.GameHead[a].test();
          else
            OBJ.GameHead[a].Sleep = OBJ.GameHead[a].Sleep - 16;
          const Gameinfo = 
          {
            BallXpos: OBJ.GameHead[a].BallXpos,
            BallYpos: OBJ.GameHead[a].BallYpos,
            Result1Val: OBJ.GameHead[a].Result1Val,
            Result2Val: OBJ.GameHead[a].Result2Val,
          }
          if (OBJ.GameHead[a].Player1Client != undefined) {
            OBJ.GameHead[a].Player1Client.emit('BallPos', Gameinfo);
          }
          if (OBJ.GameHead[a].Player2Client != undefined) {
            OBJ.GameHead[a].Player2Client.emit('BallPos', Gameinfo);
          }
        }
      }
      else if(Player1ID !== '' && Player2ID !== '')
      {
          OBJ.GameHead.push(new GameHead());
          OBJ.GameHead[0].GameStatus = 1;
          OBJ.GameHead[0].Player1ID = Player1ID;
          OBJ.GameHead[0].Player2ID = Player2ID;
      }
    }
  }
  
