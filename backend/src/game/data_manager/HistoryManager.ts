import { Injectable } from "@nestjs/common";
import { History } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { data } from "../game_brain/logic/game_server_class";

@Injectable()
export class HistoryManager
{

    constructor(@InjectRepository(History) private History: Repository<History>,){}
    
    NewHistory(GameObj:data)
    {
        const hstry:History = new History();
        hstry.myusername = GameObj.PlayersInfo.Player1UserName;
        hstry.enemmyusername = GameObj.PlayersInfo.Player2UserName;
        hstry.myresult = GameObj.PlayersInfo.Result1Val;
        hstry.enemmyresult = GameObj.PlayersInfo.Result2Val;
        hstry.score = (GameObj.PlayersInfo.Result1Val-GameObj.PlayersInfo.Result2Val) *  100;
        hstry.rank =  (GameObj.PlayersInfo.Result1Val-GameObj.PlayersInfo.Result2Val) *  10;
        this.History.save(hstry);

        const hstry2:History = new History();
        hstry2.myusername = GameObj.PlayersInfo.Player2UserName;
        hstry2.enemmyusername = GameObj.PlayersInfo.Player1UserName;
        hstry2.myresult = GameObj.PlayersInfo.Result2Val;
        hstry2.enemmyresult = GameObj.PlayersInfo.Result1Val;
        hstry2.score = (GameObj.PlayersInfo.Result2Val-GameObj.PlayersInfo.Result1Val) *  100;
        hstry2.rank =  (GameObj.PlayersInfo.Result2Val-GameObj.PlayersInfo.Result1Val) *  10;
        this.History.save(hstry2);
    }

    GetHistoryByUsername(username:string):Promise<History[]>
    {
        return this.History.findBy({myusername:username});
    }
}