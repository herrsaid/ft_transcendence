/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Game.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:29 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 13:38:27 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'
import { useEffect } from "react";
import p5 from "p5";
import './Game.css'
import {Speed, Points,myusername} from '../../Lobbie/CreateRoom/Settings/Settings';

let GameWidth: number = 800,GameHeight: number = 400,GameSpeed: number = Speed,GameTarget:number = Points;
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
  if(myusername)
    p5.text(myusername, x - GameWidth/5, y);
  else
    p5.text('UserI', x - GameWidth/5, y);
    p5.text(res1, x, y);
}

function Result2(p5: p5,res2: string, x: number, y: number)
{
  p5.textSize(GameWidth/26);
  p5.fill('red');
  p5.text('UserII', x + GameWidth/16, y);
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
  if(p5.key == 'w' && (Racket1Ypos > 0))
    Racket1Ypos -= GameSpeed;
  else if (p5.key == 's' && (Racket1Ypos < (GameHeight - Racket1Height)))
    Racket1Ypos += GameSpeed;
}

function Racket2Animation(p5: p5): undefined
{
  if(p5.key == 'ArrowUp' && (Racket2Ypos > 0))
    Racket2Ypos -= GameSpeed;
  else if (p5.key == 'ArrowDown' && (Racket2Ypos < (GameHeight - Racket2Height)))
    Racket2Ypos += GameSpeed;
}

function NewValue(p5:p5)
{
  let canvas:p5.Element = p5.createCanvas(GameWidth, GameHeight).parent('sketch-container');
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
    p5.createCanvas(GameWidth, GameHeight).parent('sketch-container');
    p5.background(25);
    console.log("------------------------------");
    console.log("GameWidth: ",GameWidth);
    console.log("GameHeight: ",GameHeight);
    console.log("BallWidth: ",BallWidth);
    console.log("BallHeight: ",BallHeight);
    console.log("Racket1Width: ",Racket1Width);
    console.log("Racket1Height: ",Racket1Height);
    console.log("Racket1Xpos: ",Racket1Xpos);
    console.log("Racket2Width: ",Racket2Width);
    console.log("Racket2Height: ",Racket2Height);
    console.log("Racket2Xpos: ",Racket2Xpos);
    console.log("Result1Xpos: ",Result1Xpos);
    console.log("Result1Ypos: ",Result1Ypos);
    console.log("Result2Xpos: ",Result2Xpos);
    console.log("Result2Ypos: ",Result2Ypos);
    console.log("------------------------------");
  }
  canvas.center();
}

function GameStatusChecker(p5: p5): boolean
{
  if(GameTarget <= Result1Val)
  {
    p5.background(0);
    p5.fill(255,255,255);
    p5.text(`${myusername} WIN`, GameWidth/2 - GameWidth/12, GameHeight/2 + GameHeight/12);
    return false;
  }
  else if(GameTarget <= Result2Val)
  {
    p5.background(0);
    p5.fill(255,255,255);
    p5.text('UserII WIN', GameWidth/2 - GameWidth/12, GameHeight/2 + GameHeight/12);
    return false;
  }
  return true;
}

const Game = () => {
  useEffect(() => {
    let x = 25;

    const sketch = (p5: p5) => {
      p5.setup = () => {
      };
      
      p5.draw = () => {
        NewValue(p5);
        if(!GameStatusChecker(p5))
          return;
        p5.background(25);
        BallAnimation(p5);
        Racket1Animation(p5);
        Racket2Animation(p5);
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