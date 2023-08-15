/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Game.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:38 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 13:38:19 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'
import { useEffect,useContext,useState } from "react";
import UserContext from "@/app/(root)/UserContext";
import p5 from "p5";
import './Game.css'
import {Speed, Points,myusername,myimage} from '../../Lobbie/CreateRoom/Settings/Settings';

let GameWidth: number = 800,GameHeight: number = 400,GameSpeed: number = Speed,GameTarget:number = Points;
let BallWidth: number = 15, BallHeight = 15, BallXpos: number = GameWidth/2, BallYpos: number = GameHeight/2;
let Racket1Width: number = 10, Racket1Height = 60, Racket1Xpos: number = 5, Racket1Ypos: number = 170;
let Racket2Width: number = 10, Racket2Height = 60, Racket2Xpos: number = 785, Racket2Ypos: number = 170;
let BallXDirection: number = 1, BallYDirection: number = 1, alpha: number = -1;
let Result1Val: number = 0;
let Result2Val: number = 0;
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
function GetAlpha(p5: p5,BallYpos: number, RacketYpos: number, RacketHeight: number): undefined
{
  let ballYpos_racket: number;
      if(BallYpos > RacketYpos || BallYpos < (RacketYpos + RacketHeight))
        ballYpos_racket = BallYpos - RacketYpos;
      else
        ballYpos_racket = 0;
      let ballYpos_racket_par_100: number = p5.int(ballYpos_racket/(p5.int(RacketHeight/10)));
      alpha = ballYpos_racket_par_100 - (10 - ballYpos_racket_par_100);
      alpha = Math.floor(alpha);
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
      if(alpha < 0)
        alpha *= -1;
}
function BallAnimation(p5: p5)
{
  BallXpos += Math.floor(BallXDirection);
  if(BallYpos < Racket2Ypos || BallYpos > (Racket2Ypos + Racket2Height))
  {
    if(BallXpos > GameWidth)
    {
      BallXDirection = -1;
      Result1Val++;
      BallXpos = Math.floor(GameWidth/2);
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
      BallXpos =  Math.floor(GameWidth/2);
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
    p5.createCanvas(GameWidth, GameHeight).parent('sketch-container').position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
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
    console.log("------------------------------");
  }
  if(canvas)
    canvas.position((window.innerWidth-GameWidth)/2,GameHeight/4,'absolute');
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
    p5.text('BOT WIN', GameWidth/2 - GameWidth/12, GameHeight/2 + GameHeight/12);
    return false;
  }
  return true;
}

const Game = () => {
  const contexUser = useContext(UserContext);
  const [reslt1, setReslt1] = useState(0);
  const [reslt2, setReslt2] = useState(0);
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
        for(let a=0;a<GameSpeed;a++)
          BallAnimation(p5);
        Racket1Animation(p5);
        Racket2Animation(p5);
        LineCenter(p5);
        setReslt1(Result1Val);
        setReslt2(Result2Val);
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

  return (
    <div className="relative flex mx-auto my-auto w-[100%] h-[calc(50vw+12.5vw)] lg:h-[calc(540px+12.5vw)]">
      <div className=" relative flex h-[12.5vw] w-[50%] lg:h-[125px] lg:w-[500px] mx-auto">
        <img className=" relative flex w-[25%] h-[100%] bg-center rounded-tl-xl" src={myimage!.toString()}/>
        {/* <img className=" relative flex w-[50%] h-[50%%] bg-center" src={myimage1!}/> */}
        <div className="absolute flex w-[60%] h-[100%] left-[20%] trapezoid z-10">
        </div>
        {/* <img className="relative flex w-[50%] h-[25vw] bg-center" src={enemmyimage1!}/> */}
        <img className="relative flex left-[50%] w-[25%] h-[100%] bg-center rounded-tr-xl" src={"/3.jpg"}/>
      </div>
      <div  className=" absolute flex h-[12.5vw] w-[25%] lg:h-[125px] lg:w-[250px] left-[37.5%] lg:left-[43.3%] rounded-xl z-20">
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{myusername!.toString()}</div>
        <div className="relative my-auto flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt1}</div>
        <div className="relative my-auto mx-auto flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">-</div>
        <div className="relative my-auto flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt2}</div>
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{"BOT"}</div>
      </div>
      {/* <div className="relative flex h-[40vw] w-[60%] mx-auto"> */}
        <div id="sketch-container" className="absolute flex mx-auto my-auto w-[100%] h-[50vw]"></div>
      {/* </div> */}
    </div>
  );
};

export default Game;