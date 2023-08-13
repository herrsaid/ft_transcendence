'use client'

import { useEffect } from "react";
import p5 from "p5";
import './Game.css';
import { player1, player2 } from '../Socket/start_game_socket';
import { host, Access, Speed, Points, myusername, enemmyusername} from '../../Lobbie/CreateRoom/Settings/Settings';
import { host2, Access2, Speed2, Points2, myusername2, enemmyusername2} from '../../Lobbie/Rooms/Rooms';

import { useContext } from 'react';
import UserContext from "@/app/(root)/UserContext";


let GameWidth: number = 800, GameHeight: number = 400, GameSpeed: number = 4;
let BallWidth: number = GameWidth/52, BallHeight = GameHeight/26, BallXpos: number = GameWidth/2, BallYpos: number = GameHeight/2;
let Racket1Width: number = GameWidth/80, Racket1Height =  Math.floor(GameHeight/6), Racket1Xpos: number = 5, Racket1Ypos: number = (GameHeight/2) - (Racket1Height/2);
let Racket2Width: number = GameWidth/80, Racket2Height =  Math.floor(GameHeight/6), Racket2Xpos: number = GameWidth-15, Racket2Ypos: number = (GameHeight/2) - (Racket1Height/2);
let Result1Val: number = 0, Result1Xpos: number = 350, Result1Ypos: number = 25;
let Result2Val: number = 0, Result2Xpos: number = 450, Result2Ypos: number = 25;
let first_conection_val:boolean=false, message: string = '';
//-----------------------------------------------------------\\
let host1: boolean = false;
let Points1: number = 0;
let Speed1: number = 0;
let Access1: number = 0;
let myusername1: string | null = null;
let enemmyusername1: string | null = null;

if(Access === 1)
{
    host1 = host; 
    Access1 = Access; 
    Speed1 = Speed; 
    Points1 = Points; 
    myusername1 = myusername; 
    enemmyusername1 = enemmyusername; 
}
else
{
    host1 = host2;
    Access1 = Access2;
    Speed1 = Speed2;
    Points1 = Points2;
    myusername1 = myusername2;
    enemmyusername1 = enemmyusername2;
}
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

function Result1(p5: p5,res1: string, x: number, y: number)
{
  p5.textSize(GameWidth/26);
  p5.fill('blue');
  if(myusername1)
    p5.text(myusername1, x - GameWidth/5, y);
  p5.text(res1, x, y);
}

function Result2(p5: p5,res2: string, x: number, y: number)
{
  p5.textSize(GameWidth/26);
  p5.fill('red');
  if(enemmyusername1)
    p5.text(enemmyusername1, x + GameWidth/16, y);
  p5.text(res2, x, y);
  p5.fill(255, 204, 0);
}
function BallAnimation ()
{
  if(host1)
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
function first_conection(p5:p5)
{
  console.log(host1);
  if(!Access1)
  {
    p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').center();
    p5.textSize(GameWidth/26);
    p5.background(0);
    p5.fill(255,255,255);
    p5.text("please sign-in before playing", GameWidth/2 - GameWidth/4, GameHeight/2 + GameHeight/24);
    p5.noLoop();
    return false;
  }
  else if(first_conection_val === false)
	{
		first_conection_val = true;
      if(host1)
			  player1.emit('first_conection',{Speed1,Points1,myusername1,});
      else
			  player2.emit('first_conection',{Speed1,Points1,myusername1,});
	}
  return true;
}

function NewValue()
{
  if((Math.floor(window.innerWidth) !== GameWidth || Math.floor(window.innerWidth/2) !== GameHeight) && window.innerWidth < 1080)
  {
    GameWidth = Math.floor(window.innerWidth);
    GameHeight =  Math.floor(window.innerWidth/2);
    BallWidth = Math.floor(GameWidth/52);
    BallHeight = Math.floor(GameHeight/26);
    Racket1Width = Math.floor(GameWidth/80);
    Racket1Height = Math.floor(GameHeight/6);
    Racket1Xpos = Math.floor(GameWidth/160);
    Racket2Width = Math.floor(GameWidth/80);
    Racket2Height = Math.floor(GameHeight/6);
    Racket2Xpos = Math.floor(GameWidth-((GameWidth/80)+(GameWidth/160)));
    Result1Xpos  = Math.floor(GameWidth/2 - GameWidth/12);
    Result1Ypos = Math.floor(GameHeight/10)
    Result2Xpos  = Math.floor(GameWidth/2 + GameWidth/16);
    Result2Ypos = Math.floor(GameHeight/10);
  }
}

function GameStatusChecker(p5: p5): boolean
{
  p5.textSize(GameWidth/26);
  if(host1)
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
      return false;
    }
  }
  else
  {
		player2.on('GameEnd',(data: string)=>
    {
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
  myusername1 = contexUser.user.username;
  useEffect(() => {
    const sketch = (p5: p5) => {
      p5.setup = () => {
      };
      
      p5.draw = () => {
        NewValue();
        if(!first_conection(p5))
          return ;
        if(GameStatusChecker(p5))
        {
          p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').center();
          p5.background(25);
          BallAnimation();
          if (host1)
            Racket1Animation(p5);
          else
            Racket2Animation(p5);
          LineCenter(p5);
          Result1(p5, p5.str(Result1Val),Result1Xpos,Result1Ypos);
          Result2(p5, p5.str(Result2Val),Result2Xpos,Result2Ypos);
          Ball(p5,BallXpos,BallYpos,BallWidth,BallHeight);
          Racket1(p5,Racket1Xpos,Racket1Ypos,Racket1Width,Racket1Height);
          Racket2(p5,Racket2Xpos,Racket2Ypos,Racket2Width,Racket2Height);
        }
        else
          p5.noLoop();
      };
      p5.keyReleased = () =>{
        p5.key = '';
      }
    };

    new p5(sketch);
  }, []);

  return <div id="sketch-container" ></div>;
};

export default Game;
