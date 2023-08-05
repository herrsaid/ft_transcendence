/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   play.ball.gateway.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:00 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/05 13:28:23 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Interval } from "@nestjs/schedule";
  import { Player1ID,speed1,points1,myusername} from './play.player1.gateway'
  import { Player2ID,speed2,points2,enemyusername} from './play.player2.gateway'
  import {data } from '../game_brain/logic/game_server_class';
import e from 'express';
import { HistoryManager } from '../data_manager/HistoryManager';

  export let GameObj: data[] = [];
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class BallGateway{
    constructor(private HistoryManager:HistoryManager)
    {
      
    };
    first_connect()
    {
      GameObj.push(new data());
      GameObj[0].RoomInfo.GameSpeed = speed1 | speed2;
      GameObj[0].RoomInfo.GamePoints= points1 | points2;
      GameObj[0].PlayersInfo.Player1UserName = myusername;
      GameObj[0].PlayersInfo.Player2UserName = enemyusername;
      GameObj[0].RoomInfo.GameStatus = 1;
      GameObj[0].PlayersInfo.Player1ID = Player1ID;
      GameObj[0].PlayersInfo.Player2ID = Player2ID;
    }
    new_connect()
    {
      GameObj.push(new data());
      GameObj[GameObj.length - 1].RoomInfo.GameSpeed = speed1 | speed2;
      GameObj[GameObj.length - 1].RoomInfo.GamePoints= points1 | points2;
      GameObj[GameObj.length - 1].PlayersInfo.Player1UserName = myusername;
      GameObj[GameObj.length - 1].PlayersInfo.Player2UserName = enemyusername;
      GameObj[GameObj.length - 1].RoomInfo.GameStatus = 1;
      GameObj[GameObj.length - 1].PlayersInfo.Player1ID = Player1ID;
      GameObj[GameObj.length - 1].PlayersInfo.Player2ID = Player2ID;
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
        }
        if(GameObj[Room].StreamsInfo[Spectator].SpectatorSocket)
          GameObj[Room].StreamsInfo[Spectator].SpectatorSocket.emit('send_players_data',playersdata);
      }
    }
    end_simulation(Room:number)
    {
      // HistoryDataBaseManager
      this.HistoryManager.NewHistory(GameObj[Room]);
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
      // player leave Room
      else if(GameObj[Room].PlayersInfo.Player2ID === ''
        && GameObj[Room].PlayersInfo.Player1Client !== undefined
        && GameObj[Room].PlayersInfo.Player2Client !== undefined)
      {
        GameObj[Room].PlayersInfo.Player1Client.emit('GameEnd',"YOU WIN");
        GameObj[Room].PlayersInfo.Player2Client.emit('GameEnd',"YOU WIN");
        
      }
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

    @WebSocketServer()
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
          if(GameObj[a].RoomInfo.Sleep <= 0 && GameObj[a].RoomInfo.GameStatus === 1)
          {
            //call function that contains Game logic
            GameObj[a].Logic.Head(GameObj[a]);
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
  
