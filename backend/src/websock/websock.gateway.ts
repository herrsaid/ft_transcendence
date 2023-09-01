import * as dotenv from 'dotenv';
dotenv.config();

import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
const jwt = require('jsonwebtoken');
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/services/user.service';
import { GroupsService } from 'Database/services/groups/groups.service';

@WebSocketGateway(3030, {cors:{
  origin: '*',
  credentials: true}})
export class WebsockGateway {
  constructor(private readonly MessageService:MessageService, private readonly UserService:UserService, private jwtService: JwtService, private readonly GroupsService:GroupsService) {}
  @WebSocketServer()
  server: Server;

  online_users = [];
  online = new Map()
  async handleConnection(socket: Socket)
  {
    try{
      const token = socket.handshake.headers.authorization;
      const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
      this.online.set(payload.id, socket.id);
      console.log(this.online);
      const groups = await this.UserService.getGroups(payload.id);
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
    console.log(this.online);
  }
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any){
    // private message
    if (!payload.toGroup)
    {
      this.MessageService.create(payload);
      let dst = this.online.get(payload.dst);
      console.log(dst)
      if(dst)
        client.broadcast.to(dst).emit('message', payload)
    }
    // groups message
    else
    {
      const msg = await this.MessageService.create(payload);
      const group = await this.GroupsService.findOne_messages(payload.dst);
      group.messages.push(msg);
      this.GroupsService.save(group);
      client.broadcast.to(payload.dst.toString()).emit('message',payload);
    }
    return 'Hello world!';
  }
}
