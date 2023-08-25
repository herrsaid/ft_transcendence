import { RoomClass } from "../auto_match_class/RoomClass";
import { Rooms } from "../lobbie.gateway";



export function RequestRefusedLogic(target:string): void {
    console.log("RequestRefused");
    let Room:RoomClass = Rooms.find(elem => elem.players.find(elem=> elem.Player === target) !== undefined);
    if(Room && Room.players[0])
    {
      Room.players[0].PlayerSocket.emit('DisplayNotification','Request Refused');
      Room.players[0].PlayerSocket.emit("RequestRefused");
    }
  }