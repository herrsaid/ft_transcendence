import { MessageBody, SubscribeMessage, WebSocketGateway, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io'

@WebSocketGateway(3030)
export class WebsockGateway {

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, client: Socket, payload: any): string {
    console.log(data);
    this.server.emit('message', "safi tsifet binaja7");
    return 'Hello world!';
  }
}
