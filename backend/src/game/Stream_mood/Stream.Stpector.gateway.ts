/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Stream.Stpector.gatway.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:10 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/07 23:34:38 by mabdelou         ###   ########.fr       */
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
  import { GameObj } from '../game_brain/logic/Brain';
import { NewSpectator } from '../PingPong.dto';
import { JwtService } from '@nestjs/jwt';

const jwt = require('jsonwebtoken');

  let none: Socket;
  @WebSocketGateway(1342, {
    cors: { origin: '*', credentials: true },
  })
  export class PlaySpactatorGateway implements OnGatewayDisconnect {
    constructor(private jwtService: JwtService)
    {
      
    };
    async handleConnection(socket: Socket)
    {
      try{
        const token = socket.handshake.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        
      }catch(error){
        socket.disconnect(); 
      }
    }
    @SubscribeMessage('LoadStream')
    handleLoadStream(client: Socket): void {
      try{
      client.emit("LoadStream",GameObj.length);
      }
      catch{}
    }
    @SubscribeMessage('new_spectator')
    handleNewSpectator(client: Socket,data: NewSpectator): void {
      try{
      const RoomNumber = data.RoomNumber;
      if(GameObj.length && GameObj[RoomNumber] !== undefined)
      {
        if(GameObj[RoomNumber].StreamsInfo.find(elem =>elem.SpectatorUser === data.User) !== undefined)
        {
          client.emit("LoadStreamFail","you can't watch two times");
          return ;
        }
        else if(data.User === GameObj[RoomNumber].PlayersInfo.Player1UserName
            || data.User === GameObj[RoomNumber].PlayersInfo.Player2UserName)
        {
          client.emit("LoadStreamFail","you can't watch yourself");
          return ;
        }
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(GameObj[a].StreamsInfo.find(elem =>elem.SpectatorUser === data.User) !== undefined)
          {
            client.emit("LoadStreamFail","you already register as spectator in another room");
            return ;
          }
        }
        GameObj[RoomNumber].StreamsInfo.push(new GameStreamAttribute);
        client.emit("LoadStreamAccept");
      }
      else
      {
        client.emit("LoadStreamFail","please try later...");
        return ;
      }
      if(GameObj.length
        && GameObj[RoomNumber] !== undefined
        && GameObj[RoomNumber].StreamsInfo[GameObj[RoomNumber].StreamsInfo.length - 1] !== undefined)
      {
        GameObj[RoomNumber].StreamsInfo[GameObj[RoomNumber].StreamsInfo.length - 1].SpectatorID = client.id;
        GameObj[RoomNumber].StreamsInfo[GameObj[RoomNumber].StreamsInfo.length - 1].SpectatorUser = data.User;
        GameObj[RoomNumber].StreamsInfo[GameObj[RoomNumber].StreamsInfo.length - 1].SpectatorSocket = client;
      }
    }
    catch{}
    }
	  @SubscribeMessage('spectator_leave')
    handleconection_closed(client: Socket): void {
      try
      {
        if(GameObj)
        {
          for(let a = 0 ; a<GameObj.length; a++ )
          {
            GameObj[a].StreamsInfo = GameObj[a].StreamsInfo.filter((elem)=>elem.SpectatorID !== client.id);
            client.emit('SimulationEnd','you are no longger in spectator mood');
          }
        }
      }
      catch{}
    }
    handleDisconnect(client: Socket): void {
      try
      {
        if(GameObj)
        {
          for(let a = 0 ; a<GameObj.length; a++ )
          {
            GameObj[a].StreamsInfo = GameObj[a].StreamsInfo.filter((elem)=>elem.SpectatorID !== client.id);
            client.emit('SimulationEnd','you are no longger in spectator mood');
          }
        }
      }
      catch{}
    }
  }
  
