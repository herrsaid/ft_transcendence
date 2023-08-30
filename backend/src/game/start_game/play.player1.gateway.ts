/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   play.player1.gateway.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:03 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 18:12:25 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { GameObj } from '../game_brain/logic/Brain';
import { FirstConnection, PlayerPos } from '../PingPong.dto';
import { WebSocketGateWayFilter } from '../PingPong.filter';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
  export let Player1ID: string = '',speed1: number = 0,points1: number = 0,myusername:string = '',myimage:string = '';
  let none: Socket;
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  @UseFilters(new WebSocketGateWayFilter())
  @UsePipes(new ValidationPipe())
  export class PlayPlayer1Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(@ConnectedSocket() client: Socket, @MessageBody() data:FirstConnection): void {
      Player1ID = client.id;
      speed1 = data.speed;
      points1 = data.points;
      myusername = data.myusername;
      myimage = data.myimage;
      // console.log(data);
      // console.log('Player1Arr_content: ', Player1ID);
    }
    @SubscribeMessage('send_player1_data')
    handleSendUser1Data(@ConnectedSocket() client: Socket, @MessageBody() data: PlayerPos): void {
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(GameObj[a].PlayersInfo.Player1ID === client.id)
          {
            if(GameObj[a].PlayersInfo.Player1Client === undefined)
              GameObj[a].PlayersInfo.Player1Client = client;
            GameObj[a].RacketsInfo.Racket2Ypos = data.data;
            if(GameObj[a].PlayersInfo.Player2Client != undefined)
              GameObj[a].PlayersInfo.Player2Client.emit('send_player2_data', data.data);
          }
        }
  }
	@SubscribeMessage('conection_closed')
	handleconection_closed(client: Socket): void {
      for(let a = 0 ; a<GameObj.length; a++ )
      { 
        if(GameObj[a].PlayersInfo.Player1ID === client.id && GameObj[a].PlayersInfo.Player1Client === client)
        { 
          GameObj[a].RoomInfo.GameStatus = 0;
          GameObj[a].PlayersInfo.Player1ID = '';
          GameObj[a].PlayersInfo.Player2ID = '';
          GameObj[a].PlayersInfo.Result1Val = 2;
          GameObj[a].PlayersInfo.Result2Val = 0;
        }
      }
      Player1ID = '';
      // console.log("player1 disconnectI");
    }
    handleDisconnect(client: Socket): void {
        for(let a = 0 ; a<GameObj.length; a++ )
        { 
          if(GameObj[a].PlayersInfo.Player1ID === client.id && GameObj[a].PlayersInfo.Player1Client === client)
          { 
            GameObj[a].RoomInfo.GameStatus = 0;
            GameObj[a].PlayersInfo.Player1ID = '';
            GameObj[a].PlayersInfo.Player2ID = '';
            GameObj[a].PlayersInfo.Result1Val = 2;
            GameObj[a].PlayersInfo.Result2Val = 0;
          }
        }
        Player1ID = '';
        // console.log("player1 disconnectII");
      }
  }
  
