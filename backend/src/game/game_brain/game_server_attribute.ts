import { Injectable } from "@nestjs/common";
import { BallsAttribute } from "./ball_attribute";

@Injectable()
export class GameAttribute extends BallsAttribute{
    //attributes
    protected GameWidth:number;
    protected GameHeight:number;
    protected GameSpeed:number;
    protected Result1Val: number;
    protected Result2Val: number;
    protected Alpha: number;
    protected Sleep: number;
    //Constructor
    constructor()
    {
        super()
        {
            this.GameWidth = 800;
            this.GameHeight = 400;
            this.GameSpeed = 2;
            this.Alpha = 1;
            this.Sleep = 0
            this.BallXpos = this.GameWidth/2;
            this.BallYpos = this.GameHeight/2;
            this.BallXdirection = 1;
            this.BallYdirection = 1;
            this.BallWidth = this.GameWidth/32;
            this.BallHeight =  this.GameHeight/16;
            this.Racket1Height = this.GameHeight/6;
            this.Racket1Ypos =  (this.GameHeight/2) - (this.Racket1Height/2);
            this.Racket1Width = this.GameWidth/80;
            this.Racket1Xpos = 5;
            this.Racket2Height = this.GameHeight/6;
            this.Racket2Ypos = (this.GameHeight/2) - (this.Racket1Height/2);
            this.Racket2Width = this.GameWidth/80;
            this.Racket2Xpos = this.GameWidth - (this.Racket2Width-5);
        };
    }
    //Getters & Setters
    SetGameWidth(GameWidth: number)
    {
        this.GameWidth = GameWidth;
    }
    SetGameHiegh(GameHieght: number)
    {
        this.GameHeight = GameHieght;
    }
    SetGameSpeed(GameSpeed: number)
    {
        this.GameSpeed = GameSpeed;
    }
    SetSleep(Sleep:number)
    {
        this.Sleep = Sleep;
    }
    GetSleep():number 
    {
        return this.Sleep;
    }
    GetResult1Val():number 
    {
        return this.Result1Val;
    }
    GetResult2Val():number 
    {
        return this.Result2Val;
    }
}
