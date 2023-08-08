'use client'
import { useEffect } from "react";
import p5 from "p5";
import './Stream.css';
import { player1 } from '../../Game/Online/Socket/start_game_socket';
import { Access,RoomNumber } from '../page';

let GameWidth: number = 800, GameHeight: number = 400, GameSpeed: number = 4;
let BallWidth: number = GameWidth/52, BallHeight = GameHeight/26, BallXpos: number = GameWidth/2, BallYpos: number = GameHeight/2;
let Racket1Width: number = GameWidth/80, Racket1Height =  Math.floor(GameHeight/6), Racket1Xpos: number = 5, Racket1Ypos: number = (GameHeight/2) - (Racket1Height/2);
let Racket2Width: number = GameWidth/80, Racket2Height =  Math.floor(GameHeight/6), Racket2Xpos: number = GameWidth-15, Racket2Ypos: number = (GameHeight/2) - (Racket1Height/2);
let Result1Val: number = 0, Result1Xpos: number = 350, Result1Ypos: number = 25;
let Result2Val: number = 0, Result2Xpos: number = 450, Result2Ypos: number = 25;
let first_conection_val:boolean=false, message: string = '',Player2UserName:string ="",Player1UserName:string ="";

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

function Result1(p5: p5,res1: string, x: number, y: number)
{
  p5.textSize(GameWidth/26);
  p5.fill('blue');
  if(Player1UserName)
    p5.text(Player1UserName, x - GameWidth/5, y);
  p5.text(res1, x, y);
}

function Result2(p5: p5,res2: string, x: number, y: number)
{
  p5.textSize(GameWidth/26);
  p5.fill('red');
  if(Player2UserName)
    p5.text(Player2UserName, x + GameWidth/16, y);
  p5.text(res2, x, y);
  p5.fill(255, 204, 0);
}

function first_conection()
{
  if(first_conection_val === false)
		{
			first_conection_val = true;
      player1.emit("new_spectator",RoomNumber);
		}
}

function GetPlayersData()
{
  player1.on('send_players_data',(data)=>
  {
    Racket1Ypos = ConvertServerData(data.Racket1Ypos,0);
    Racket2Ypos = ConvertServerData(data.Racket2Ypos,0);
    BallXpos = ConvertServerData(data.BallXpos,1);
    BallYpos = ConvertServerData(data.BallYpos,0);
    Result1Val = data.Result1Val;
    Result2Val = data.Result2Val;
    Player1UserName = data.Player2UserName;
    Player2UserName = data.Player1UserName;
  });
}

function NewValue()
{
  if(window.innerWidth/2 !== GameWidth || window.innerWidth/4 !== GameHeight)
  {
    GameWidth = Math.floor(window.innerWidth/2);
    GameHeight =  Math.floor(window.innerWidth/4);
    BallWidth = Math.floor(GameWidth/52);
    BallHeight = Math.floor(GameHeight/26);
    // BallXpos = Math.floor(GameWidth/2);
    // BallYpos = Math.floor(GameHeight/2);
    Racket1Width = Math.floor(GameWidth/80);
    Racket1Height = Math.floor(GameHeight/6);
    Racket1Xpos = Math.floor(GameWidth/160);
    // Racket1Ypos = Math.floor((GameHeight/2) - (Racket1Height/2));
    Racket2Width = Math.floor(GameWidth/80);
    Racket2Height = Math.floor(GameHeight/6);
    Racket2Xpos = Math.floor(GameWidth-((GameWidth/80)+(GameWidth/160)));
    // Racket2Ypos = Math.floor((GameHeight/2) - (Racket2Height/2));
    Result1Xpos  = Math.floor(GameWidth/2 - GameWidth/12);
    Result1Ypos = Math.floor(GameHeight/10);
    // Result1Val  = 0;
    Result2Xpos  = Math.floor(GameWidth/2 + GameWidth/16);
    Result2Ypos = Math.floor(GameHeight/10);
    // Result2Val  = 0;
  }
}

const Game = () => {
  useEffect(() => {
    const sketch = (p5: p5) => {
      p5.setup = () => {
      };
      
      p5.draw = () => {
        GetPlayersData();
        NewValue();
        if(!Access)
        {
          p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').center();
          p5.textSize(GameWidth/26);
          p5.background(0);
          p5.fill(255,255,255);
          p5.text("please sign-in before playing", GameWidth/2 - GameWidth/4, GameHeight/2 + GameHeight/24);
          return ;
        }
        first_conection();
          p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').center();
          p5.background(25);
          LineCenter(p5);
          Result1(p5, p5.str(Result1Val),Result1Xpos,Result1Ypos);
          Result2(p5, p5.str(Result2Val),Result2Xpos,Result2Ypos);
          Ball(p5,BallXpos,BallYpos,BallWidth,BallHeight);
          Racket1(p5,Racket1Xpos,Racket1Ypos,Racket1Width,Racket1Height);
          Racket2(p5,Racket2Xpos,Racket2Ypos,Racket2Width,Racket2Height);
        }
      };

    new p5(sketch);
  }, []);

  return <div id="sketch-container" ></div>;
};

export default Game;
