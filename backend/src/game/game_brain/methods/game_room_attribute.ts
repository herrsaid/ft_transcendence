import { Injectable } from "@nestjs/common";
import { BallsAttribute } from "./ball_attribute";

@Injectable()
export class GameRommAttribute{
    //attributes
    public GameWidth:number;
    public GameHeight:number;
    public GameSpeed:number;
    public GamePoints: number;
    public GameStatus: number;
    public Alpha: number;
    public Sleep: number;

    constructor()
    {
        this.GameWidth = 800;
        this.GameHeight = 400;
        this.GameSpeed = 1;
        this.GameStatus = 0;
        this.GamePoints = 0;
        this.Alpha = 1;
        this.Sleep = 3000;
    }
}
export let RoomInfo:GameRommAttribute = new GameRommAttribute();
