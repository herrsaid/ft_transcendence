import { Rooms } from "../lobbie.gateway";
import { Socket } from 'socket.io';
import { PlayerClass } from "../auto_match_class/PlayerClass";
import { UserInfo } from "src/game/PingPong.Entity";


export function JoinPrivateRoomLogic(client: Socket, data: UserInfo): void 
    {
      let player_data:PlayerClass = new PlayerClass;
      player_data.Player = data.Username;
      player_data.PlayerImg = data.myimage;
      player_data.PlayerId = client.id;
      player_data.PlayerSocket = client;
      if(Rooms[data.RoomNumber].players.length)
      {
        Rooms[data.RoomNumber].players.push(player_data);
        console.log("Push New Room");
        Rooms[data.RoomNumber].players[0].PlayerSocket.emit(
          'SendData',Rooms[data.RoomNumber].players[1].Player,Rooms[data.RoomNumber].players[1].PlayerImg,true);
        Rooms[data.RoomNumber].players[1].PlayerSocket.emit(
          'SendData',Rooms[data.RoomNumber].players[0].Player,Rooms[data.RoomNumber].players[0].PlayerImg,false);
        client.emit('JoinAccepted',Rooms[data.RoomNumber].Speed,Rooms[data.RoomNumber].Points);
      }
      else
      {
        client.emit('JoinRefused','Room is full or already in match');
        return ;
      }
      console.log(Rooms);
      console.log("Launch Public Room");
      for(let a=0;a<Rooms[data.RoomNumber].players.length;a++)
        Rooms[data.RoomNumber].players[a].PlayerSocket.emit('conection_closed');
    }