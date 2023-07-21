// import { Injectable } from "@nestjs/common";
// import { BallsAttribute } from "./ball_attribute";
// import { Socket } from 'socket.io';

// @Injectable()
// export class GameAttribute extends BallsAttribute{
//     //attributes
//     protected GameWidth:number;
//     protected GameHeight:number;
//     protected GameSpeed:number;
//     protected Result1Val: number;
//     protected Result2Val: number;
//     protected Player1ID: string;
//     protected Player2ID: string;
//     protected Player1Client: Socket;
//     protected Player2Client: Socket;
//     protected Alpha: number;
//     protected Sleep: number;
    
//     //Constructor
//     constructor()
//     {
//         super()
//         {
//             this.GameWidth = 800;
//             this.GameHeight = 400;
//             this.GameSpeed = 2;
//             this.Result1Val = 0;
//             this.Result2Val = 0;
//             this.Player1ID = '';
//             this.Player2ID = '';
//             this.Alpha = 1;
//             this.Sleep = 0
//             this.BallXpos = this.GameWidth/2;
//             this.BallYpos = this.GameHeight/2;
//             this.BallXdirection = 1;
//             this.BallYdirection = 1;
//             this.BallWidth = this.GameWidth/32;
//             this.BallHeight =  this.GameHeight/16;
//             this.Racket1Height = Math.floor(this.GameHeight/6);
//             this.Racket1Ypos =  (this.GameHeight/2) - (this.Racket1Height/2);
//             this.Racket1Width = this.GameWidth/80;
//             this.Racket1Xpos = 5;
//             this.Racket2Height = Math.floor(this.GameHeight/6);
//             this.Racket2Ypos = (this.GameHeight/2) - (this.Racket1Height/2);
//             this.Racket2Width = this.GameWidth/80;
//             this.Racket2Xpos = this.GameWidth - (this.Racket2Width-5);
//         };
//     }
//     //Getters & Setters
//     SetGameWidth(GameWidth: number)
//     {
//         this.GameWidth = GameWidth;
//     }
//     SetGameHiegh(GameHieght: number)
//     {
//         this.GameHeight = GameHieght;
//     }
//     SetGameSpeed(GameSpeed: number)
//     {
//         this.GameSpeed = GameSpeed;
//     }
//     SetPlayer1ID(Player1: string)
//     {
//         this.Player1ID = Player1;
//     }
//     SetPlayer2ID(Player2: string)
//     {
//         this.Player2ID = Player2;
//     }
//     GetPlayer1ID(): string
//     {
//         return this.Player1ID;
//     }
//     GetPlayer2ID(): string
//     {
//         return this.Player2ID;
//     }
//     SetPlayer1Client(Player2Client: Socket)
//     {
//         this.Player2Client = Player2Client;
//     }
//     SetPlayer2Client(Player2Client: Socket)
//     {
//         this.Player2Client = Player2Client;
//     }
//     GetPlayer1Client(): Socket
//     {
//         return this.Player1Client;
//     }
//     GetPlayer2Client(): Socket
//     {
//         return this.Player2Client;
//     }
//     SetSleep(Sleep:number)
//     {
//         this.Sleep = Sleep;
//     }
//     GetSleep():number 
//     {
//         return this.Sleep;
//     }
//     GetResult1Val():number 
//     {
//         return this.Result1Val;
//     }
//     GetResult2Val():number 
//     {
//         return this.Result2Val;
//     }
// }
