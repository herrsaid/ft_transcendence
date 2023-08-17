'use client'

import { useEffect,useContext,useState } from "react";
import p5 from "p5";
import './Game.css';
import { player1, player2 } from '../Socket/start_game_socket';
import { GetGameInfoContext, GameContextType } from '../../GameContext/GameContext';
import UserContext from "@/app/(root)/UserContext";


let GameWidth: number = 800, GameHeight: number = 400, GameSpeed: number = 4;
let BallWidth: number = GameWidth/52, BallHeight = GameHeight/26, BallXpos: number = GameWidth/2, BallYpos: number = GameHeight/2;
let Racket1Width: number = GameWidth/80, Racket1Height =  Math.floor(GameHeight/6), Racket1Xpos: number = 5, Racket1Ypos: number = (GameHeight/2) - (Racket1Height/2);
let Racket2Width: number = GameWidth/80, Racket2Height =  Math.floor(GameHeight/6), Racket2Xpos: number = GameWidth-15, Racket2Ypos: number = (GameHeight/2) - (Racket1Height/2);
let Result1Val: number = 0;
let Result2Val: number = 0;
let first_conection_val:boolean, message: string;

function ConvertServerData(ServerData:number,Mood:number)
{
  if(Mood)
    return(Math.floor(((ServerData* 100)/800)* (GameWidth/100)));
  return(Math.floor(((ServerData* 100)/400)* (GameHeight/100)));
}

function ConvertClientData(ClientData:number,Mood:number)
{
  if(Mood)
    return(Math.floor(((ClientData* 100)/GameWidth)* (800/100)));
  return(Math.floor(((ClientData* 100)/GameHeight)* (400/100)));
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

function BallAnimation (GameContext:GameContextType)
{
  if(GameContext.GameInfo.host)
  {  
    player1.on('BallPos',(GameInfo)=>
    {
      BallXpos = GameWidth - ConvertServerData(GameInfo.BallXpos,1);
      BallYpos = GameHeight -  ConvertServerData(GameInfo.BallYpos,0);
      Result1Val = GameInfo.Result2Val;
      Result2Val = GameInfo.Result1Val;
    });
  }
  else
  {
    player2.on('BallPos',(GameInfo)=>
    {
      BallXpos = ConvertServerData(GameInfo.BallXpos,1);
      BallYpos = ConvertServerData(GameInfo.BallYpos,0);
      Result1Val = GameInfo.Result1Val;
      Result2Val = GameInfo.Result2Val;
    });
  }
}
function Racket1Animation(p5: p5): undefined
{
  if((p5.key == 'w' || p5.key == 'ArrowUp') && (Racket1Ypos > 0))
    Racket1Ypos -= GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (Racket1Ypos < (GameHeight - Racket1Height)))
    Racket1Ypos += GameSpeed;
  else if(p5.mouseY > 0 && p5.mouseY < GameHeight && p5.mouseX > 0 && p5.mouseX < GameHeight)
  {
    if(p5.mouseY< Racket1Ypos)
      Racket1Ypos -= GameSpeed;
    else if(p5.mouseY > (Racket1Ypos + Racket1Height))
      Racket1Ypos += GameSpeed;
  }
  player1.emit('send_player1_data',ConvertClientData(((GameHeight - Racket1Height) - Racket1Ypos),0));
	player1.on('send_player1_data',(data)=> 
  {
    Racket2Ypos =  (GameHeight - Racket2Height) - ConvertServerData(data,0);
  });
}

function Racket2Animation(p5: p5): undefined
{
  if((p5.key == 'w' || p5.key == 'ArrowUp') && (Racket1Ypos > 0))
    Racket1Ypos -= GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (Racket1Ypos < (GameHeight - Racket1Height)))
    Racket1Ypos += GameSpeed;
  else if(p5.mouseY > 0 && p5.mouseY < GameHeight && p5.mouseX > 0 && p5.mouseX < GameHeight)
  {
    if(p5.mouseY< Racket1Ypos)
      Racket1Ypos -= GameSpeed;
    else if(p5.mouseY > (Racket1Ypos + Racket1Height))
      Racket1Ypos += GameSpeed;
  }
  player2.emit('send_player2_data', ConvertClientData(Racket1Ypos,0));
	player2.on('send_player2_data',(data)=> 
  {
    Racket2Ypos =  ConvertServerData(data,0);
  });
}
function first_conection(p5:p5,GameContext:GameContextType)
{
  if(!GameContext.GameInfo.Access)
  {
    if(document.getElementById('sketch-container'))
      p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
    p5.background(0);
    p5.fill(255,255,255);
    p5.text("please sign-in before playing", GameWidth/2 - GameWidth/4, GameHeight/2 + GameHeight/24);
    return false;
  }
  else if(first_conection_val === false)
	{
		first_conection_val = true;
    console.log(GameContext.GameInfo.host);
      if(GameContext.GameInfo.host)
      {
        player1.emit('first_conection',
        {
          Speed1: GameContext.GameInfo.Speed,
          Points1:GameContext.GameInfo.Points,
          myusername1:GameContext.GameInfo.myusername,
          myimage1:GameContext.GameInfo.myimage,
        });
      }
      else
		  {
        player2.emit('first_conection',
        {
          Speed1: GameContext.GameInfo.Speed,
          Points1:GameContext.GameInfo.Points,
          myusername1:GameContext.GameInfo.myusername,
          myimage1:GameContext.GameInfo.myimage,
        });
      }
    }
  return true;
}

function initialze_data()
{
  GameWidth = 800;
  GameHeight = 400;
  GameSpeed = 4;
  BallWidth = GameWidth/52;
  BallHeight = GameHeight/26;
  BallXpos = GameWidth/2;
  BallYpos = GameHeight/2;
  Racket1Width = GameWidth/80;
  Racket1Height =  Math.floor(GameHeight/6);
  Racket1Xpos = 5;
  Racket1Ypos = (GameHeight/2) - (Racket1Height/2);
  Racket2Width = GameWidth/80;
  Racket2Height =  Math.floor(GameHeight/6);
  Racket2Xpos = GameWidth-15;
  Racket2Ypos = (GameHeight/2) - (Racket1Height/2);
  Result1Val = 0;
  Result2Val = 0;
  first_conection_val= false;
  message = '';
}

function NewValue(p5:p5)
{
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

function GameStatusChecker(p5: p5,GameContext:GameContextType): boolean
{
  p5.textSize(GameWidth/26);
  if(GameContext.GameInfo.host)
  {
		player1.on('GameEnd',(data: string)=>
    {
      message = data;
    });
    if(message !== '')
    {
      p5.background(0);
      p5.fill(255,255,255);
      p5.text(message, GameWidth/2 - GameWidth/12, GameHeight/2 + GameHeight/12);
      player1.disconnect();
      player1.connect();
      return false;
    }
  }
  else
  {
		player2.on('GameEnd',(data: string)=>
    {
      player2.disconnect();
      player2.connect();
      message = data;
    });
    if(message !== '')
    {
      p5.background(0);
      p5.fill(255,255,255);
      p5.text(message, GameWidth/2 - GameWidth/12, GameHeight/2 + GameHeight/12);
      return false;
    }

  }
  return true;
}

const Game = () => {
  const contexUser = useContext(UserContext);
  const GameContext = GetGameInfoContext();
  const [reslt1, setReslt1] = useState(0);
  const [reslt2, setReslt2] = useState(0);
  useEffect(() => {
    initialze_data();
    console.log('user re-enter this page');
    const sketch = (p5: p5) => {
      p5.setup = () => {
      };
      
      p5.draw = () => {
        NewValue(p5);
        if(!first_conection(p5,GameContext))
          return ;
        if(GameStatusChecker(p5,GameContext))
        {
          if(document.getElementById('sketch-container'))
            p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
          p5.background(25);
          BallAnimation(GameContext);
          if (GameContext.GameInfo.host)
            Racket1Animation(p5);
          else
            Racket2Animation(p5);
          LineCenter(p5);
          setReslt1(Result1Val);
          setReslt2(Result2Val);
          Ball(p5,BallXpos,BallYpos,BallWidth,BallHeight);
          Racket1(p5,Racket1Xpos,Racket1Ypos,Racket1Width,Racket1Height);
          Racket2(p5,Racket2Xpos,Racket2Ypos,Racket2Width,Racket2Height);
        }
        else
          return;
      };
      p5.keyReleased = () =>{
        p5.key = '';
      }
    };

    new p5(sketch);
  }, []);

  return (
    <div className="relative flex mx-auto my-auto w-[100%] h-[100vh]">
      <div className=" relative flex h-[12.5vw] w-[50%] lg:h-[125px] lg:w-[500px] mx-auto">
        <img className=" relative flex w-[25%] h-[100%] bg-center rounded-tl-xl" src={GameContext.GameInfo.myimage!.toString()}/>
        {/* <img className=" relative flex w-[50%] h-[50%%] bg-center" src={myimage1!}/> */}
        <div className="absolute flex w-[60%] h-[100%] left-[20%] trapezoid z-10">
        </div>
        {/* <img className="relative flex w-[50%] h-[25vw] bg-center" src={enemmyimage1!}/> */}
        <img className="relative flex left-[50%] w-[25%] h-[100%] bg-center rounded-tr-xl" src={GameContext.GameInfo.enemmyimage!}/>
      </div>
      <div  className=" absolute flex h-[12.5vw] w-[25%] lg:h-[125px] lg:w-[250px] left-[37.5%] lg:left-[43.3%] rounded-xl z-20">
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{GameContext.GameInfo.myusername!}</div>
        <div className="relative my-auto  flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt1}</div>
        <div className="relative my-auto mx-auto flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">-</div>
        <div className="relative my-auto   flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt2}</div>
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{GameContext.GameInfo.enemmyusername!.toString()}</div>
      </div>
      {/* <div className="relative flex h-[40vw] w-[60%] mx-auto"> */}
        <div id="sketch-container" className="absolute flex mx-auto my-auto w-[100%] h-[50vw]"></div>
      {/* </div> */}
    </div>
  );
}

export default Game;
