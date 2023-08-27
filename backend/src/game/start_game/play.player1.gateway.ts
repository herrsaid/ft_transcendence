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
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { GameObj } from './play.ball.gateway';
  export let Player1ID: string = '',speed1: number = 0,points1: number = 0,myusername:string = '',myimage:string = '';
  let none: Socket;
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayPlayer1Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket, data): void {
      Player1ID = client.id;
      speed1 = data.Speed;
      points1 = data.Points;
      myusername = data.myusername;
      myimage = data.myimage;
      console.log(data);
      console.log('Player1Arr_content: ', Player1ID);
    }
    @SubscribeMessage('send_player1_data')
    handleSendUser1Data(client: Socket, data: number): void {
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(GameObj[a].PlayersInfo.Player1ID === client.id)
          {
            if(GameObj[a].PlayersInfo.Player1Client === undefined)
              GameObj[a].PlayersInfo.Player1Client = client;
            GameObj[a].RacketsInfo.Racket2Ypos = data;
            if(GameObj[a].PlayersInfo.Player2Client != undefined)
              GameObj[a].PlayersInfo.Player2Client.emit('send_player2_data', data);
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
        }
      }
      Player1ID = '';
      console.log("player1 disconnectI");
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
        console.log("player1 disconnectII");
      }
  }
  
