import { GameDataContextType } from "../GameClass/GameClass";

export function debug(GDC:GameDataContextType)
{
    console.log("------------------------------");
    console.log("GameWidth: ",GDC.GameData.GameWidth);
    console.log("GameHeight: ",GDC.GameData.GameHeight);
    console.log("BallWidth: ",GDC.GameData.BallWidth);
    console.log("BallHeight: ",GDC.GameData.BallHeight);
    console.log("Racket1Width: ",GDC.GameData.Racket1Width);
    console.log("Racket1Height: ",GDC.GameData.Racket1Height);
    console.log("Racket1Xpos: ",GDC.GameData.Racket1Xpos);
    console.log("Racket2Width: ",GDC.GameData.Racket2Width);
    console.log("Racket2Height: ",GDC.GameData.Racket2Height);
    console.log("Racket2Xpos: ",GDC.GameData.Racket2Xpos);
    console.log("BallXDirection: ",GDC.GameData.BallXDirection);
    console.log("BallYDirection: ",GDC.GameData.BallYDirection);
    console.log("BallXpos: ",GDC.GameData.BallXpos);
    console.log("BallYpos: ",GDC.GameData.BallYpos);
    console.log("Racket1Ypos: ",GDC.GameData.Racket1Ypos);
    console.log("Racket2Ypos: ",GDC.GameData.Racket2Ypos);
    console.log("------------------------------");
}