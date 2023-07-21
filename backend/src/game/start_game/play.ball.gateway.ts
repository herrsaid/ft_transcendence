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
        if(OBJ.GameHead.find((elem)=> elem.GetPlayer1ID() === Player1ID) === undefined
        && OBJ.GameHead.find((elem)=> elem.GetPlayer2ID() === Player2ID) === undefined)
        {
          console.log(Player1ID,Player2ID);
          console.log("here");
          OBJ.GameHead.push(new GameHead());
          OBJ.GameHead[OBJ.GameHead.length - 1].SetPlayer1ID(Player1ID);
          OBJ.GameHead[OBJ.GameHead.length - 1].SetPlayer2ID(Player2ID);
        }
        for(let a = 0 ; a<OBJ.GameHead.length; a++ )
        {
          if(OBJ.GameHead[a].GetSleep() <= 0 && OBJ.GameHead[a].GetPlayer1ID() != '' && OBJ.GameHead[a].GetPlayer2ID() != '')
          OBJ.GameHead[a].test();
          else
            OBJ.GameHead[a].SetSleep(OBJ.GameHead[a].GetSleep() - 16);
          const Gameinfo = 
          {
            BallXpos: OBJ.GameHead[a].GetBallXpos(),
            BallYpos: OBJ.GameHead[a].GetBallYpos(),
            Result1Val: OBJ.GameHead[a].GetResult1Val(),
            Result2Val: OBJ.GameHead[a].GetResult2Val(),
          }
          if (OBJ.GameHead[a].GetPlayer1Client() != undefined) {
            OBJ.GameHead[a].GetPlayer1Client().emit('BallPos', Gameinfo);
          }
          if (OBJ.GameHead[a].GetPlayer2Client() != undefined) {
            OBJ.GameHead[a].GetPlayer2Client().emit('BallPos', Gameinfo);
          }
        }
      }
      else if(Player1ID !== '' && Player2ID !== '')
      {
        {
          OBJ.GameHead.push(new GameHead());
          OBJ.GameHead[0].SetPlayer1ID(Player1ID);
          OBJ.GameHead[0].SetPlayer2ID(Player2ID);
        }
      }
    }
  }
  
