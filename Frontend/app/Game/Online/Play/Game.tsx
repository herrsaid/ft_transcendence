'use client'
import { useEffect } from "react";
import p5 from "p5";
import './Game.css'
import { player1, player2 } from '../Socket/start_game_socket'
import { host ,Speed,myusername,enemmyusername} from '../../Lobbie/Settings/Settings'
let GameWidth: number = 800,GameHeight: number = 400,GameSpeed: number = 4;
let BallWidth: number = 15, BallHeight = 15, BallXpos: number = GameWidth/2, BallYpos: number = GameHeight/2;
let Racket1Width: number = 10, Racket1Height = 60, Racket1Xpos: number = 5, Racket1Ypos: number = 170;
let Racket2Width: number = 10, Racket2Height = 60, Racket2Xpos: number = 785, Racket2Ypos: number = 170;
let Result1Val: number = 0, Result1Xpos: number = 350, Result1Ypos: number = 25;
let Result2Val: number = 0, Result2Xpos: number = 450, Result2Ypos: number = 25;
let gamediv: p5.Renderer,first_conection_val:boolean=false;

function Ball(p5: p5, x: number, y: number, w: number, h: number)
{
  p5.fill(255,255,255);
  p5.ellipse(x, y, w, h);
}
function LineCenter(p5: p5)
{
  p5.fill('yellow');
  for(let a=0;a<400;a+=35)
    p5.rect(397.5, a, 5, 30,20);
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
  p5.textSize(30);
  p5.fill('blue');
  if(myusername)
  p5.text(myusername, 170, 25);
  p5.text(res1, x, y);
}

function Result2(p5: p5,res2: string, x: number, y: number)
{
  p5.textSize(30);
  p5.fill('red');
  if(enemmyusername)
    p5.text(enemmyusername, 500, 25);
  p5.text(res2, x, y);
  p5.fill(255, 204, 0);
}
function BallAnimation ()
{
  player1.on('BallPos',(GameInfo)=> 
  {
    BallXpos = GameInfo.BallXpos;
    BallYpos = GameInfo.BallYpos;
    Result1Val = GameInfo.Result1Val;
    Result2Val = GameInfo.Result2Val;
  });
  player2.on('BallPos',(GameInfo)=> 
  {
    BallXpos = GameInfo.BallXpos;
    BallYpos = GameInfo.BallYpos;
    Result1Val = GameInfo.Result1Val;
    Result2Val = GameInfo.Result2Val;
  });
}
function Racket1Animation(p5: p5): undefined
{
  if(p5.mouseY > 0 && p5.mouseY < 400 && p5.mouseX > 0 && p5.mouseX < 400)
  {
    if(p5.mouseY< Racket1Ypos)
      Racket1Ypos -= GameSpeed;
    else if(p5.mouseY > (Racket1Ypos + Racket1Height))
      Racket1Ypos += GameSpeed;
  }
  if((p5.key == 'w' || p5.key == 'ArrowUp') && (Racket1Ypos > 0))
    Racket1Ypos -= GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (Racket1Ypos < (GameHeight - Racket1Height)))
    Racket1Ypos += GameSpeed;
  player1.emit('send_player1_data',Racket1Ypos);
	player1.on('send_player1_data',(data)=> 
  {
    Racket2Ypos = data;
  });
}

function Racket2Animation(p5: p5): undefined
{
  if(p5.mouseY > 0 && p5.mouseY < 400 && p5.mouseX > 400 && p5.mouseX < 800)
  {
    if(p5.mouseY< Racket2Ypos)
      Racket2Ypos -= GameSpeed;
    else if(p5.mouseY > (Racket2Ypos + Racket2Height))
      Racket2Ypos += GameSpeed;
  }
  if((p5.key == 'w' || p5.key == 'ArrowUp') && (Racket2Ypos > 0))
    Racket2Ypos -= GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (Racket2Ypos < (GameHeight - Racket2Height)))
    Racket2Ypos += GameSpeed;
  player2.emit('send_player2_data',Racket2Ypos);
	player2.on('send_player2_data',(data)=> 
  {
    Racket1Ypos = data;
  });
}
function first_conection()
{
  if(first_conection_val === false)
		{
			first_conection_val = true;
        if(host)
				  player1.emit('first_conection');
        else
				  player2.emit('first_conection');
		}
}
const Game = () => {
  useEffect(() => {
    let x = 25;

    const sketch = (p5: p5) => {
      p5.setup = () => {
        gamediv = p5.createCanvas(800, 400).parent('sketch-container').center();
      };
      
      p5.draw = () => {
        first_conection();
        p5.background(25);
        BallAnimation();
        if (host)
          Racket1Animation(p5);
        else
          Racket2Animation(p5);
        gamediv.center();
        LineCenter(p5);
        Result1(p5, p5.str(Result1Val),Result1Xpos,Result1Ypos);
        Result2(p5, p5.str(Result2Val),Result2Xpos,Result2Ypos);
        Ball(p5,BallXpos,BallYpos,BallWidth,BallHeight);
        Racket1(p5,Racket1Xpos,Racket1Ypos,Racket1Width,Racket1Height);
        Racket2(p5,Racket2Xpos,Racket2Ypos,Racket2Width,Racket2Height);
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