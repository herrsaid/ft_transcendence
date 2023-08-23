import { Rooms } from "../lobbie.gateway";



export function RequestRefusedLogic(RoomIndex:number): void {
    console.log("RequestRefused");
    if(Rooms[RoomIndex] && Rooms[RoomIndex].players[0])
    {
      Rooms[RoomIndex].players[0].PlayerSocket.emit('DisplayNotification','Request Refused');
      Rooms[RoomIndex].players[0].PlayerSocket.emit("RequestRefused");
    }
  }