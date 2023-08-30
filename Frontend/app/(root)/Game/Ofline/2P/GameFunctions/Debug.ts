import { GameData } from "../Component/Game";



export function debug()
{
    console.log("------------------------------");
    console.log("GameWidth: ",GameData.GameWidth);
    console.log("GameHeight: ",GameData.GameHeight);
    console.log("BallWidth: ",GameData.BallWidth);
    console.log("BallHeight: ",GameData.BallHeight);
    console.log("Racket1Width: ",GameData.Racket1Width);
    console.log("Racket1Height: ",GameData.Racket1Height);
    console.log("Racket1Xpos: ",GameData.Racket1Xpos);
    console.log("Racket2Width: ",GameData.Racket2Width);
    console.log("Racket2Height: ",GameData.Racket2Height);
    console.log("Racket2Xpos: ",GameData.Racket2Xpos);
    console.log("BallXDirection: ",GameData.BallXDirection);
    console.log("BallYDirection: ",GameData.BallYDirection);
    console.log("BallXpos: ",GameData.BallXpos);
    console.log("BallYpos: ",GameData.BallYpos);
    console.log("Racket1Ypos: ",GameData.Racket1Ypos);
    console.log("Racket2Ypos: ",GameData.Racket2Ypos);
    console.log("------------------------------");
}