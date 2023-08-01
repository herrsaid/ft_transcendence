import { Injectable } from "@nestjs/common";
import { RoomInfo } from "./game_room_attribute";

@Injectable()
export class RacketsAttribute
{
    //attributes
    public Racket1Xpos: number;
    public Racket1Ypos: number;
    public Racket1Height: number;
    public Racket1Width: number;
    public Racket2Xpos: number;
    public Racket2Ypos: number;
    public Racket2Height: number;
    public Racket2Width: number;
    constructor()
    {
        this.Racket1Height = Math.floor(RoomInfo.GameHeight/6);
        this.Racket1Ypos =  (RoomInfo.GameHeight/2) - (this.Racket1Height/2);
        this.Racket1Width = RoomInfo.GameWidth/80;
        this.Racket1Xpos = 5;
        this.Racket2Height = Math.floor(RoomInfo.GameHeight/6);
        this.Racket2Ypos = (RoomInfo.GameHeight/2) - (this.Racket1Height/2);
        this.Racket2Width = RoomInfo.GameWidth/80;
        this.Racket2Xpos = RoomInfo.GameWidth - (this.Racket2Width-5);
    }
}

