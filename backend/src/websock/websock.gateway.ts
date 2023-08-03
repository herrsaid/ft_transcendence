import { MessageBody, SubscribeMessage, WebSocketGateway, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/guard/constants';
import { subscribe } from 'diagnostics_channel';
import { PassThrough } from 'stream';
import { Index, Repository } from 'typeorm';
import { MessagesService } from 'Database/services/messages/messages.service';
const jwt = require('jsonwebtoken');
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'Database/entity/Message.entity';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/services/user.service';

@WebSocketGateway(3030, {cors:{
  origin: '*',
  credentials: true}})
export class WebsockGateway {
  constructor(private readonly MessageService:MessageService, private readonly UserService:UserService, private jwtService: JwtService) {}
  @WebSocketServer()
  server: Server;

  online_users = [];
  handleConnection(socket: Socket)
  {
    try{
      const token = socket.handshake.headers.authorization;
      const payload = jwt.verify(token, 'complexkey3884-asgfgsd,s33003400mmdma-434-4das111!!!!!+++')
      this.online_users.push({socket_id:socket.id,user_id:payload.id})
      console.log(this.online_users, this.online_users.length)
      this.UserService.updateStatus(payload.id, {status:true})
    }catch(error){
      console.log('l9lawi ladkhlti')
      socket.disconnect(); 
    }
  }
  handleDisconnect(socket: Socket)
  {
    console.log('disconnected ', socket.id)
    this.online_users.splice(this.online_users.findIndex(obj => obj.socket_id == socket.id), 1);
    this.UserService.updateStatus(this.online_users.find(obj => obj.socket_id == socket.id), {status:false})
  }
  getSocketId(dst_id: number)
  {
    for (let i = 0; i < this.online_users.length; i++)
    {
      if (this.online_users[i].user_id == dst_id)
        return this.online_users[i].socket_id;
    }
    return  "user Not online";
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    this.MessageService.create(payload);
    let dst = this.getSocketId(payload.dst);
    client.broadcast.to(dst).emit('message', payload)
    // client.broadcast.emit('message', payload);
    return 'Hello world!';
  }
}
