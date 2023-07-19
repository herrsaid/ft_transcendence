'use client'
import { useEffect } from "react";
import p5 from "p5";
import './Game.css'
import { None } from "framer-motion";

let GameWidth: number = 800,GameHeight: number = 400,GameSpeed: number = 4;
let BallWidth: number = 15, BallHeight = 15, BallXpos: number = GameWidth/2, BallYpos: number = GameHeight/2;
let Racket1Width: number = 10, Racket1Height = 60, Racket1Xpos: number = 5, Racket1Ypos: number = 170;
let Racket2Width: number = 10, Racket2Height = 60, Racket2Xpos: number = 785, Racket2Ypos: number = 170;
let Result1Val: number = 0, Result1Xpos: number = 350, Result1Ypos: number = 25;
let Result2Val: number = 0, Result2Xpos: number = 450, Result2Ypos: number = 25;
let BallXDirection: number = 1, BallYDirection: number = 1, alpha: number = -1;
let gamediv: p5.Renderer;

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
  p5.text('mabdelou', 170, 25);
  p5.text(res1, x, y);
}

function Result2(p5: p5,res2: string, x: number, y: number)
{
  p5.textSize(30);
  p5.fill('red');
  p5.text('aabdelou', 500, 25);
  p5.text(res2, x, y);
  p5.fill(255, 204, 0);
}
function GetAlpha(p5: p5,BallYpos: number, RacketYpos: number, RacketHeight: number): undefined
{
  let ballYpos_racket: number;
      if(BallYpos > RacketYpos || BallYpos < (RacketYpos + RacketHeight))
       ballYpos_racket = BallYpos - RacketYpos;
      else
        ballYpos_racket = 0;
      let ballYpos_racket_par_100: number = p5.int(ballYpos_racket/(p5.int(RacketHeight/10)));
      alpha = ballYpos_racket_par_100 - (10 - ballYpos_racket_par_100);
      if(alpha === -10|| alpha === 10)
        alpha = 9;
      if(alpha > 0)
        alpha -= 10;
      else if(alpha < 0)
        alpha += 10;
      if(ballYpos_racket_par_100 > 5)
        BallYDirection = 1;
      else
        BallYDirection = -1;
}
function BallAnimation(p5: p5)
{
  BallXpos += (BallXDirection * GameSpeed);
  if(BallYpos < Racket2Ypos || BallYpos > (Racket2Ypos + Racket2Height))
  {
    if(BallXpos > GameWidth)
    {
      BallXDirection = -1;
      Result1Val++;
      BallXpos = GameWidth/2;
    }
  }
  else
  {
    if(BallXpos > (GameWidth-(BallWidth+Racket1Width)))
    {
      BallXDirection = -1;
      GetAlpha(p5,BallYpos,Racket2Ypos,Racket2Height);
    }
  }
  if(BallYpos < Racket1Ypos || BallYpos > (Racket1Ypos + Racket1Height))
  {
    if(BallXpos < 0)
    {
      BallXDirection = +1;
      Result2Val++;
      BallXpos = GameWidth/2;
    }
  }
  else
  {
    if(BallXpos < (BallWidth + Racket2Width))
    {
      BallXDirection = +1;
      GetAlpha(p5,BallYpos,Racket1Ypos,Racket1Height);
    }
  }
  if(BallXpos % alpha === 0)
  {
    if(BallYpos > GameHeight-BallHeight/2)
      BallYDirection = -1
    if(BallYpos < BallHeight/2)
      BallYDirection = +1
    BallYpos += BallYDirection;
  }
}

function Racket1Animation(p5: p5): undefined
{
  if(p5.mouseY > 0 && p5.mouseY < 400 && p5.mouseX > 0 && p5.mouseX < 400)
  {
    if(p5.mouseY< Racket1Ypos && (Racket1Ypos > 0))
      Racket1Ypos -= GameSpeed;
    else if(p5.mouseY > Racket1Ypos && (Racket1Ypos < (GameHeight - Racket1Height)))
      Racket1Ypos += GameSpeed;
  }
    if((p5.key == 'w' || p5.key == 'ArrowUp') && (Racket1Ypos > 0))
    Racket1Ypos -= GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (Racket1Ypos < (GameHeight - Racket1Height)))
    Racket1Ypos += GameSpeed;
}
function Racket2Animation(p5: p5)
{
  let rand = p5.random(100);
  // if(rand > 95)
  //   await setTimeout(()=>{},10000);
  if(BallYpos < Racket2Ypos && (Racket2Ypos > 0))
    Racket2Ypos -= GameSpeed;
  else if (BallYpos > (Racket2Ypos+Racket2Height)   && (Racket2Ypos < (GameHeight - Racket2Height)))
    Racket2Ypos += GameSpeed;
}
const Game = () => {
  useEffect(() => {
    let x = 25;

    const sketch = (p5: p5) => {
      p5.setup = () => {
        gamediv = p5.createCanvas(800, 400).parent('sketch-container').center();
      };
      
      p5.draw = () => {
        p5.background(25);
        BallAnimation(p5);
        Racket1Animation(p5);
        Racket2Animation(p5);
        gamediv.center();
        LineCenter(p5);
        Result1(p5, p5.str(Result1Val),Result1Xpos,Result1Ypos);
        Result2(p5, p5.str(Result2Val),Result2Xpos,Result2Ypos);
        Ball(p5,BallXpos,BallYpos,BallWidth,BallHeight);
        Racket1(p5,Racket1Xpos,Racket1Ypos,Racket1Width,Racket1Height);
        Racket2(p5,Racket2Xpos,Racket2Ypos,Racket2Width,Racket2Height);
      };
    };

    new p5(sketch);
  }, []);

  return <div id="sketch-container" ></div>;
};

export default Game;