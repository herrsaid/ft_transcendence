/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   play.ball.gateway.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:00 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 18:14:23 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// import {
//     WebSocketGateway,
//     WebSocketServer,
//   } from '@nestjs/websockets';
  import { Interval } from "@nestjs/schedule";
  import { Player1ID,speed1,points1,myusername,myimage} from './play.player1.gateway'
  import { Player2ID,speed2,points2,enemyusername,enemyimage} from './play.player2.gateway'
  import {data } from '../game_brain/logic/game_server_class';
  import e from 'express';
import { HistoryManager } from '../data_manager/HistoryManager';
import { GameInfoManager } from '../data_manager/GameInfoManager';
import { UserService } from 'src/user/services/user.service';
import { Injectable } from '@nestjs/common';

export let GameObj: data[] = [];

@Injectable()
  export class BallGateway{
    constructor(private HistoryManager:HistoryManager,private GameInfo:GameInfoManager,
      private UserManager:UserService)
    {
      
    };
    first_connect()
    {
      GameObj.push(new data());
      console.log("push first simulation");
      GameObj[0].RoomInfo.GameSpeed = speed1 | speed2;
      GameObj[0].RoomInfo.GamePoints= points1 | points2;
      GameObj[0].PlayersInfo.Player1UserName = myusername;
      GameObj[0].PlayersInfo.Player2UserName = enemyusername;
      GameObj[0].PlayersInfo.Player1Image = myimage;
      GameObj[0].PlayersInfo.Player2Image = enemyimage;
      GameObj[0].RoomInfo.GameStatus = 1;
      GameObj[0].PlayersInfo.Player1ID = Player1ID;
      GameObj[0].PlayersInfo.Player2ID = Player2ID;
      this.UserManager.updateGameStatus(myusername,{"isInGame" : true});
      this.UserManager.updateGameStatus(enemyusername,{"isInGame" : true});
    }
    new_connect()
    {
      GameObj.push(new data());
      console.log("push new simulation");
      GameObj[GameObj.length - 1].RoomInfo.GameSpeed = speed1 | speed2;
      GameObj[GameObj.length - 1].RoomInfo.GamePoints= points1 | points2;
      GameObj[GameObj.length - 1].PlayersInfo.Player1UserName = myusername;
      GameObj[GameObj.length - 1].PlayersInfo.Player2UserName = enemyusername;
      GameObj[GameObj.length - 1].PlayersInfo.Player1Image = myimage;
      GameObj[GameObj.length - 1].PlayersInfo.Player2Image = enemyimage;
      GameObj[GameObj.length - 1].RoomInfo.GameStatus = 1;
      GameObj[GameObj.length - 1].PlayersInfo.Player1ID = Player1ID;
      GameObj[GameObj.length - 1].PlayersInfo.Player2ID = Player2ID;
      this.UserManager.updateGameStatus(myusername,{"isInGame" : true});
      this.UserManager.updateGameStatus(enemyusername,{"isInGame" : true});
    }
    send_data_to_spectator(Room:number)
    {
      for(let Spectator = 0 ; Spectator<GameObj[Room].StreamsInfo.length; Spectator++)
      {
        const  playersdata =
        {
          Racket1Ypos: GameObj[Room].RacketsInfo.Racket1Ypos,
          Racket2Ypos: GameObj[Room].RacketsInfo.Racket2Ypos,
          BallXpos: GameObj[Room].BallInfo.BallXpos,
          BallYpos: GameObj[Room].BallInfo.BallYpos,
          Result1Val: GameObj[Room].PlayersInfo.Result1Val,
          Result2Val: GameObj[Room].PlayersInfo.Result2Val,
          Player1UserName: GameObj[Room].PlayersInfo.Player1UserName,
          Player2UserName: GameObj[Room].PlayersInfo.Player2UserName,
          Player1Image: GameObj[Room].PlayersInfo.Player1Image,
          Player2Image: GameObj[Room].PlayersInfo.Player2Image,
        }
        if(GameObj[Room].StreamsInfo[Spectator].SpectatorSocket)
          GameObj[Room].StreamsInfo[Spectator].SpectatorSocket.emit('send_players_data',playersdata);
      }
    }
    end_simulation(Room:number)
    {
      //Update...
        this.UserManager.updateGameStatus(GameObj[Room].PlayersInfo.Player1UserName,{"isInGame" : false})
        this.UserManager.updateGameStatus(GameObj[Room].PlayersInfo.Player2UserName,{"isInGame" : false})
      // HistoryDataBaseManager for pushing game history
      this.HistoryManager.NewHistory(GameObj[Room]);
      //GameInfoManager for push gameuser information
      this.GameInfo.CreateOrUpdateGameInfo(GameObj[Room]);
      // playerI colect target
      if(GameObj[Room].RoomInfo.GamePoints <=  GameObj[Room].PlayersInfo.Result1Val
        && GameObj[Room].PlayersInfo.Player1Client !== undefined
        && GameObj[Room].PlayersInfo.Player2Client !== undefined)
      {
        GameObj[Room].PlayersInfo.Player1Client.emit('GameEnd',"YOU LOSE");
        GameObj[Room].PlayersInfo.Player2Client.emit('GameEnd',"YOU WIN");
      }
        // playerII colect target
      else if(GameObj[Room].RoomInfo.GamePoints <=  GameObj[Room].PlayersInfo.Result2Val
        && GameObj[Room].PlayersInfo.Player1Client !== undefined
        && GameObj[Room].PlayersInfo.Player2Client !== undefined)
      {
        GameObj[Room].PlayersInfo.Player1Client.emit('GameEnd',"YOU WIN");
        GameObj[Room].PlayersInfo.Player2Client.emit('GameEnd',"YOU LOSE");
      }
      //timeout playerI Win
      else if(GameObj[Room].PlayersInfo.Result2Val <  GameObj[Room].PlayersInfo.Result1Val
        && GameObj[Room].PlayersInfo.Player1Client !== undefined
        && GameObj[Room].PlayersInfo.Player2Client !== undefined)
      {
        GameObj[Room].PlayersInfo.Player1Client.emit('GameEnd',"YOU LOSE");
        GameObj[Room].PlayersInfo.Player2Client.emit('GameEnd',"YOU WIN");
      }
      //timeout playerII Win
      else if(GameObj[Room].PlayersInfo.Result1Val <  GameObj[Room].PlayersInfo.Result2Val
        && GameObj[Room].PlayersInfo.Player1Client !== undefined
        && GameObj[Room].PlayersInfo.Player2Client !== undefined)
      {
        GameObj[Room].PlayersInfo.Player1Client.emit('GameEnd',"YOU WIN");
        GameObj[Room].PlayersInfo.Player2Client.emit('GameEnd',"YOU LOSE");
      }
      //timeout playerII  && playerI Win
      else if(GameObj[Room].PlayersInfo.Result1Val ===  GameObj[Room].PlayersInfo.Result2Val
        && GameObj[Room].PlayersInfo.Player1Client !== undefined
        && GameObj[Room].PlayersInfo.Player2Client !== undefined)
      {
        GameObj[Room].PlayersInfo.Player1Client.emit('GameEnd',"YOU WIN");
        GameObj[Room].PlayersInfo.Player2Client.emit('GameEnd',"YOU WIN");
      }
        // player leave Room
      else if(GameObj[Room].PlayersInfo.Player2ID === ''
        && GameObj[Room].PlayersInfo.Player1Client !== undefined
        && GameObj[Room].PlayersInfo.Player2Client !== undefined)
      {
        if(GameObj[Room].PlayersInfo.Result1Val === 0)
          GameObj[Room].PlayersInfo.Player1Client.emit('GameEnd',"YOU WIN");
        if(GameObj[Room].PlayersInfo.Result2Val === 0)
          GameObj[Room].PlayersInfo.Player2Client.emit('GameEnd',"YOU WIN");
      }

      //disconnect players from room
      // if(GameObj[Room].PlayersInfo.Player1Client !== undefined)
      //   GameObj[Room].PlayersInfo.Player1Client.emit('conection_closed');
      // if(GameObj[Room].PlayersInfo.Player2Client !== undefined)
      //   GameObj[Room].PlayersInfo.Player2Client.emit('conection_closed');
      GameObj[Room].PlayersInfo.Player1ID = '';
      GameObj[Room].PlayersInfo.Player2ID = '';
      // remove Object of this room
      console.log('['+GameObj.length+']');
      if(GameObj.length === 1 && GameObj[0].PlayersInfo.Player1ID === '' && GameObj[0].PlayersInfo.Player2ID === '')
        GameObj.pop();
      else if(GameObj.length > 1)
        GameObj = GameObj.filter((obj) => obj.PlayersInfo.Player1ID !== '' &&  obj.PlayersInfo.Player2ID !== '');
      console.log('['+GameObj.length+']');
    }

    send_data_to_players(Room:number)
    {
      const Gameinfo = 
      {
        BallXpos: GameObj[Room].BallInfo.BallXpos,
        BallYpos: GameObj[Room].BallInfo.BallYpos,
        Result1Val: GameObj[Room].PlayersInfo.Result1Val,
        Result2Val: GameObj[Room].PlayersInfo.Result2Val,
      }
      if (GameObj[Room].PlayersInfo.Player1Client != undefined)
        GameObj[Room].PlayersInfo.Player1Client.emit('BallPos', Gameinfo);
      if (GameObj[Room].PlayersInfo.Player2Client != undefined)
        GameObj[Room].PlayersInfo.Player2Client.emit('BallPos', Gameinfo);
    }

    @Interval(16)
    handleSendBallPos()
    {
      if(GameObj.length)
      {
        if(GameObj.find((elem)=> elem.PlayersInfo.Player1ID === Player1ID) === undefined
          && GameObj.find((elem)=> elem.PlayersInfo.Player2ID === Player2ID) === undefined)
          this.new_connect()
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(!GameObj.length)
          {
            console.log("break");
            break;
          }
            if(GameObj[a].RoomInfo.Sleep <= 0 && GameObj[a].RoomInfo.GameStatus === 1 && GameObj[a].RoomInfo.TimeOut > 0)
          {
            //call function that contains Game logic
            let gamespeed = GameObj[a].RoomInfo.GameSpeed;
            for(let loop=0;loop<gamespeed;loop++)
              GameObj[a].Logic.Head(GameObj[a]);
            // for calc time of match default is 1m:30s
              GameObj[a].RoomInfo.TimeOut -= 16;
              // console.log("TimeOut: " + GameObj[a].RoomInfo.TimeOut);
            //call function that send room data to all players on this room
            this.send_data_to_players(a)
            //call function that send room data to all spectators on this room
            this.send_data_to_spectator(a);
          }
          // call function that decreases sleep value
          else if(GameObj[a].RoomInfo.Sleep > 0)
              GameObj[a].RoomInfo.Sleep = GameObj[a].RoomInfo.Sleep - 16;
          //call funbnsction that end_simulation
          else
            this.end_simulation(a--);
        }
      }
      else if(Player1ID !== '' && Player2ID !== '')
        this.first_connect();
    }
  }
  
