import { Rooms } from "../lobbie.gateway";
import { Socket } from 'socket.io';
import { PlayerClass } from "../auto_match_class/PlayerClass";
import { UserInfo, UserInfo1 } from "src/game/PingPong.dto";
import { RoomClass } from "../auto_match_class/RoomClass";


export function JoinPrivateRoomLogic(client: Socket, data: UserInfo1): void 
    {
      let player_data:PlayerClass = new PlayerClass;
      player_data.Player = data.username;
      player_data.PlayerImg = data.myimage;
      player_data.PlayerId = client.id;
      player_data.PlayerSocket = client;
      let Room:RoomClass = Rooms.find
      (
        elem => elem.players.find
        (
          elem=> elem.Player === data.target
        ) !== undefined
      );
      if(Room === undefined)
        return;
      if(Room.players.length)
      {
        Room.players.push(player_data);
        // console.log("Puseh New Room");
        Room.players[0].PlayerSocket.emit(
          'SendData',Room.players[1].Player,Room.players[1].PlayerImg,true);
          Room.players[1].PlayerSocket.emit(
          'SendData',Room.players[0].Player,Room.players[0].PlayerImg,false);
        client.emit('JoinAccepted',Room.Speed,Room.Points);
      }
      else
      {
        client.emit('JoinRefused','Room is full or already in match');
        return ;
      }
      // console.log(Rooms);
      // console.log("Launch Public Room");
      for(let a=0;a<Room.players.length;a++)
        Room.players[a].PlayerSocket.emit('conection_closed');
    }