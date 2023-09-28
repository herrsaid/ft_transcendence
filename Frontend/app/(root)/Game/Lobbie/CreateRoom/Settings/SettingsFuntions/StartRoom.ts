import { newGameInfo,access } from '../Settings';
import { socket } from '../../../../Online/Socket/auto_match_socket'
import { GameContextType } from '../../../../GameContext/GameContext';
import { InGame } from '@/app/(root)/Components/Notification/Notification';
import Cookies from 'js-cookie';
import { stat } from 'fs';

export async function StartRoom(router: any,toast:any,GameContext:GameContextType)
{
    try
    {
        const getusernameid = async (url:string) => {
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                     }});
                if (res.status != 200)
                {
                    toast({
                        title: 'Error',
                        description: "error: this user not found",
                        position: 'top-right',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                      });
                      return;
                }
          
                return res.json();
        }
        const fetchFriendStatus = async (url:string) => {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                 }});
      
            return res.json();
        }
        const notification:HTMLElement| null = document.getElementById('notification');
        const settings = document.getElementById("Settings");
        const loading = document.getElementById("wifi-loader");
        const input_elem:any = document.getElementById("input_val");
        let input_value:String = ''; 
        input_value = input_elem.value;
        if (input_value && !!newGameInfo.RoomMood == false)
        {
            const user = await getusernameid(`${process.env.NEXT_PUBLIC_BACK_IP}/user/${input_value}`)
            if (user)
            {
                const status = await fetchFriendStatus(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/status/${user.id}`);
                if (status)
                {
                    if (status.status == "waiting-for-unblock" || status.status == "blocked")
                    {
                        toast({
                            title: 'Error',
                            description: "error: you can't send invite to this user",
                            position: 'top-right',
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                          });
                          return;
                    }
                }
            }
        }


        newGameInfo.myusername = GameContext.GameInfo.myusername;
        newGameInfo.myimage = GameContext.GameInfo.myimage;
        if(newGameInfo.Online === 1)
        {
            InGame.IL = true;
            if(notification && InGame.RM === false)
            {
                notification.style.opacity = "0";
                notification.style.display = "none";
                socket.emit("RequestRefused",{targrt:GameContext.GameInfo.enemmyusername});
            }
            socket.emit('CreateRoom',{
                speed: newGameInfo.Speed,
                points: newGameInfo.Points,
                myusername: GameContext.GameInfo.myusername,
                myimage: GameContext.GameInfo.myimage,
                roomMood: !!newGameInfo.RoomMood,
                inputValue: input_value,
            });
            socket.on("RequestRefused",()=>
            {
                if(access && settings && loading)
                {
                    InGame.IL = false;
                    settings.style.filter = "blur(0px)";
                    settings.style.animation = "Animation 1s";
                    loading.style.opacity = "0";
                    socket.emit("conection_closed");
                }
            });
            socket.on('CreateRefused', (message: string) => {
                if(access)
                {
                    if(settings && loading)
                    {
                        if(message === "you can't Create two Rooms")
                            settings.style.filter = "blur(0px)";
                        else
                        {
                            InGame.IL = false;
                            settings.style.filter = "blur(0px)";
                            settings.style.animation = "Animation 1s";
                            loading.style.opacity = "0";
                            socket.emit("conection_closed");
                        }
                    }
                        toast({
                        title: 'Error',
                        description: message,
                        position: 'top-right',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                      });
                }  
            });
            if(settings && loading)
            {
                settings.style.filter = "blur(15px)";
                loading.style.opacity = "1";
                settings.style.animation = "Animation 3s infinite";
            }
                socket.on('SendData', (username,playerimg,data) => {
                if(access)
                {
                    newGameInfo.enemmyusername = username;
                    newGameInfo.enemmyimage = playerimg;
                    newGameInfo.host = data;
                    newGameInfo.Access = 1;
                    GameContext.SetGameInfo(newGameInfo);
                    router.replace('/Game/Online/Play');
                }
            });
        }
        else
        {
            if(newGameInfo.other_tools === 1)
            {
                GameContext.SetGameInfo(newGameInfo);
                router.replace('/Game/Ofline/2P');
            }
            else
            {
                GameContext.SetGameInfo(newGameInfo);
                router.replace('/Game/Ofline/BOT');
            }
        }
    }
    catch{}
}
