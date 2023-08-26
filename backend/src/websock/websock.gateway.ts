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
  online = new Map()
  handleConnection(socket: Socket)
  {
    try{
      const token = socket.handshake.headers.authorization;
      const payload = jwt.verify(token, 'complexkey3884-asgfgsd,s33003400mmdma-434-4das111!!!!!+++')
      this.online.set(payload.id, socket.id);
      console.log(this.online);
      this.UserService.updateStatus(payload.id, {status:true})
    }catch(error){
      console.log('l9lawi ladkhlti')
      socket.disconnect(); 
    }
  }
  handleDisconnect(socket: Socket)
  {
    console.log('disconnected ', socket.id)
    this.UserService.updateStatus(this.online_users.find(obj => obj.socket_id == socket.id), {status:false})
    console.log(this.online);
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    this.MessageService.create(payload);
    let dst = this.online.get(payload.dst);
    console.log(dst)
    if(dst)
      client.broadcast.to(dst).emit('message', payload)
    // client.broadcast.emit('message', payload);
    return 'Hello world!';
  }
}
