import { StreamData } from "../Stream";



export function debug()
{
    console.log("------------------------------");
    console.log("GameWidth: ",StreamData.GameWidth);
    console.log("GameHeight: ",StreamData.GameHeight);
    console.log("BallWidth: ",StreamData.BallWidth);
    console.log("BallHeight: ",StreamData.BallHeight);
    console.log("Racket1Width: ",StreamData.Racket1Width);
    console.log("Racket1Height: ",StreamData.Racket1Height);
    console.log("Racket1Xpos: ",StreamData.Racket1Xpos);
    console.log("Racket2Width: ",StreamData.Racket2Width);
    console.log("Racket2Height: ",StreamData.Racket2Height);
    console.log("Racket2Xpos: ",StreamData.Racket2Xpos);
    console.log("BallXDirection: ",StreamData.BallXDirection);
    console.log("BallYDirection: ",StreamData.BallYDirection);
    console.log("BallXpos: ",StreamData.BallXpos);
    console.log("BallYpos: ",StreamData.BallYpos);
    console.log("Racket1Ypos: ",StreamData.Racket1Ypos);
    console.log("Racket2Ypos: ",StreamData.Racket2Ypos);
    console.log("------------------------------");
}