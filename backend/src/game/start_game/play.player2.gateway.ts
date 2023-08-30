/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   play.player2.gateway.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:06 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 18:13:09 by mabdelou         ###   ########.fr       */
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
  export let Player2ID: string = '',speed2: number = 0,points2: number = 0,enemyusername:string = '',enemyimage:string = '';;
  let none: Socket;
  @WebSocketGateway(1341, {
    cors: { origin: '*', credentials: true },
  })
  @UseFilters(new WebSocketGateWayFilter())
  @UsePipes(new ValidationPipe())
  export class PlayPlayer2Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(@ConnectedSocket() client: Socket, @MessageBody() data:FirstConnection): void {
      Player2ID = client.id;
      speed2 = data.speed;
      points2 = data.points;
      enemyusername = data.myusername;
      enemyimage = data.myimage;
      console.log(data);
      console.log('Player2Arr_content: ', Player2ID);
    }
    @SubscribeMessage('send_player2_data')
    handleSendUser2Data(@ConnectedSocket() client: Socket, @MessageBody() data: PlayerPos): void {
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(GameObj[a].PlayersInfo.Player2ID === client.id)
          {
            if(GameObj[a].PlayersInfo.Player2Client === undefined)
              GameObj[a].PlayersInfo.Player2Client = client;
            GameObj[a].RacketsInfo.Racket1Ypos = data.data;
            if(GameObj[a].PlayersInfo.Player1Client != undefined)
              GameObj[a].PlayersInfo.Player1Client.emit('send_player1_data', data.data);
          }
        }
      }
	@SubscribeMessage('conection_closed')
	handleconection_closed(client: Socket): void {
      for(let a = 0 ; a<GameObj.length; a++ )
      {
        if(GameObj[a].PlayersInfo.Player2ID === client.id && GameObj[a].PlayersInfo.Player2Client === client)
        {
          GameObj[a].RoomInfo.GameStatus = 0;
          GameObj[a].PlayersInfo.Player1ID = '';
          GameObj[a].PlayersInfo.Player2ID = '';
          GameObj[a].PlayersInfo.Result1Val = 0;
          GameObj[a].PlayersInfo.Result2Val = 2;
        }
      }
      Player2ID = '';
      console.log("player2 disconnectI");
  }
  handleDisconnect(client: Socket): void {
      for(let a = 0 ; a<GameObj.length; a++ )
      {
        if(GameObj[a].PlayersInfo.Player2ID === client.id && GameObj[a].PlayersInfo.Player2Client === client)
        {
          GameObj[a].RoomInfo.GameStatus = 0;
          GameObj[a].PlayersInfo.Player1ID = '';
          GameObj[a].PlayersInfo.Player2ID = '';
          GameObj[a].PlayersInfo.Result1Val = 0;
          GameObj[a].PlayersInfo.Result2Val = 2;
        }
      }
      Player2ID = '';
      console.log("player2 disconnectII");
    }
}