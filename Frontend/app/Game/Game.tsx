'use client'
import { useEffect } from "react";
import p5 from "p5";
import './Game.css'

let GameWidth: number = 800,GameHeight: number = 400;
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

function BallAnimation(p5: p5)
{
  let ballYpos_racket: number;
  if(BallYpos < Racket1Ypos || BallYpos > (Racket1Ypos + Racket1Height))
    ballYpos_racket = BallYpos - Racket1Ypos;
  else
    ballYpos_racket = 0;
  let ballYpos_racket_par_100: number = ballYpos_racket/(Racket1Height/10);
  let alpha2 = (ballYpos_racket_par_100 - (100 - ballYpos_racket_par_100)) / 10;
  if(BallXpos > (GameWidth-(BallWidth+Racket1Width)))
  {
    BallXDirection = -1;
    if(BallYpos < Racket1Ypos || BallYpos > (Racket1Ypos + Racket1Height))
      BallXpos = GameWidth/2;
    else
      alpha2 = alpha;
  }
  if(BallXpos < (BallWidth + Racket2Width))
  {
    BallXDirection = +1;
    if(BallYpos < Racket2Ypos || BallYpos > (Racket2Ypos + Racket2Height))
      BallXpos = GameWidth/2;
    else
      alpha2 = alpha;
  }
    BallXpos += BallXDirection;
  if(BallXpos % alpha === 0)
  {
    if(BallYpos > GameHeight-BallHeight/2)
      BallYDirection = -1
    if(BallYpos < BallHeight/2)
      BallYDirection = +1
    BallYpos += BallYDirection;
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
        p5.background(25);
        BallAnimation(p5);
        gamediv.center();
        LineCenter(p5);
        Ball(p5,BallXpos,BallYpos,BallWidth,BallHeight);
        Racket1(p5,Racket1Xpos,Racket1Ypos,Racket1Width,Racket1Height);
        Racket2(p5,Racket2Xpos,Racket2Ypos,Racket2Width,Racket2Height);
        Result1(p5,Result1Val.toString(),Result1Xpos,Result1Ypos);
        Result2(p5,Result2Val.toString(),Result2Xpos,Result2Ypos);
      };
    };

    new p5(sketch);
  }, []);

  return <div id="sketch-container" ></div>;
};

export default Game;