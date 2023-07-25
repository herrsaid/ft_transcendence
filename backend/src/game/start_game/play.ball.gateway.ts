import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Interval } from "@nestjs/schedule";
  import { Player1ID,speed1,points1,myusername} from './play.player1.gateway'
  import { Player2ID,speed2,points2,myusername2} from './play.player2.gateway'
  import { GameHead } from '../game_brain/logic/GameHead';
  import { GameObj } from '../game_brain/logic/game_server_class';

  export let OBJ = new GameObj();
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
          OBJ.GameHead[OBJ.GameHead.length - 1].GameSpeed = speed1| speed2;
          OBJ.GameHead[OBJ.GameHead.length - 1].GamePoints= points1| points2;
          OBJ.GameHead[OBJ.GameHead.length - 1].Player1UserName = myusername;
          OBJ.GameHead[OBJ.GameHead.length - 1].Player2UserName = myusername2;
          OBJ.GameHead[OBJ.GameHead.length - 1].GamePoints= points1| points2;
          OBJ.GameHead[OBJ.GameHead.length - 1].GameStatus = 1;
          OBJ.GameHead[OBJ.GameHead.length - 1].Player1ID = Player1ID;
          OBJ.GameHead[OBJ.GameHead.length - 1].Player2ID = Player2ID;
        }
        for(let a = 0 ; a<OBJ.GameHead.length; a++ )
        {
          if(OBJ.GameHead[a].Sleep <= 0 && OBJ.GameHead[a].GameStatus === 1)
          {
            OBJ.GameHead[a].test();
            for(let b = 0 ; b<OBJ.GameHead[a].GameStreamObj.length; b++)
            {
              const  playersdata =
              {
                Racket1Ypos: OBJ.GameHead[a].Racket1Ypos,
                Racket2Ypos: OBJ.GameHead[a].Racket2Ypos,
                BallXpos: OBJ.GameHead[a].BallXpos,
                BallYpos: OBJ.GameHead[a].BallYpos,
                Result1Val: OBJ.GameHead[a].Result1Val,
                Result2Val: OBJ.GameHead[a].Result2Val,
                Player1UserName: OBJ.GameHead[a].Player1UserName,
                Player2UserName: OBJ.GameHead[a].Player2UserName,
              }
              if(OBJ.GameHead[a].GameStreamObj[b].SpectatorSocket)
                OBJ.GameHead[a].GameStreamObj[b].SpectatorSocket.emit('send_players_data',playersdata);
            }
          }
            else
          {
            if(!OBJ.GameHead[a].GameStatus)
            {
              if(OBJ.GameHead[a].Player1ID === '')
                OBJ.GameHead[a].Player2Client.emit('GameEnd',"YOU WIN");
              else if(OBJ.GameHead[a].Player2ID === '')
                OBJ.GameHead[a].Player1Client.emit('GameEnd',"YOU WIN");
              else if(OBJ.GameHead[a].GamePoints >=  OBJ.GameHead[a].Result1Val)
              {
                OBJ.GameHead[a].Player1Client.emit('GameEnd',"YOU WIN");
                OBJ.GameHead[a].Player2Client.emit('GameEnd',"YOU LOSE");
              }
              else if(OBJ.GameHead[a].GamePoints >=  OBJ.GameHead[a].Result2Val)
              {
                OBJ.GameHead[a].Player1Client.emit('GameEnd',"YOU LOSE");
                OBJ.GameHead[a].Player2Client.emit('GameEnd',"YOU WIN");
              }
              console.log('['+OBJ.GameHead.length+']');
              OBJ.GameHead = OBJ.GameHead.filter((obj) => obj.Player1ID !== '' &&  obj.Player2ID !== '');
              if(OBJ.GameHead.length === 1 && OBJ.GameHead[0].Player1ID === '' && OBJ.GameHead[0].Player2ID === '')
                OBJ.GameHead.pop();
              console.log('['+OBJ.GameHead.length+']');
            }
            if(OBJ.GameHead.length)
              OBJ.GameHead[a].Sleep = OBJ.GameHead[a].Sleep - 16;
          }
          if(OBJ.GameHead.length)
          {
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
      }
      else if(Player1ID !== '' && Player2ID !== '')
      {
          OBJ.GameHead.push(new GameHead());
          OBJ.GameHead[0].GameSpeed = speed1 | speed2;
          OBJ.GameHead[0].GamePoints= points1 | points2;
          OBJ.GameHead[0].Player1UserName = myusername;
          OBJ.GameHead[0].Player2UserName = myusername2;
          OBJ.GameHead[0].GameStatus = 1;
          OBJ.GameHead[0].Player1ID = Player1ID;
          OBJ.GameHead[0].Player2ID = Player2ID;
      }
    }
  }
  
