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
import { GetGameInfoContext, GameContextType } from '../../../GameContext/GameContext';
import p5 from "p5";
import '../Game.css'
import { GameClass } from '../GameClass/GameClass';
import { NewValue } from '../GameFunctions/Initialise';
import { Ball, LineCenter, Racket1, Racket2 } from '../GameFunctions/GameDrawer';
import { GameStatusChecker } from '../GameFunctions/GameChecker';
import { BallAnimation, Racket1Animation, Racket2Animation } from '../GameFunctions/GameLogic';

export let GameData:GameClass;

const Game = () => {
  const contexUser = useContext(UserContext);
  const GameContext = GetGameInfoContext();
  const [reslt1, setReslt1] = useState(0);
  const [reslt2, setReslt2] = useState(0);
  useEffect(() =>
  {
    let BottomNav:HTMLElement| null = document.getElementById('BottomNav');
    let LeftNav:HTMLElement| null = document.getElementById('LeftNav');
    if(BottomNav && LeftNav)
    {
        BottomNav.style.display = "block";
        LeftNav.style.display = "none";
    }
    GameData = new GameClass();
    const sketch = (p5: p5) => {
      p5.setup = () => {
      };
      
      p5.draw = () => {
        NewValue(p5);
        p5.background("#090533");
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
      if(BottomNav && LeftNav)
      {
          BottomNav.style.display = "none";
          LeftNav.style.display = "block";
      }
      test.remove();
      GameData = new GameClass();
    };
  }, []);

  return (
    <div className="relative flex mx-auto my-auto w-[100%] h-[calc(50vw+12.5vw)] lg:h-[calc(540px+12.5vw)]">
      <div className=" relative flex h-[12.5vw] w-[50%] lg:h-[125px] lg:w-[500px] mx-auto">
        <img className=" relative flex w-[25%] h-[100%] bg-center brightness-[0.75] rounded-tl-xl" src={GameContext.GameInfo.myimage!.toString()}/>
        {/* <img className=" relative flex w-[50%] h-[50%%] bg-center" src={myimage1!}/> */}
        <div className="absolute flex w-[60%] h-[100%] left-[20%] trapezoid z-10">
        </div>
        {/* <img className="relative flex w-[50%] h-[25vw] bg-center" src={enemmyimage1!}/> */}
        <img className="relative flex left-[50%] w-[25%] h-[100%] bg-center brightness-[0.75] rounded-tr-xl" src={"/3.jpg"}/>
      </div>
      <div  className=" absolute flex h-[12.5vw] w-[25%] lg:h-[125px] lg:w-[250px] left-1/2 transform -translate-x-1/2 my-auto  rounded-xl z-20">
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw]  lg:text-[1vw]">{GameContext.GameInfo.myusername!.toString()}</div>
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