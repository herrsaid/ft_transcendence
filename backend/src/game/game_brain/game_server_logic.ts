import { Injectable } from "@nestjs/common";
import { GameAttribute } from "./game_server_attribute";

@Injectable()
export class GameLogic extends GameAttribute{
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
        console.log("------------------------------------");
        console.log("this.BallXpos: "+ this.BallXpos);
        console.log("this.BallYpos: "+ this.BallYpos);
        console.log("this.BallXdirection: "+ this.BallXdirection);
        console.log("this.BallYdirection: "+ this.BallYdirection);
        console.log("this.BallWidth: "+ this.BallWidth);
        console.log("this.BallHeight: "+ this.BallHeight);
        console.log("this.Racket1Height: "+ this.Racket1Height);
        console.log("this.Racket1Ypos: "+ this.Racket1Ypos);
        console.log("this.Racket1Width: "+ this.Racket1Width);
        console.log("this.Racket1Xpos: "+ this.Racket1Xpos);
        console.log("this.Racket2Height: "+ this.Racket2Height);
        console.log("this.Racket2Ypos: "+ this.Racket2Ypos);
        console.log("this.Racket2Width: "+ this.Racket2Width);
        console.log("this.Racket1Xpos: "+ this.Racket2Xpos);
        console.log("this.GameWidth "+ this.GameWidth);
        console.log("this.GameHeight "+ this.GameHeight);
        console.log("this.GameSpeed "+ this.GameSpeed );
        console.log("this.Alpha "+ this.Alpha);
        console.log("this.Sleep "+ this.Sleep);
        console.log("------------------------------------");

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

export let GameHead = new GameLogic();
