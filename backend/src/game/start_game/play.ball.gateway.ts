import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Interval } from "@nestjs/schedule";
  import { Player1ID,speed1,points1,myusername} from './play.player1.gateway'
  import { Player2ID,speed2,points2,myusername2} from './play.player2.gateway'
  import {data,obj } from '../game_brain/logic/game_server_obj';

  export let GameObj: data[] = [];
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class BallGateway{
    @WebSocketServer()
    @Interval(16)
    handleSendBallPos()
    {
      if(GameObj.length)
      {
        if(GameObj.find((elem)=> elem.PlayersInfo.Player1ID === Player1ID) === undefined
        && GameObj.find((elem)=> elem.PlayersInfo.Player2ID === Player2ID) === undefined)
        {
          GameObj.push(obj);
          GameObj[GameObj.length - 1].RoomInfo.GameSpeed = speed1| speed2;
          GameObj[GameObj.length - 1].RoomInfo.GamePoints= points1| points2;
          GameObj[GameObj.length - 1].PlayersInfo.Player1UserName = myusername;
          GameObj[GameObj.length - 1].PlayersInfo.Player2UserName = myusername2;
          GameObj[GameObj.length - 1].RoomInfo.GamePoints= points1| points2;
          GameObj[GameObj.length - 1].RoomInfo.GameStatus = 1;
          GameObj[GameObj.length - 1].PlayersInfo.Player1ID = Player1ID;
          GameObj[GameObj.length - 1].PlayersInfo.Player2ID = Player2ID;
        }
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(GameObj[a].RoomInfo.Sleep <= 0 && GameObj[a].RoomInfo.GameStatus === 1)
          {
            GameObj[a].Logic.Head(GameObj[a]);
            for(let b = 0 ; b<GameObj[a].StreamsInfo.length; b++)
            {
              const  playersdata =
              {
                Racket1Ypos: GameObj[a].RacketsInfo.Racket1Ypos,
                Racket2Ypos: GameObj[a].RacketsInfo.Racket2Ypos,
                BallXpos: GameObj[a].BallInfo.BallXpos,
                BallYpos: GameObj[a].BallInfo.BallYpos,
                Result1Val: GameObj[a].PlayersInfo.Result1Val,
                Result2Val: GameObj[a].PlayersInfo.Result2Val,
                Player1UserName: GameObj[a].PlayersInfo.Player1UserName,
                Player2UserName: GameObj[a].PlayersInfo.Player2UserName,
              }
              if(GameObj[a].StreamsInfo[b].SpectatorSocket)
                GameObj[a].StreamsInfo[b].SpectatorSocket.emit('send_players_data',playersdata);
            }
          }
            else
          {
            if(!GameObj[a].RoomInfo.GameStatus)
            {
              if(GameObj[a].PlayersInfo.Player1ID === '')
                GameObj[a].PlayersInfo.Player2Client.emit('GameEnd',"YOU WIN");
              else if(GameObj[a].PlayersInfo.Player2ID === '')
                GameObj[a].PlayersInfo.Player1Client.emit('GameEnd',"YOU WIN");
              else if(GameObj[a].RoomInfo.GamePoints >=  GameObj[a].PlayersInfo.Result1Val)
              {
                GameObj[a].PlayersInfo.Player1Client.emit('GameEnd',"YOU WIN");
                GameObj[a].PlayersInfo.Player2Client.emit('GameEnd',"YOU LOSE");
              }
              else if(GameObj[a].RoomInfo.GamePoints >=  GameObj[a].PlayersInfo.Result2Val)
              {
                GameObj[a].PlayersInfo.Player1Client.emit('GameEnd',"YOU LOSE");
                GameObj[a].PlayersInfo.Player2Client.emit('GameEnd',"YOU WIN");
              }
              console.log('['+GameObj.length+']');
              GameObj = GameObj.filter((obj) => obj.PlayersInfo.Player1ID !== '' &&  obj.PlayersInfo.Player2ID !== '');
              if(GameObj.length === 1 && GameObj[0].PlayersInfo.Player1ID === '' && GameObj[0].PlayersInfo.Player2ID === '')
                GameObj.pop();
              console.log('['+GameObj.length+']');
            }
            if(GameObj.length)
              GameObj[a].RoomInfo.Sleep = GameObj[a].RoomInfo.Sleep - 16;
          }
          if(GameObj.length)
          {
              const Gameinfo = 
            {
              BallXpos: GameObj[a].BallInfo.BallXpos,
              BallYpos: GameObj[a].BallInfo.BallYpos,
              Result1Val: GameObj[a].PlayersInfo.Result1Val,
              Result2Val: GameObj[a].PlayersInfo.Result2Val,
            }
            if (GameObj[a].PlayersInfo.Player1Client != undefined) {
              GameObj[a].PlayersInfo.Player1Client.emit('BallPos', Gameinfo);
            }
            if (GameObj[a].PlayersInfo.Player2Client != undefined) {
              GameObj[a].PlayersInfo.Player2Client.emit('BallPos', Gameinfo);
            }
          }
        }
      }
      else if(Player1ID !== '' && Player2ID !== '')
      {
          GameObj.push(obj);
          GameObj[0].RoomInfo.GameSpeed = speed1 | speed2;
          GameObj[0].RoomInfo.GamePoints= points1 | points2;
          GameObj[0].PlayersInfo.Player1UserName = myusername;
          GameObj[0].PlayersInfo.Player2UserName = myusername2;
          GameObj[0].RoomInfo.GamePoints= points1| points2;
          GameObj[0].RoomInfo.GameStatus = 1;
          GameObj[0].PlayersInfo.Player1ID = Player1ID;
          GameObj[0].PlayersInfo.Player2ID = Player2ID;
      }
    }
  }
  
