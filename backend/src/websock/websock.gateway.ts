import * as dotenv from 'dotenv';
dotenv.config();

import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
const jwt = require('jsonwebtoken');
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/services/user.service';
import { GroupsService } from 'Database/services/groups/groups.service';
import { subscribe } from 'diagnostics_channel';
import { GroupusersService } from 'Database/services/groupusers/groupusers.service';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway(3030, {cors:{
  origin: '*',
  credentials: true}})
export class WebsockGateway {
  constructor(private readonly MessageService:MessageService, private readonly UserService:UserService,
     private jwtService: JwtService,
      private readonly GroupsService:GroupsService,
      private readonly UserGroupService:GroupusersService) {}
  @WebSocketServer()
  server: Server;
  getkey = (map, value) => 
  {
    for(let [key, val] of map.entries())
    {
      if (val === value)
        return key
    }
    return null;
  }
  online = new Map()
  async handleConnection(socket: Socket)
  {
    try{
      const token = socket.handshake.headers.authorization;
      const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
      this.online.set(payload.id, socket.id);
      console.log(this.online);
      // const groups = await this.UserService.getGroups(payload.id);
      const groups = await this.UserGroupService.findGroup(payload.id)
      for (let i = 0; i < groups.length; i++)
        socket.join(groups[i].id.toString())
    }catch(error){
      console.log('l9lawi ladkhlti')
      socket.disconnect(); 
    }
  }
  handleDisconnect(socket: Socket)
  {
    console.log('disconnected ', socket.id)
    console.log(this.getkey(this.online, socket.id), 'hada khrej')
    this.online.delete(this.getkey(this.online, socket.id))
    console.log(this.online);
  }
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any){
    // private message
    if (!payload.toGroup)
    {
        this.MessageService.create(payload);
        let dst = this.online.get(payload.dst);
        if(dst)
          client.broadcast.to(dst).emit('message', payload)
    }
    // groups message
    else
    {
      if (await this.UserGroupService.isAbleToSend(payload.src, payload.dst) == true)
      {
        const msg = await this.MessageService.create(payload);
        const group = await this.GroupsService.findOne_messages(payload.dst);
        group.messages.push(msg);
        this.GroupsService.save(group);
        client.broadcast.to(payload.dst.toString()).emit('message',payload);
      }
    }
    return 'Hello world!';
  }
  @SubscribeMessage('status')
  async hadlestatus()
  {}
  @OnEvent('status')
  async handle(payload)
  {
    // let dst = this.online.get(payload.id);
    // if (dst)
    this.server.emit('status', payload)
  }
  @SubscribeMessage('joinroom')
  async handleJoinRoom(client: Socket, payload:any)
  {
    client.join(payload.id.toString());
  }
}
