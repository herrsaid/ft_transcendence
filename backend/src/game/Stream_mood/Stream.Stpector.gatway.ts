/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Stream.Stpector.gatway.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:10 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/04 13:14:58 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { GameStreamAttribute } from '../game_brain/methods/Game_stream_attribute';
  import { GameObj } from '../start_game/play.ball.gateway';
  let none: Socket;
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class PlaySpactatorGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('LoadStream')
    handleLoadStream(client: Socket): void {
      client.emit("LoadStream",GameObj.length);
    }
    @SubscribeMessage('new_spectator')
    handleNewSpectator(client: Socket,RoomNumber: number): void {
      if(GameObj.length && GameObj[RoomNumber] !== undefined)
        GameObj[RoomNumber].StreamsInfo.push(new GameStreamAttribute);
      console.log('new_spectator at: ',RoomNumber,GameObj[RoomNumber].StreamsInfo.length );
      if(GameObj.length
        && GameObj[RoomNumber] !== undefined
        && GameObj[RoomNumber].StreamsInfo[GameObj[RoomNumber].StreamsInfo.length - 1] !== undefined)
      {
        GameObj[RoomNumber].StreamsInfo[GameObj[RoomNumber].StreamsInfo.length - 1].SpectatorID = client.id;
        GameObj[RoomNumber].StreamsInfo[GameObj[RoomNumber].StreamsInfo.length - 1].SpectatorSocket = client;
      }
    }
	@SubscribeMessage('spectator_leave')
	handleconection_closed(client: Socket): void {
    if(GameObj)
    {
      for(let a = 0 ; a<GameObj.length; a++ )
      { 
        if(GameObj[a].PlayersInfo.Player1ID === client.id)
        { 
          GameObj[a].RoomInfo.GameStatus = 0;
          GameObj[a].PlayersInfo.Player1ID = '';
        }
      }
    }
  }
    handleDisconnect(client: Socket): void {
      if(GameObj)
      {
        for(let a = 0 ; a<GameObj.length; a++ )
        { 
          if(GameObj[a].PlayersInfo.Player1ID === client.id)
          { 
            GameObj[a].RoomInfo.GameStatus = 0;
            GameObj[a].PlayersInfo.Player1ID = '';
          }
        }
      }
    }
  }
  
