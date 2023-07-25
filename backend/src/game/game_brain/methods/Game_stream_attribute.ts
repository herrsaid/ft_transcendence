import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';



@Injectable()

export class GameStream
{
    public SpectatorID: string;
    public SpectatorSocket: Socket;

    constructor()
    {
        this.SpectatorID = '';
        this.SpectatorSocket = null;
    }
}