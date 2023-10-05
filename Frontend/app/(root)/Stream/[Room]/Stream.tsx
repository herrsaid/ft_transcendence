'use client'

import p5 from "p5";
import { useEffect,useState } from "react";
import { GameDataType } from "./StreamClass/StreamClass";
import { GetStreamInfoContext, StreamContextType } from '../../Stream/StreamContext/StreamContext'
import './Stream.css';
import { GetPlayersData } from "./GameFunctions/GameLogic";
import { NewValue } from "./GameFunctions/Initialise";
import { Ball, LineCenter, Racket1, Racket2 } from "./GameFunctions/GameDrawer";
import { player1, player2 } from "../../Game/Online/Socket/start_game_socket";
import { socket } from "../../Game/Online/Socket/auto_match_socket";
import { useToast } from "@chakra-ui/react";
import { GameContextType, GetGameInfoContext } from "../../Game/GameContext/GameContext";
import { stream } from "../Socket/start_stream_socket";

export let StreamData:GameDataType = new GameDataType();

const Game = ({ router }: any) => {
  let test:p5;
  let BottomNav:HTMLElement| null = document.getElementById('BottomNav');
  let LeftNav:HTMLElement| null = document.getElementById('LeftNav');
  if(BottomNav && LeftNav)
  {
      BottomNav.style.display = "block";
      LeftNav.style.display = "none";
  }
  const StreamContext:StreamContextType = GetStreamInfoContext();
  const [reslt1, setReslt1] = useState(0);
  const [reslt2, setReslt2] = useState(0);
  useEffect(() => {
    try
    {
      player1.emit('conection_closed');
      player2.emit('conection_closed');
      socket.emit('conection_closed');
      const sketch = (p5: p5) => {
        p5.setup = () => {
        };
        
        p5.draw = () => 
        {
          NewValue(p5);
          GetPlayersData(router,StreamContext);
          if(!StreamContext.StreamInfo.Access)
          {
            router.replace('/Stream');
            return ;
          }
          if(document.getElementById('sketch-container'))
            p5.createCanvas(StreamData.GameWidth, StreamData.GameHeight)
              .parent('sketch-container')
              .position((window.innerWidth-StreamData.GameWidth)/2,StreamData.GameHeight/4,'absolute');
          p5.background("#090533");
          LineCenter(p5);
          setReslt1(StreamData.Result1Val);
          setReslt2(StreamData.Result2Val);
          Ball(p5,StreamData.BallXpos,StreamData.BallYpos,StreamData.BallWidth,StreamData.BallHeight);
          Racket1(p5,StreamData.Racket1Xpos,StreamData.Racket1Ypos,StreamData.Racket1Width,StreamData.Racket1Height);
          Racket2(p5,StreamData.Racket2Xpos,StreamData.Racket2Ypos,StreamData.Racket2Width,StreamData.Racket2Height);
        }
      };
  
      test = new p5(sketch);
    }
    catch{}
    return()=>
    {
      test.remove();
      StreamData = new GameDataType();
      stream.emit('spectator_leave');
    };
  }, []);

    if(!StreamContext.StreamInfo.Access)
      return (<div></div>);
  return (
    <div className="relative flex mx-auto my-auto w-[100%] h-[100vh]">
      <div className=" relative flex h-[12.5vw] w-[50%] lg:h-[125px] lg:w-[500px] mx-auto">
        <img className=" relative flex w-[25%] h-[100%] bg-center brightness-[0.75] rounded-tl-xl" src={StreamContext.StreamInfo.Player1Image}/>
        {/* <img className=" relative flex w-[50%] h-[50%%] bg-center" src={myimage1!}/> */}
        <div className="absolute flex w-[60%] h-[100%] left-[20%] trapezoid z-10">
        </div>
        {/* <img className="relative flex w-[50%] h-[25vw] bg-center" src={enemmyimage1!}/> */}
        <img className="relative flex left-[50%] w-[25%] h-[100%] bg-center brightness-[0.75] rounded-tr-xl" src={StreamContext.StreamInfo.Player2Image!}/>
      </div>
      <div  className=" absolute flex h-[12.5vw] w-[25%] lg:h-[125px] lg:w-[250px] left-[37.5%] lg:left-[43.3%] rounded-xl z-20">
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{StreamContext.StreamInfo.Player1UserName!}</div>
        <div className="relative my-auto  flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt1}</div>
        <div className="relative my-auto mx-auto flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">-</div>
        <div className="relative my-auto   flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt2}</div>
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{StreamContext.StreamInfo.Player2UserName}</div>
      </div>
      {/* <div className="relative flex h-[40vw] w-[60%] mx-auto"> */}
        <div id="sketch-container" className="absolute flex mx-auto my-auto w-[100%] h-[50vw]"></div>
      {/* </div> */}
    </div>
  );
};

export default Game;
