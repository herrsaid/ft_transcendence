
import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';

@Injectable()
export class OnlineClass{
    //attributes
    public Player: string;
    public PlayerSocket: Socket | undefined;
    constructor()
    {
        this.Player = '';
        this.PlayerSocket = undefined;
    }
}
