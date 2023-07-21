import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';

@Injectable()
export class GameHead{
    //attributes
    protected GameWidth:number;
    protected GameHeight:number;
    protected GameSpeed:number;
    protected Result1Val: number;
    protected Result2Val: number;
    protected Player1ID: string;
    protected Player2ID: string;
    protected Player1Client: Socket;
    protected Player2Client: Socket;
    protected Alpha: number;
    protected Sleep: number;
    protected GameStatus: number;
    protected BallXpos:number;
    protected BallYpos:number;
    protected BallXdirection: number;
    protected BallYdirection: number;
    protected BallWidth: number;
    protected BallHeight: number;
    protected Racket1Xpos: number;
    protected Racket1Ypos: number;
    protected Racket1Height: number;
    protected Racket1Width: number;
    protected Racket2Xpos: number;
    protected Racket2Ypos: number;
    protected Racket2Height: number;
    protected Racket2Width: number;
    //Constructor
    constructor()
    {
        this.GameWidth = 800;
        this.GameHeight = 400;
        this.GameSpeed = 2;
        this.Result1Val = 0;
        this.Result2Val = 0;
        this.Player1ID = '';
        this.Player2ID = '';
        this.Alpha = 1;
        this.Sleep = 0;
        this.GameStatus = 0;
        this.BallXpos = this.GameWidth/2;
        this.BallYpos = this.GameHeight/2;
        this.BallXdirection = 1;
        this.BallYdirection = 1;
        this.BallWidth = this.GameWidth/32;
        this.BallHeight =  this.GameHeight/16;
        this.Racket1Height = Math.floor(this.GameHeight/6);
        this.Racket1Ypos =  (this.GameHeight/2) - (this.Racket1Height/2);
        this.Racket1Width = this.GameWidth/80;
        this.Racket1Xpos = 5;
        this.Racket2Height = Math.floor(this.GameHeight/6);
        this.Racket2Ypos = (this.GameHeight/2) - (this.Racket1Height/2);
        this.Racket2Width = this.GameWidth/80;
        this.Racket2Xpos = this.GameWidth - (this.Racket2Width-5);
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
    GetGameStatus(): number
    {
       return  this.GameStatus;
    }
    SetGameStatus(GameStatus: number)
    {
        this.GameStatus = GameStatus;
    }
    SetPlayer1ID(Player1: string)
    {
        this.Player1ID = Player1;
    }
    SetPlayer2ID(Player2: string)
    {
        this.Player2ID = Player2;
    }
    GetPlayer1ID(): string
    {
        return this.Player1ID;
    }
    GetPlayer2ID(): string
    {
        return this.Player2ID;
    }
    SetPlayer1Client(Player1Client: Socket)
    {
        this.Player1Client = Player1Client;
    }
    SetPlayer2Client(Player2Client: Socket)
    {
        this.Player2Client = Player2Client;
    }
    GetPlayer1Client(): Socket
    {
        return this.Player1Client;
    }
    GetPlayer2Client(): Socket
    {
        return this.Player2Client;
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
    GetBallXpos():number 
    {
        return this.BallXpos;
    }
    GetBallYpos():number 
    {
        return this.BallYpos;
    }
    SetRacket1Ypos(Racket1Ypos: number)
    {
        this.Racket1Ypos = Racket1Ypos;
    }
    SetRacket2Ypos(Racket2Ypos: number)
    {
        this.Racket2Ypos = Racket2Ypos;
    }
    CheckAlpha(BallYpos: number, RacketYpos: number, RacketHeight: number): undefined
    {
        let ballYpos_racket: number;
        if(BallYpos > RacketYpos || BallYpos < (RacketYpos + RacketHeight))
          ballYpos_racket = BallYpos - RacketYpos;
        else
          ballYpos_racket = 0;
        let ballYpos_racket_par_100: number = Math.floor((ballYpos_racket/(RacketHeight/10)));
        this.Alpha = ballYpos_racket_par_100 - (10 - ballYpos_racket_par_100);
        Math.floor(this.Alpha);
        if(this.Alpha === -10|| this.Alpha === 10)
          this.Alpha = 9;
        if(this.Alpha > 0)
          this.Alpha -= 10;
        else if(this.Alpha < 0)
          this.Alpha += 10;
        if(ballYpos_racket_par_100 > 5)
          this.BallYdirection = 1;
        else
          this.BallYdirection = -1;
    }
    test()
    {
        // console.log("------------------------------------");
        // console.log("this.BallXpos: "+ this.BallXpos);
        // console.log("this.BallYpos: "+ this.BallYpos);
        // console.log("this.BallXdirection: "+ this.BallXdirection);
        // console.log("this.BallYdirection: "+ this.BallYdirection);
        // console.log("this.BallWidth: "+ this.BallWidth);
        // console.log("this.BallHeight: "+ this.BallHeight);
        // console.log("this.Racket1Height: "+ this.Racket1Height);
        // console.log("this.Racket1Ypos: "+ this.Racket1Ypos);
        // console.log("this.Racket1Width: "+ this.Racket1Width);
        // console.log("this.Racket1Xpos: "+ this.Racket1Xpos);
        // console.log("this.Racket2Height: "+ this.Racket2Height);
        // console.log("this.Racket2Ypos: "+ this.Racket2Ypos);
        // console.log("this.Racket2Width: "+ this.Racket2Width);
        // console.log("this.Racket1Xpos: "+ this.Racket2Xpos);
        // console.log("this.GameWidth "+ this.GameWidth);
        // console.log("this.GameHeight "+ this.GameHeight);
        // console.log("this.GameSpeed "+ this.GameSpeed );
        // console.log("this.Alpha "+ this.Alpha);
        // console.log("this.Sleep "+ this.Sleep);
        // console.log("------------------------------------");

        this.BallXpos += (this.BallXdirection * this.GameSpeed);
        if(this.BallYpos < this.Racket2Ypos || this.BallYpos > (this.Racket2Ypos + this.Racket2Height))
        {
            if(this.BallXpos > this.GameWidth)
            {
                this.BallXdirection = -1;
                this.Result1Val++;
                this.BallXpos = this.GameWidth/2;
                this.Sleep = 3000;
            }
        }
        else
        {
            if(this.BallXpos > (this.GameWidth-this.BallWidth))
            {
                this.BallXdirection = -1;
                this.CheckAlpha(this.BallYpos,this.Racket2Ypos,this.Racket2Height);
            }
        }
        if(this.BallYpos < this.Racket1Ypos || this.BallYpos > (this.Racket1Ypos + this.Racket1Height))
        {
            if(this.BallXpos < 0)
            {
                this.BallXdirection = +1;
                this.Result2Val++;
                this.BallXpos = this.GameWidth/2;
                this.Sleep = 3000;
            }
        }
        else
        {
            if(this.BallXpos < this.BallWidth)
            {
                this.BallXdirection = +1;
                this.CheckAlpha(this.BallYpos,this.Racket1Ypos,this.Racket1Height);
            }
        }
        if(this.BallXpos % this.Alpha === 0)
        {
            if(this.BallYpos > this.GameHeight-this.BallHeight/2)
            this.BallYdirection = -1
            if(this.BallYpos < this.BallHeight/2)
            this.BallYdirection = +1
            this.BallYpos += this.BallYdirection;
        }
    }
}
