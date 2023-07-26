import { MessageBody, SubscribeMessage, WebSocketGateway, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { subscribe } from 'diagnostics_channel';
import { PassThrough } from 'stream';
import { Index } from 'typeorm';
const jwt = require('jsonwebtoken');

@WebSocketGateway(3030, {cors:{
  origin: '*',
  credentials: true}})
export class WebsockGateway {
  constructor(private jwtService: JwtService) {}
  @WebSocketServer()
  server: Server;

  online_users = [];
  user_id:number;
  handleConnection(socket: Socket)
  {
    try{
      const token = socket.handshake.headers.authorization;
      const payload = jwt.verify(token, 'complexkey3884-asgfgsd,s33003400mmdma-434-4das111!!!!!+++')
      this.user_id = payload.id;
      this.online_users.push({socket_id:socket.id,user_id:payload.id})
      console.log(this.online_users, this.online_users.length)
    }catch(error){
      console.log('l9lawi ladkhlti')
      socket.disconnect();   
    }
  }
  handleDisconnect(socket: Socket)
  {
    this.online_users.splice(this.online_users.findIndex(obj => obj.socket_id = socket.id), 1);
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
    let dst
    try{
      dst = this.getSocketId(payload.dst);
    }catch (error)
    {
      console.log('user not online');
    }
    client.broadcast.to(dst).emit('message', payload.content)
    // client.broadcast.emit('message', payload);
    return 'Hello world!';
  }
}
