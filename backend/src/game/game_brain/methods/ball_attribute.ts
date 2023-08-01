import { Injectable } from "@nestjs/common";
import { RoomInfo } from "./game_room_attribute";
@Injectable()
export class BallsAttribute
{
    //attributes
    public BallXpos:number;
    public BallYpos:number;
    public BallXdirection: number;
    public BallYdirection: number;
    public BallWidth: number;
    public BallHeight: number;
    constructor()
    {
        this.BallXpos = RoomInfo.GameWidth/2;
        this.BallYpos = RoomInfo.GameHeight/2;
        this.BallXdirection = 1;
        this.BallYdirection = 1;
        this.BallWidth = RoomInfo.GameWidth/32;
        this.BallHeight =  RoomInfo.GameHeight/16;
    }
}

export let BallInfo:BallsAttribute = new BallsAttribute();
