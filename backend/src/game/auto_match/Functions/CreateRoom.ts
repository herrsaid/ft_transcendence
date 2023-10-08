import { Socket } from 'socket.io';
import { Online, Rooms } from "../lobbie.gateway";
import { OnlineClass } from '../auto_match_class/OnlineClass';
import { PlayerClass } from "../auto_match_class/PlayerClass";
import { RoomSettings } from "src/game/PingPong.dto";
import { RoomClass } from "../auto_match_class/RoomClass";
import { GameObj } from "src/game/game_brain/logic/Brain";
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/entities/user/user.entity';

export async function CreateRoomLogic(client: Socket, data: RoomSettings,UserManager:UserService): Promise<void> {
    if(data.myusername === null)
    {
      client.emit('CreateRefused','please (log-in/sign-in) to accept your join');
      return ;
    }
    else if(data.points > 30)
    {
      client.emit('InvalidData','InvalidPointsData');
      return ;
    }
    else if(data.speed !== 8 && data.speed !== 6 && data.speed !== 4)
    {
      client.emit('InvalidData','InvalidSpeedData');
      return ;
    }
    else if(Online.find(elem =>elem.Player === data.myusername) === undefined)
    {
      client.emit('InvalidData','InvalidUserData');
      return ;
    }
    let Room = Rooms.find((elem)=> elem.players[0].Player === data.myusername)
    if(Room !== undefined)
    {
      if(Room.players[0].PlayerSocket === client)
        client.emit('CreateRefused',"You Can't Create Two Rooms");
      else
        client.emit('CreateRefused',"you can't create two rooms");
      return ;
    }
    if(GameObj.find((elem)=>
      elem.PlayersInfo.Player1UserName === data.myusername
        || elem.PlayersInfo.Player2UserName === data.myusername) !== undefined)
    {
      client.emit('CreateRefused',"you are already in game");
      return ;
    }
    const user1:User = await UserManager.findOneByUsername(data.myusername);
    const user2:User = await UserManager.findOneByUsername(data.inputValue);
    if(user1 && user2 && data.roomMood === false)
    {
      console.log(user1);
      console.log(user2);
      const status = await UserManager.getBlockStatus(user1.id,user2).toPromise();
      console.log(status);
      if(status)
      {
        if (status.status == "waiting-for-unblock" || status.status == "blocked")
        {
          client.emit('CreateRefused',"error: you can't send invite to this user");
          return;
        }
      }
    }
    let player_data:PlayerClass = new PlayerClass;
    player_data.Player = data.myusername;
    player_data.PlayerImg = data.myimage;
    player_data.PlayerId = client.id;
    player_data.PlayerSocket = client;
    let check:RoomClass = Rooms.find(elem => elem.Points === data.points && elem.Speed === data.speed && elem.RoomMood == data.roomMood);
    if(check !== undefined && data.roomMood !== false)
    {
      // if(check.players.find(elem => elem.PlayerId === client.id) !== undefined)
      //   return ;
      // else
        // console.log("Push New User");
      check.players.push(player_data);
      check.players[0].PlayerSocket.emit('SendData',check.players[1].Player,check.players[1].PlayerImg,true);
      check.players[1].PlayerSocket.emit('SendData',check.players[0].Player,check.players[0].PlayerImg,false);
      // console.log(Rooms);
      // console.log("Launch Public Room");
      return;
    }
    else if(data.roomMood !== false)
    {
      let Room:RoomClass = new RoomClass;
      Room.players.push(player_data);
      Room.Speed = data.speed;
      Room.Points = data.points;
      Room.RoomMood = data.roomMood;
      Rooms.push(Room);
    }
    else if(data.roomMood === false)
    {
      let Room:RoomClass = new RoomClass;
      Room.players.push(player_data);
      Room.Speed = data.speed;
      Room.Points = data.points;
      Room.RoomMood = data.roomMood;
      Rooms.push(Room);
      let test:OnlineClass = Online.find(elem => elem.Player === data.inputValue);
      const obj= 
      {
        message: `invite from: ${player_data.Player}`,
        inviterImg: data.myimage,
        inviterusername: data.myusername,
      }
      if(test && test.Player !== data.myusername)
      {
        test.PlayerSocket.emit('SendRequest',obj);
        // console.log("Push New Room");
      }
      else
      {
        client.emit('DisplayNotification','Request Refused');
        client.emit("RequestRefused");      
      }
    }
    // console.log(Rooms);
  }