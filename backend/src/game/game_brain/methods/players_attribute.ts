import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';

@Injectable()
export class PlayersAttribute
{
    //attributes
    public Result1Val: number;
    public Result2Val: number;
    public Player1ID: string;
    public Player2ID: string;
    public Player1UserName: string;
    public Player2UserName: string;
    public Player1Client: Socket;
    public Player2Client: Socket;

    constructor()
    {
        this.Result1Val = 0;
        this.Result2Val = 0;
        this.Player1ID = '';
        this.Player2ID = '';
    }
}

export let PlayersInfo:PlayersAttribute = new PlayersAttribute();
