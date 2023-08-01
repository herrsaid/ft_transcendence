import { RacketsAttribute } from "../methods/rackets_attribute";
import { BallsAttribute } from "../methods/ball_attribute";
import { PlayersAttribute } from "../methods/players_attribute";
import { GameRommAttribute } from "../methods/game_room_attribute";
import { GameStreamAttribute } from "../methods/Game_stream_attribute";
import { GameLogic } from "./game_server_logic";

export class  data{
    public Logic: GameLogic;
    public RoomInfo: GameRommAttribute;
    public StreamsInfo: GameStreamAttribute[];
    public PlayersInfo: PlayersAttribute;
    public BallInfo: BallsAttribute;
    public RacketsInfo: RacketsAttribute;
    constructor()
    {
        this.Logic = new GameLogic;
        this.RoomInfo = new GameRommAttribute;
        this.StreamsInfo = [];
        this.PlayersInfo = new PlayersAttribute;
        this.BallInfo = new BallsAttribute;
        this.RacketsInfo = new RacketsAttribute;
    }
};
