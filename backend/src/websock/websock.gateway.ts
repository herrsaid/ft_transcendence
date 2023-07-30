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

@WebSocketGateway(3030, {cors:{
  origin: '*',
  credentials: true}})
export class WebsockGateway {
  constructor(private readonly MessageService:MessageService, private jwtService: JwtService) {}
  @WebSocketServer()
  server: Server;

  online_users = [];
  msg
  handleConnection(socket: Socket)
  {
    try{
      const token = socket.handshake.headers.authorization;
      const payload = jwt.verify(token, 'complexkey3884-asgfgsd,s33003400mmdma-434-4das111!!!!!+++')
      this.online_users.push({socket_id:socket.id,user_id:payload.id})
      console.log(this.online_users, this.online_users.length)
      console.log(this.MessageService.getMessages(payload.id))
      this.msg = this.MessageService.getMessages(payload.id)
    }catch(error){
      console.log('l9lawi ladkhlti')
      socket.disconnect();   
    }
  }
  handleDisconnect(socket: Socket)
  {
    // console.log(socket.id, this.online_users.findIndex(obj => obj.socket_id == socket.id))
    this.online_users.splice(this.online_users.findIndex(obj => obj.socket_id == socket.id), 1);
  }
  getSocketId(dst_id: number)
  {
    for (let i = 0; i < this.online_users.length; i++)
    {
      if (this.online_users[i].user_id == dst_id)
        return this.online_users[i].socket_id;
    }
    throw "user Not online";
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    this.MessageService.create(payload);
    // this.MessagesService.create(payload)
    let dst
    console.log(this.msg.Messages);
    try{
      dst = this.getSocketId(payload.dst);
    }catch (error)
    {
      console.log('user not online');
    }
    client.broadcast.to(dst).emit('message', payload)
    // client.broadcast.emit('message', payload);
    return 'Hello world!';
  }
}
