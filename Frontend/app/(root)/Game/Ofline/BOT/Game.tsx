'use client'

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

import { useEffect,useContext,useState } from "react";
import UserContext from "@/app/(root)/UserContext";
import { GetGameInfoContext, GameContextType } from '../../GameContext/GameContext';
import p5 from "p5";
import './Game.css'
import { GameClass } from './GameClass/GameClass';


export let GameData:GameClass = new GameClass();
function Ball(p5: p5, x: number, y: number, w: number, h: number)
{
  p5.fill(255,255,255);
  p5.ellipse(x, y, w, h);
}
function LineCenter(p5: p5)
{
  p5.fill('yellow');
  for(let a=0;a<GameData.GameWidth/2;a+=35)
    p5.rect(GameData.GameWidth/2, a, 5, 30,20);
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
      GameData.alpha = ballYpos_racket_par_100 - (10 - ballYpos_racket_par_100);
      GameData.alpha = Math.floor(GameData.alpha);
      if(GameData.alpha === -10|| GameData.alpha === 10)
        GameData.alpha = 9;
      if(GameData.alpha > 0)
        GameData.alpha -= 10;
      else if(GameData.alpha < 0)
        GameData.alpha += 10;
      if(ballYpos_racket_par_100 > 5)
        GameData.BallYDirection = 1;
      else
        GameData.BallYDirection = -1;
      if(GameData.alpha < 0)
        GameData.alpha *= -1;
}
function BallAnimation(p5: p5)
{
  GameData.BallXpos += Math.floor(GameData.BallXDirection);
  if(GameData.BallYpos < GameData.Racket2Ypos || GameData.BallYpos > (GameData.Racket2Ypos + GameData.Racket2Height))
  {
    if(GameData.BallXpos > GameData.GameWidth)
    {
      GameData.BallXDirection = -1;
      GameData.Result1Val++;
      GameData.BallXpos = Math.floor(GameData.GameWidth/2);
    }
  }
  else
  {
    if(GameData.BallXpos > (GameData.GameWidth-(GameData.BallWidth+GameData.Racket1Width)))
    {
      GameData.BallXDirection = -1;
      GetAlpha(p5,GameData.BallYpos,GameData.Racket2Ypos,GameData.Racket2Height);
    }
  }
  if(GameData.BallYpos < GameData.Racket1Ypos || GameData.BallYpos > (GameData.Racket1Ypos + GameData.Racket1Height))
  {
    if(GameData.BallXpos < 0)
    {
      GameData.BallXDirection = +1;
      GameData.Result2Val++;
      GameData.BallXpos =  Math.floor(GameData.GameWidth/2);
    }
  }
  else
  {
    if(GameData.BallXpos < (GameData.BallWidth + GameData.Racket2Width))
    {
      GameData.BallXDirection = +1;
      GetAlpha(p5,GameData.BallYpos,GameData.Racket1Ypos,GameData.Racket1Height);
    }
  }
  if(GameData.BallXpos % GameData.alpha === 0)
  {
    if(GameData.BallYpos > GameData.GameHeight-GameData.BallHeight/2)
      GameData.BallYDirection = -1
    if(GameData.BallYpos < GameData.BallHeight/2)
      GameData.BallYDirection = +1
    GameData.BallYpos += GameData.BallYDirection;
  }
}

function Racket1Animation(p5: p5,GameContext:GameContextType): undefined
{
  if(p5.mouseY > 0 && p5.mouseY < 400 && p5.mouseX > 0 && p5.mouseX < 400)
  {
    if(p5.mouseY< GameData.Racket1Ypos && (GameData.Racket1Ypos > 0))
      GameData.Racket1Ypos -= GameContext.GameInfo.Speed;
    else if(p5.mouseY > GameData.Racket1Ypos && (GameData.Racket1Ypos < (GameData.GameHeight - GameData.Racket1Height)))
      GameData.Racket1Ypos += GameContext.GameInfo.Speed;
  }
    if((p5.key == 'w' || p5.key == 'ArrowUp') && (GameData.Racket1Ypos > 0))
    GameData.Racket1Ypos -= GameContext.GameInfo.Speed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (GameData.Racket1Ypos < (GameData.GameHeight - GameData.Racket1Height)))
    GameData.Racket1Ypos += GameContext.GameInfo.Speed;
}
function Racket2Animation(p5: p5,GameContext:GameContextType)
{
  let rand = p5.random(100);
  // if(rand > 95)
  //   await setTimeout(()=>{},10000);
  if(GameData.BallXDirection > 0 && GameData.BallXpos > (GameData.GameWidth/2 + GameData.GameWidth/4))
  {
    if(GameData.BallYpos < GameData.Racket2Ypos && (GameData.Racket2Ypos > 0))
    GameData.Racket2Ypos -= GameContext.GameInfo.Speed;
    else if (GameData.BallYpos > (GameData.Racket2Ypos+GameData.Racket2Height)   && (GameData.Racket2Ypos < (GameData.GameHeight - GameData.Racket2Height)))
    GameData.Racket2Ypos += GameContext.GameInfo.Speed;
  }
}

function NewValue(p5:p5)
{
  let canvas:p5.Element| null = null;
  let w:number = Math.floor(window.innerWidth) ;
  let h:number = Math.floor(window.innerWidth/2);
  if(document.getElementById('sketch-container'))
    canvas = p5.createCanvas(GameData.GameWidth, GameData.GameHeight).parent('sketch-container');
  if((w !== GameData.GameWidth || h !== GameData.GameHeight) && window.innerWidth < 1080)
  {
    GameData.BallXpos = Math.floor(((GameData.BallXpos*100)/GameData.GameWidth)*(w/100));
    GameData.BallYpos = Math.floor(((GameData.BallYpos*100)/GameData.GameHeight)*(h/100));
    GameData.Racket1Ypos = Math.floor(((GameData.Racket1Ypos*100)/GameData.GameHeight)*(h/100));
    GameData.Racket2Ypos = Math.floor(((GameData.Racket2Ypos*100)/GameData.GameHeight)*(h/100));
    GameData.GameWidth = w;
    GameData.GameHeight =  h;
    GameData.BallWidth = Math.floor(GameData.GameWidth/52);
    GameData.BallHeight = Math.floor(GameData.GameHeight/26);
    GameData.Racket1Width = Math.floor(GameData.GameWidth/80);
    GameData.Racket1Height = Math.floor(GameData.GameHeight/6);
    GameData.Racket1Xpos = Math.floor(GameData.GameWidth/160);
    GameData.Racket2Width = Math.floor(GameData.GameWidth/80);
    GameData.Racket2Height = Math.floor(GameData.GameHeight/6);
    GameData.Racket2Xpos = Math.floor(GameData.GameWidth-((GameData.GameWidth/80)+(GameData.GameWidth/160)));
    p5.createCanvas(GameData.GameWidth, GameData.GameHeight).parent('sketch-container').position((window.innerWidth-GameData.GameWidth)/2,GameData.GameHeight/4,'absolute');
    p5.background(25);
    console.log("------------------------------");
    console.log("GameWidth: ",GameData.GameWidth);
    console.log("GameHeight: ",GameData.GameHeight);
    console.log("BallWidth: ",GameData.BallWidth);
    console.log("BallHeight: ",GameData.BallHeight);
    console.log("Racket1Width: ",GameData.Racket1Width);
    console.log("Racket1Height: ",GameData.Racket1Height);
    console.log("Racket1Xpos: ",GameData.Racket1Xpos);
    console.log("Racket2Width: ",GameData.Racket2Width);
    console.log("Racket2Height: ",GameData.Racket2Height);
    console.log("Racket2Xpos: ",GameData.Racket2Xpos);
    console.log("------------------------------");
  }
  if(canvas)
    canvas.position((window.innerWidth-GameData.GameWidth)/2,GameData.GameHeight/4,'absolute');
}

function GameStatusChecker(p5: p5,GameContext:GameContextType): boolean
{
  if(GameContext.GameInfo.Points <= GameData.Result1Val)
  {
    p5.background(0);
    p5.fill(255,255,255);
    p5.text(`${GameContext.GameInfo.myusername} WIN`, GameData.GameWidth/2 - GameData.GameWidth/12, GameData.GameHeight/2 + GameData.GameHeight/12);
    return false;
  }
  else if(GameContext.GameInfo.Points <= GameData.Result2Val)
  {
    p5.background(0);
    p5.fill(255,255,255);
    p5.text('BOT WIN', GameData.GameWidth/2 - GameData.GameWidth/12, GameData.GameHeight/2 + GameData.GameHeight/12);
    return false;
  }
  return GameData.access;
}

const Game = () => {
  const contexUser = useContext(UserContext);
  const GameContext = GetGameInfoContext();
  const [reslt1, setReslt1] = useState(0);
  const [reslt2, setReslt2] = useState(0);
  useEffect(() => {
    let x = 25;

    const sketch = (p5: p5) => {
      p5.setup = () => {
      };
      
      p5.draw = () => {
        console.log("------------------------------");
        console.log("BallXDirection: ",GameData.BallXDirection);
        console.log("BallYDirection: ",GameData.BallYDirection);
        console.log("BallXpos: ",GameData.BallXpos);
        console.log("BallYpos: ",GameData.BallYpos);
        console.log("Racket1Ypos: ",GameData.Racket1Ypos);
        console.log("Racket2Ypos: ",GameData.Racket2Ypos);
        console.log("------------------------------");
        NewValue(p5);
        p5.background(25);
        Racket1(p5,GameData.Racket1Xpos,GameData.Racket1Ypos,GameData.Racket1Width,GameData.Racket1Height);
        LineCenter(p5);
        Racket2(p5,GameData.Racket2Xpos,GameData.Racket2Ypos,GameData.Racket2Width,GameData.Racket2Height);
        Ball(p5,GameData.BallXpos,GameData.BallYpos,GameData.BallWidth,GameData.BallHeight);
        if(!GameStatusChecker(p5,GameContext))
          return;
        for(let a=0;a<GameContext.GameInfo.Speed;a++)
          BallAnimation(p5);
        Racket1Animation(p5,GameContext);
        Racket2Animation(p5,GameContext);
        setReslt1(GameData.Result1Val);
        setReslt2(GameData.Result2Val);
      };
      p5.keyReleased = () =>{
        p5.key = '';
      }
      p5.keyPressed = () =>{
        if(GameContext.GameInfo.pause_game && p5.key === 'p')
        {
          if(GameData.access)
          GameData.access = false;
          else
            GameData.access = true;
        }
      }
    };

    const test:p5 = new p5(sketch);
    return()=>
    {
      test.remove();
    };
  }, []);

  return (
    <div className="relative flex mx-auto my-auto w-[100%] h-[calc(50vw+12.5vw)] lg:h-[calc(540px+12.5vw)]">
      <div className=" relative flex h-[12.5vw] w-[50%] lg:h-[125px] lg:w-[500px] mx-auto">
        <img className=" relative flex w-[25%] h-[100%] bg-center rounded-tl-xl" src={GameContext.GameInfo.myimage!.toString()}/>
        {/* <img className=" relative flex w-[50%] h-[50%%] bg-center" src={myimage1!}/> */}
        <div className="absolute flex w-[60%] h-[100%] left-[20%] trapezoid z-10">
        </div>
        {/* <img className="relative flex w-[50%] h-[25vw] bg-center" src={enemmyimage1!}/> */}
        <img className="relative flex left-[50%] w-[25%] h-[100%] bg-center rounded-tr-xl" src={"/3.jpg"}/>
      </div>
      <div  className=" absolute flex h-[12.5vw] w-[25%] lg:h-[125px] lg:w-[250px] left-[37.5%] lg:left-[43.3%] rounded-xl z-20">
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{GameContext.GameInfo.myusername!.toString()}</div>
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