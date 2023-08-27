import { Online, Rooms } from "../lobbie.gateway";
import { Socket, Server } from 'socket.io';
import { OnlineClass } from '../auto_match_class/OnlineClass';
import { PlayerClass } from "../auto_match_class/PlayerClass";
import { RoomSettingsEntity } from "src/game/PingPong.Entity";
import { RoomClass } from "../auto_match_class/RoomClass";


export function CreateRoomLogic(client: Socket, data: RoomSettingsEntity): void {
    if(data.myusername === null)
    {
      client.emit('CreateRefused','please (log-in/sign-in) to accept your join');
      return ;
    }
    if(Rooms.find((elem)=> elem.players[0].Player === data.myusername) !== undefined)
    {
      client.emit('CreateRefused',"you can't Create two Rooms");
      return ;
    }
    let player_data:PlayerClass = new PlayerClass;
    player_data.Player = data.myusername;
    player_data.PlayerImg = data.myimage;
    player_data.PlayerId = client.id;
    player_data.PlayerSocket = client;
    let check:RoomClass = Rooms.find(elem => elem.Points === data.Points && elem.Speed === data.Speed && elem.RoomMood == data.RoomMood);
    if(check !== undefined && data.RoomMood !== false)
    {
      // if(check.players.find(elem => elem.PlayerId === client.id) !== undefined)
      //   return ;
      // else
        console.log("Push New User");
      check.players.push(player_data);
      check.players[0].PlayerSocket.emit('SendData',check.players[1].Player,check.players[1].PlayerImg,true);
      check.players[1].PlayerSocket.emit('SendData',check.players[0].Player,check.players[0].PlayerImg,false);
      console.log(Rooms);
      console.log("Launch Public Room");
      return;
    }
    else if(data.RoomMood !== false)
    {
      let Room:RoomClass = new RoomClass;
      Room.players.push(player_data);
      Room.Speed = data.Speed;
      Room.Points = data.Points;
      Room.RoomMood = data.RoomMood;
      Rooms.push(Room);
    }
    else if(data.RoomMood === false)
    {
      let Room:RoomClass = new RoomClass;
      Room.players.push(player_data);
      Room.Speed = data.Speed;
      Room.Points = data.Points;
      Room.RoomMood = data.RoomMood;
      Rooms.push(Room);
      let test:OnlineClass = Online.find(elem => elem.Player === data.InputValue);
      const obj= 
      {
        message: `invite from: ${player_data.Player}`,
        inviterImg: data.myimage,
        inviterusername: data.myusername,
      }
      if(test && test.Player !== data.myusername)
      {
        test.PlayerSocket.emit('SendRequest',obj);
        console.log("Push New Room");
      }
      else
      {
        client.emit('DisplayNotification','Request Refused');
        client.emit("RequestRefused");      
      }
    }
    console.log(Rooms);
  }