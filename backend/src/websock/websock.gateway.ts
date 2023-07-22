import { MessageBody, SubscribeMessage, WebSocketGateway, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
const jwt = require('jsonwebtoken');

@WebSocketGateway(3030, {cors:{
  origin: '*',
  credentials: true}})
export class WebsockGateway {
  constructor(private jwtService: JwtService) {}
  @WebSocketServer()
  server: Server;
  handleConnection(socket: Socket)
  {
    try{
      const token = socket.handshake.headers.authorization;
      console.log(jwt.verify(token, 'complexkey3884-asgfgsd,s33003400mmdma-434-4das111!!!!!+++'))
    }catch(error){
      console.log('l9lawi ladkhlti')
      socket.disconnect();
    }
  }
  handleMessage(client: Socket, payload: any): string {
    console.log('client.handshake');
    this.server.emit('message', payload);
    return 'Hello world!';
  }
}
