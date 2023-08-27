import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { GameContextType, GameInfoType, GetGameInfoContext } from "../../Game/GameContext/GameContext";
import { socket } from "../../Game/Online/Socket/auto_match_socket";
import { useRouter } from "next/navigation";
import { GetGameDataContext, GameDataContextType, GameDataType } from '../../Game/Online/Play/GameClass/GameClass';
import { useEffect, useState } from "react";

export let InGame:{IG:boolean,IL:boolean,RM:boolean} = {IG: false,IL: false,RM:true};

const JoinPrivateRoom = (GameContext:GameContextType,InviterName:string,router: AppRouterInstance,access:boolean)=>
{
  let notification:HTMLElement| null = document.getElementById('notification');
    let newGameInfo:GameInfoType = GameContext.GameInfo;
    let obj = 
    {
        target: InviterName,
        Username: GameContext.GameInfo.myusername,
        myimage: GameContext.GameInfo.myimage,
    };
    socket.emit("JoinPrivateRoom",obj);
    socket.on('SendData', (username,playerimg,data) => {
          newGameInfo.enemmyusername = username;
          newGameInfo.enemmyimage = playerimg;
          newGameInfo.host = data;
      });
      socket.on('JoinAccepted',(speed:number,points: number)=>
      {
          newGameInfo.Access=1;
          newGameInfo.Speed = speed;
          newGameInfo.Points = points;
          GameContext.SetGameInfo(newGameInfo);
          if(notification)
          {
            notification.style.opacity = "0";
            notification.style.display = "none";
          }
          // router.replace(`/Game/Lobbie`);
          router.replace(`/Game/Online/Play`);
    });
}

const Notification = () => 
{
    const router: AppRouterInstance = useRouter();
    const GameContext:GameContextType = GetGameInfoContext();
    const GDC:GameDataContextType = GetGameDataContext();
    const [InviterName,SetInviterName] = useState("");
    const [access,Setaccess] = useState(false);

    useEffect(()=>
    {
      let notification:HTMLElement| null = document.getElementById('notification');
      let content:HTMLElement| null = document.getElementById('content');
      socket.emit("Online",GameContext.GameInfo.myusername);
      socket.on("SendRequest",(data)=>
      {
        if(notification && content)
        {
          notification.style.opacity = "1";
          notification.style.display = "flex";
          content.innerText = data.message;
        }
        console.log("InGame: "+InGame.IG);
        if(InGame.IG)
        {
          if(notification)
          {
            notification.style.opacity = "0";
            notification.style.display = "none";
          }
          socket.emit("RequestRefused",data.inviterusername);
          Setaccess(false);
        }
        else if(InviterName !=  "" && InviterName != data.inviterusername)
        {
          socket.emit("RequestRefused",InviterName);
        }
        else
        {
          SetInviterName(data.inviterusername);
          GameContext.SetGameInfo({...GameContext.GameInfo,enemmyusername:data.inviterusername,enemmyimage:data.inviterImg});
          Setaccess(true);
        }
      });
      socket.on("DisplayNotification",(message)=>
      {
        console.log("InGame.il "+InGame.IL + " RoomMood " + InGame.RM)
        if(notification && content && (InGame.IL && InGame.RM === false))
        {
            notification.style.opacity = "1";
            notification.style.display = "flex";
            content.innerText = message;
            Setaccess(false);
        }
      });
      let interval:NodeJS.Timer = setInterval(()=>
      {
        if(notification)
        {
          notification.style.opacity = "0";
          notification.style.display = "none";
          if(access && InviterName !=  "")
            socket.emit("RequestRefused",InviterName);
        }
        SetInviterName("");
        Setaccess(false);
      },6000);
      return ()=>
      {
        clearInterval(interval);
      };
    });

    return(
        <div id="notification"
          className='fixed w-[200px] h-[60px] top-[5px] left-1/2 transform -translate-x-1/2
          my-auto rounded-md bg-indigo-500 flex flex-wrap overflow-hidden
          opacity-0 z-50'
          onClick={()=>
          {
            if(access)
            {
              router.replace(`/Game/Lobbie`);
              GDC.SetGameData(new GameDataType());
              JoinPrivateRoom(GameContext,InviterName,router,access)
            }
            }} >
          <img className='relative w-[20px]  h-[20px] flex  mt-[10px] ml-[10px]' src="/info.png">
          </img>
          <div className='relative w-[60px] h-[25px] mt-[10px] ml-[10px] flex text-sm font-bold'>
              info
          </div>
          <div id="content" className='relative text-sm  ml-[40px] flex-none block w-full'>
          </div>
        </div>
    );
}
export default Notification;
