import { RacketsAttribute,RacketsInfo } from "../methods/rackets_attribute";
import { BallsAttribute,BallInfo } from "../methods/ball_attribute";
import { PlayersAttribute,PlayersInfo } from "../methods/players_attribute";
import { GameRommAttribute,RoomInfo } from "../methods/game_room_attribute";
import { GameStreamAttribute,StreamsInfo } from "../methods/Game_stream_attribute";
import { GameLogic,LogicFunc } from "./game_server_logic";

export type  data = {
    Logic: GameLogic;
    RoomInfo: GameRommAttribute;
    StreamsInfo: GameStreamAttribute[];
    PlayersInfo: PlayersAttribute;
    BallInfo: BallsAttribute;
    RacketsInfo: RacketsAttribute;
};

export const obj: data = {
    Logic: LogicFunc,
    RoomInfo: RoomInfo,
    StreamsInfo: StreamsInfo,
    PlayersInfo: PlayersInfo,
    BallInfo: BallInfo,
    RacketsInfo: RacketsInfo,
  };
