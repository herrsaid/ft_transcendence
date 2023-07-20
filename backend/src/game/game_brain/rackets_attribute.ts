import { Injectable } from "@nestjs/common";

@Injectable()
export class RacketsAttribute
{
    //attributes
    protected Racket1Xpos: number;
    protected Racket1Ypos: number;
    protected Racket1Height: number;
    protected Racket1Width: number;
    protected Racket2Xpos: number;
    protected Racket2Ypos: number;
    protected Racket2Height: number;
    protected Racket2Width: number;
    
    //Setters
    SetRacket1Ypos(Racket1Ypos: number)
    {
        this.Racket1Ypos = Racket1Ypos;
    }
    SetRacket2Ypos(Racket2Ypos: number)
    {
        this.Racket2Ypos = Racket2Ypos;
    }
}