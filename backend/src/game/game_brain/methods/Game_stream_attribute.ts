import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';



@Injectable()

export class GameStreamAttribute
{
    //attributes
    public SpectatorID: string;
    public SpectatorSocket: Socket| undefined;

    constructor()
    {
        this.SpectatorID = '';
        this.SpectatorSocket = undefined;
    }
}
