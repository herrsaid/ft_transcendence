'use client'

import { useEffect,useContext,useState } from "react";
import p5 from "p5";
import './Stream.css';
import StreamInfoContext,{StreamInfoType,StreamInfoStateType,GetStreamInfoContext, StreamContextType} from '../../Stream/StreamContext/StreamContext'

import UserContext from "@/app/(root)/UserContext";
import { stream } from '../Socket/start_stream_socket';

let GameWidth: number = 800, GameHeight: number = 400, GameSpeed: number = 4;
let BallWidth: number = GameWidth/52, BallHeight = GameHeight/26, BallXpos: number = GameWidth/2, BallYpos: number = GameHeight/2;
let Racket1Width: number = GameWidth/80, Racket1Height =  Math.floor(GameHeight/6), Racket1Xpos: number = 5, Racket1Ypos: number = (GameHeight/2) - (Racket1Height/2);
let Racket2Width: number = GameWidth/80, Racket2Height =  Math.floor(GameHeight/6), Racket2Xpos: number = GameWidth-15, Racket2Ypos: number = (GameHeight/2) - (Racket1Height/2);
let Result1Val: number = 0;
let Result2Val: number = 0;
let first_conection_val:boolean=false, message: string = '';
let Player1UserName:string ="player I",Player2UserName:string ="player II";
let Player1Image:string ="/2.jpg",Player2Image:string ="/3.jpg";



function ConvertServerData(ServerData:number,Mood:number)
{
  if(Mood)
    return(Math.floor(((ServerData* 100)/800)* (GameWidth/100)));
  return(Math.floor(((ServerData* 100)/400)* (GameHeight/100)));
}

function Ball(p5: p5, x: number, y: number, w: number, h: number)
{
  p5.fill(255,255,255);
  p5.ellipse(x, y, w, h);
}
function LineCenter(p5: p5)
{
  p5.fill('yellow');
  for(let a=0;a<GameWidth/2;a+=35)
    p5.rect(GameWidth/2, a, 5, 30,20);
}
function Racket1(p5: p5, x: number, y: number, w: number, h: number)
{
  p5.fill('blue');
  p5.rect(x, y, w, h,10);
}

function Racket2(p5: p5, x: number, y: number, w: number, h: number)
{
  p5.fill('red');
  p5.rect(x, y, w, h,10);
}

function first_conection(StreamContext:StreamContextType)
{
  if(first_conection_val === false)
		{
			first_conection_val = true;
      stream.emit("new_spectator",StreamContext.StreamInfo.RoomNumber);
		}
}

function GetPlayersData()
{
  stream.on('send_players_data',(data)=>
  {
    Racket1Ypos = ConvertServerData(data.Racket1Ypos,0);
    Racket2Ypos = ConvertServerData(data.Racket2Ypos,0);
    BallXpos = ConvertServerData(data.BallXpos,1);
    BallYpos = ConvertServerData(data.BallYpos,0);
    Result1Val = data.Result1Val;
    Result2Val = data.Result2Val;
    if(data.Player1UserName)
      Player1UserName = data.Player1UserName;
    else
      Player1UserName = "player I";
    if(data.Player2UserName)
      Player2UserName = data.Player2UserName;
    else
      Player2UserName = "player II";
    if(data.Player1Image)
      Player1Image = data.Player1Image;
    else
      Player1Image = "/2.jpg";
    if(data.Player2Image)
      Player2Image = data.Player2Image;
    else
      Player2Image = "/3.jpg";
  });
}

function NewValue(p5:p5)
{
  if (typeof window === "undefined")
    return;
  let canvas:p5.Element| null = null;
  let w:number = Math.floor(window.innerWidth) ;
  let h:number = Math.floor(window.innerWidth/2);
  if(document.getElementById('sketch-container'))
    canvas = p5.createCanvas(GameWidth, GameHeight).parent('sketch-container');
  if((w !== GameWidth || h !== GameHeight) && window.innerWidth < 1080)
  {
    BallXpos = Math.floor(((BallXpos*100)/GameWidth)*(w/100));
    BallYpos = Math.floor(((BallYpos*100)/GameHeight)*(h/100));
    Racket1Ypos = Math.floor(((Racket1Ypos*100)/GameHeight)*(h/100));
    Racket2Ypos = Math.floor(((Racket2Ypos*100)/GameHeight)*(h/100));
    GameWidth = w;
    GameHeight =  h;
    BallWidth = Math.floor(GameWidth/52);
    BallHeight = Math.floor(GameHeight/26);
    Racket1Width = Math.floor(GameWidth/80);
    Racket1Height = Math.floor(GameHeight/6);
    Racket1Xpos = Math.floor(GameWidth/160);
    Racket2Width = Math.floor(GameWidth/80);
    Racket2Height = Math.floor(GameHeight/6);
    Racket2Xpos = Math.floor(GameWidth-((GameWidth/80)+(GameWidth/160)));
    if(document.getElementById('sketch-container'))
      p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
    p5.background(25);
  }
  else if (window.innerWidth >= 1080)
  {
    GameWidth = Math.floor(1080);
    GameHeight =  Math.floor(540);
    BallWidth = Math.floor(GameWidth/52);
    BallHeight = Math.floor(GameHeight/26);
    Racket1Width = Math.floor(GameWidth/80);
    Racket1Height = Math.floor(GameHeight/6);
    Racket1Xpos = Math.floor(GameWidth/160);
    Racket2Width = Math.floor(GameWidth/80);
    Racket2Height = Math.floor(GameHeight/6);
    Racket2Xpos = Math.floor(GameWidth-((GameWidth/80)+(GameWidth/160)));
    if(document.getElementById('sketch-container'))
      p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
    p5.background(25);
  }
  if(canvas)
    canvas.position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
}

const Game = () => {
  const contexUser = useContext(UserContext);
  const StreamContext = GetStreamInfoContext();
  const [reslt1, setReslt1] = useState(0);
  const [reslt2, setReslt2] = useState(0);
  useEffect(() => {
    const sketch = (p5: p5) => {
      p5.setup = () => {
      };
      
      p5.draw = () => 
      {
        GetPlayersData();
        NewValue(p5);
        if(!StreamContext.StreamInfo.Access)
        {
          if(document.getElementById('sketch-container'))
            p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
          p5.textSize(GameWidth/26);
          p5.background(25);
          p5.fill(255,255,255);
          p5.text("please sign-in before playing", GameWidth/2 - GameWidth/4, GameHeight/2 + GameHeight/24);
          return ;
        }
        first_conection(StreamContext);
        if(document.getElementById('sketch-container'))
          p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
        p5.background(25);
        LineCenter(p5);
        setReslt1(Result1Val);
        setReslt2(Result2Val);
        Ball(p5,BallXpos,BallYpos,BallWidth,BallHeight);
        Racket1(p5,Racket1Xpos,Racket1Ypos,Racket1Width,Racket1Height);
        Racket2(p5,Racket2Xpos,Racket2Ypos,Racket2Width,Racket2Height);
      }
    };

    new p5(sketch);
  }, []);

  return (
    <div className="relative flex mx-auto my-auto w-[100%] h-[100vh]">
      <div className=" relative flex h-[12.5vw] w-[50%] lg:h-[125px] lg:w-[500px] mx-auto">
        <img className=" relative flex w-[25%] h-[100%] bg-center rounded-tl-xl" src={Player1Image!.toString()}/>
        {/* <img className=" relative flex w-[50%] h-[50%%] bg-center" src={myimage1!}/> */}
        <div className="absolute flex w-[60%] h-[100%] left-[20%] trapezoid z-10">
        </div>
        {/* <img className="relative flex w-[50%] h-[25vw] bg-center" src={enemmyimage1!}/> */}
        <img className="relative flex left-[50%] w-[25%] h-[100%] bg-center rounded-tr-xl" src={Player2Image!}/>
      </div>
      <div  className=" absolute flex h-[12.5vw] w-[25%] lg:h-[125px] lg:w-[250px] left-[37.5%] lg:left-[43.3%] rounded-xl z-20">
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{Player1UserName!}</div>
        <div className="relative my-auto  flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt1}</div>
        <div className="relative my-auto mx-auto flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">-</div>
        <div className="relative my-auto   flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt2}</div>
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{Player2UserName!.toString()}</div>
      </div>
      {/* <div className="relative flex h-[40vw] w-[60%] mx-auto"> */}
        <div id="sketch-container" className="absolute flex mx-auto my-auto w-[100%] h-[50vw]"></div>
      {/* </div> */}
    </div>
  );
};

export default Game;
