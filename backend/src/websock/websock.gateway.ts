import { MessageBody, SubscribeMessage, WebSocketGateway, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway(3030)
export class WebsockGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, client: Socket, payload: any): string {
    console.log(data);
    return 'Hello world!';
  }
}
