import { Injectable } from "@nestjs/common";
import { GameUserInfo } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { data } from "../game_brain/logic/game_server_class";

@Injectable()
export class GameInfoManager
{

    constructor(@InjectRepository(GameUserInfo) private GameUserInfo: Repository<GameUserInfo>,){}
    
    async CreateOrUpdateGameInfo(GameObj:data)
    {
        if((await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName)).username != undefined)
        {
            console.log( "big here =>>>>>>>>>>>>>>: "+(await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName)).username);
            const GameInfo:GameUserInfo =  new GameUserInfo;
            GameInfo.username = GameObj.PlayersInfo.Player1UserName;
            GameInfo.totalgames = 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = 0;
                this.GameUserInfo.save(GameInfo);
        }
        else
        {
            const GameInfo:GameUserInfo =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName);
            GameInfo.totalgames += 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = 0;
                this.GameUserInfo.update(GameInfo,{key:1});
        }

        if((await this.GetHistoryByUsername(GameObj.PlayersInfo.Player2UserName)).username != undefined)
        {
            console.log( "big here =>>>>>>>>>>>>>>: "+(await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName)).username);
            const GameInfo:GameUserInfo =  new GameUserInfo;
            GameInfo.username = GameObj.PlayersInfo.Player2UserName;
            GameInfo.totalgames = 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = 0;
                this.GameUserInfo.save(GameInfo);
        }
        else
        {
            const GameInfo:GameUserInfo =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName);
            GameInfo.totalgames += 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = 0;
                this.GameUserInfo.update(GameInfo,{key:1});
        }
    }

    GetHistoryByUsername(username:string):Promise<GameUserInfo>
    {
        return this.GameUserInfo.findOneBy({username:username});
    }
}