import { Injectable } from "@nestjs/common";
import { data } from "./game_server_obj";
@Injectable()
export class GameLogic
{
    debug(data:data)
    {
         console.log("------------------------------------");
        console.log("data.BallXpos: "+ data.BallInfo.BallXpos);
        console.log("data.BallYpos: "+ data.BallInfo.BallYpos);
        console.log("data.BallXdirection: "+ data.BallInfo.BallXdirection);
        console.log("data.BallYdirection: "+ data.BallInfo.BallYdirection);
        console.log("data.BallWidth: "+ data.BallInfo.BallWidth);
        console.log("data.BallHeight: "+ data.BallInfo.BallHeight);
        console.log("data.Racket1Height: "+ data.RacketsInfo.Racket1Height);
        console.log("data.Racket1Ypos: "+ data.RacketsInfo.Racket1Ypos);
        console.log("data.Racket1Width: "+ data.RacketsInfo.Racket1Width);
        console.log("data.Racket1Xpos: "+ data.RacketsInfo.Racket1Xpos);
        console.log("data.Racket2Height: "+ data.RacketsInfo.Racket2Height);
        console.log("data.Racket2Ypos: "+ data.RacketsInfo.Racket2Ypos);
        console.log("data.Racket2Width: "+ data.RacketsInfo.Racket2Width);
        console.log("data.Racket1Xpos: "+ data.RacketsInfo.Racket2Xpos);
        console.log("data.Player1ID: "+ data.PlayersInfo.Player1ID);
        console.log("data.Player2ID: "+ data.PlayersInfo.Player2ID);
        console.log("data.GameWidth "+ data.RoomInfo.GameWidth);
        console.log("data.GameHeight "+ data.RoomInfo.GameHeight);
        console.log("data.GameStatus "+ data.RoomInfo.GameStatus );
        console.log("data.GameSpeed "+ data.RoomInfo.GameSpeed );
        console.log("data.GamePoints "+ data.RoomInfo.GamePoints );
        console.log("data.Alpha "+ data.RoomInfo.Alpha);
        console.log("data.Sleep "+ data.RoomInfo.Sleep);
        console.log("------------------------------------");
    }
    CheckAlpha(data:data,BallYpos: number, RacketYpos: number, RacketHeight: number)
    {
        let ballYpos_racket: number;
        if(BallYpos > RacketYpos || BallYpos < (RacketYpos + RacketHeight))
        ballYpos_racket = BallYpos - RacketYpos;
        else
        ballYpos_racket = 0;
        let ballYpos_racket_par_100: number = Math.floor((ballYpos_racket/(RacketHeight/10)));
        data.RoomInfo.Alpha = ballYpos_racket_par_100 - (10 - ballYpos_racket_par_100);
        Math.floor(data.RoomInfo.Alpha);
        if(data.RoomInfo.Alpha === -10|| data.RoomInfo.Alpha === 10)
        data.RoomInfo.Alpha = 9;
        if(data.RoomInfo.Alpha > 0)
        data.RoomInfo.Alpha -= 10;
        else if(data.RoomInfo.Alpha < 0)
        data.RoomInfo.Alpha += 10;
        if(ballYpos_racket_par_100 > 5)
        data.BallInfo.BallYdirection = 1;
        else
        data.BallInfo.BallYdirection = -1;
    }
    Head(data:data)
    {
        // this.debug(data);
        data.BallInfo.BallXpos += (data.BallInfo.BallXdirection * data.RoomInfo.GameSpeed);
        if(data.BallInfo.BallYpos < data.RacketsInfo.Racket2Ypos || data.BallInfo.BallYpos > (data.RacketsInfo.Racket2Ypos + data.RacketsInfo.Racket2Height))
        {
            if(data.BallInfo.BallXpos > data.RoomInfo.GameWidth)
            {
                data.BallInfo.BallXdirection = -1;
                if(++data.PlayersInfo.Result1Val >= data.RoomInfo.GamePoints)
                    data.RoomInfo.GameStatus = 0;
                data.BallInfo.BallXpos = data.RoomInfo.GameWidth/2;
                data.RoomInfo.Sleep = 3000;
            }
        }
        else
        {
            if(data.BallInfo.BallXpos > (data.RoomInfo.GameWidth-data.BallInfo.BallWidth))
            {
                data.BallInfo.BallXdirection = -1;
                this.CheckAlpha(data,data.BallInfo.BallYpos,data.RacketsInfo.Racket2Ypos,data.RacketsInfo.Racket2Height);
            }
        }
        if(data.BallInfo.BallYpos < data.RacketsInfo.Racket1Ypos || data.BallInfo.BallYpos > (data.RacketsInfo.Racket1Ypos + data.RacketsInfo.Racket1Height))
        {
            if(data.BallInfo.BallXpos < 0)
            {
                data.BallInfo.BallXdirection = +1;
                if(++data.PlayersInfo.Result2Val >= data.RoomInfo.GamePoints)
                    data.RoomInfo.GameStatus = 0;
                data.BallInfo.BallXpos = data.RoomInfo.GameWidth/2;
                data.RoomInfo.Sleep = 3000;
            }
        }
        else
        {
            if(data.BallInfo.BallXpos < data.BallInfo.BallWidth)
            {
                data.BallInfo.BallXdirection = +1;
                this.CheckAlpha(data,data.BallInfo.BallYpos,data.RacketsInfo.Racket1Ypos,data.RacketsInfo.Racket1Height);
            }
        }
        if(data.BallInfo.BallXpos % data.RoomInfo.Alpha === 0)
        {
            if(data.BallInfo.BallYpos > data.RoomInfo.GameHeight-data.BallInfo.BallHeight/2)
                data.BallInfo.BallYdirection = -1;
            if(data.BallInfo.BallYpos < data.BallInfo.BallHeight/2)
                data.BallInfo.BallYdirection = +1;
            data.BallInfo.BallYpos += (data.BallInfo.BallYdirection * data.RoomInfo.GameSpeed);
        }
    }
}

export let LogicFunc:GameLogic = new GameLogic();