export class GameDataType
{
    public GameWidth: number;
    public GameHeight: number;
    public GameSpeed: number;
    public BallWidth: number;
    public BallHeight:number;
    public BallXpos: number;
    public BallYpos: number;
    public Racket1Width: number;
    public Racket1Height:number;
    public Racket1Xpos: number;
    public Racket1Ypos: number;
    public Racket2Width: number;
    public Racket2Height:number;
    public Racket2Xpos: number;
    public Racket2Ypos: number;
    public BallXDirection: number;
    public BallYDirection: number;
    public alpha: number;
    public access:boolean;
    public first_conection_val:boolean;
    public message: string; 
    public Result1Val: number;
    public Result2Val: number;
    public Player1UserName:string;
    public Player2UserName:string;
    public Player1Image:string;
    public Player2Image:string;
    constructor ()
    {
        this.GameWidth = 800;
        this.GameHeight = 400;
        this.GameSpeed = 4;
        this.BallWidth = 15;
        this.BallHeight = 15;
        this.BallXpos = 400;
        this.BallYpos = 200;
        this.Racket1Width = 10;
        this.Racket1Height = 60;
        this.Racket1Xpos = 5;
        this.Racket1Ypos = 170;
        this.Racket2Width = 10;
        this.Racket2Height = 60;
        this.Racket2Xpos = 785;
        this.Racket2Ypos = 170;
        this.BallXDirection = 1;
        this.BallYDirection = 1;
        this.alpha = -1;
        this.access = false;
        this.first_conection_val = false;
        this.message = ''; 
        this.Result1Val = 0;
        this.Result2Val = 0;
        this.Player1UserName ="player I";
        this.Player2UserName ="player II";
        this.Player1Image ="/2.jpg";
        this.Player2Image ="/3.jpg";
    }
}
