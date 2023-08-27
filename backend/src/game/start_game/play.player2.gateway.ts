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
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { GameObj } from './play.ball.gateway';
  export let Player2ID: string = '',speed2: number = 0,points2: number = 0,enemyusername:string = '',enemyimage:string = '';;
  let none: Socket;
  @WebSocketGateway(1341, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayPlayer2Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket, data): void {
      Player2ID = client.id;
      speed2 = data.Speed;
      points2 = data.Points;
      enemyusername = data.myusername;
      enemyimage = data.myimage;
      console.log(data);
      console.log('Player2Arr_content: ', Player2ID);
    }
    @SubscribeMessage('send_player2_data')
    handleSendUser2Data(client: Socket, data: number): void {
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(GameObj[a].PlayersInfo.Player2ID === client.id)
          {
            if(GameObj[a].PlayersInfo.Player2Client === undefined)
              GameObj[a].PlayersInfo.Player2Client = client;
            GameObj[a].RacketsInfo.Racket1Ypos = data;
            if(GameObj[a].PlayersInfo.Player1Client != undefined)
              GameObj[a].PlayersInfo.Player1Client.emit('send_player1_data', data);
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