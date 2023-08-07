import { Injectable } from "@nestjs/common";
import { GameArchievement, GameUserInfo } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { data } from "../game_brain/logic/game_server_class";
import { ArchievementManager } from "./ArchievementManager";

@Injectable()
export class GameInfoManager
{
    constructor(@InjectRepository(GameUserInfo) private GameUserInfo: Repository<GameUserInfo>,private Archievement:ArchievementManager){}
    
    async CheckArchievementLogic(GameInfo:GameUserInfo): Promise<number>
    {
        let ArchievementLength:number;
        if(GameInfo.totalwins === 1)
            this.Archievement.NewArchievement(GameInfo.username,'Win10Times');
        else if(GameInfo.totalwins === 2)
            this.Archievement.NewArchievement(GameInfo.username,'Win50Times');
        else if(GameInfo.totalwins === 3)
            this.Archievement.NewArchievement(GameInfo.username,'Win100Times');
        if(GameInfo.totalosses === 1)
            this.Archievement.NewArchievement(GameInfo.username,'Lose10Times');
        else if(GameInfo.totalosses === 2)
            this.Archievement.NewArchievement(GameInfo.username,'Lose50Times');
        else if(GameInfo.totalosses === 3)
            this.Archievement.NewArchievement(GameInfo.username,'Lose100Times');
        if(GameInfo.totalgames === 2)
            this.Archievement.NewArchievement(GameInfo.username,'Play10Times');
        else if(GameInfo.totalgames === 4)
            this.Archievement.NewArchievement(GameInfo.username,'Play50Times');
        else if(GameInfo.totalgames === 6)
            this.Archievement.NewArchievement(GameInfo.username,'Play100Times');
        //maybe should be a problem becouse return null ,so 'null.length' should'nt work?
        ArchievementLength = (await (this.Archievement.GetAllUserArchievementByUsername(GameInfo.username))).length;
        if(ArchievementLength >= 4)
            this.Archievement.NewArchievement(GameInfo.username,'Gain4Archievement');
        else if(ArchievementLength >= 9)
            this.Archievement.NewArchievement(GameInfo.username,'Gain9Archievement');
        else if(ArchievementLength >= 15)
            this.Archievement.NewArchievement(GameInfo.username,'Gain15Archievement');
        return (ArchievementLength);
    }
    
    async CreateOrUpdateGameInfo(GameObj:data)
    {
        const GameInfo:GameUserInfo| null =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player2UserName);
        if(!GameInfo)
        {
            const newGameInfo:GameUserInfo =  new GameUserInfo;
            newGameInfo.username = GameObj.PlayersInfo.Player2UserName;
            newGameInfo.totalgames = 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
            {
                newGameInfo.totalwins = 1;
                newGameInfo.totalosses = 0;
            }
            else
            {
                newGameInfo.totalosses = 1;
                newGameInfo.totalwins = 0;
            }
                newGameInfo.totalarchievements = 0;
            await this.GameUserInfo.save(newGameInfo);
        }
        else
        {
            GameInfo.totalgames += 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = await this.CheckArchievementLogic(GameInfo);
            // await this.GameUserInfo.update(GameInfo,{key:GameInfo.key});
            Object.assign(GameUserInfo, GameInfo);
            await this.GameUserInfo.save(GameInfo);
        }

        const GameInfo2:GameUserInfo | null =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName);
        if(!GameInfo2)
        {
            const newGameInfo2:GameUserInfo =  new GameUserInfo;
            newGameInfo2.username = GameObj.PlayersInfo.Player1UserName;
            newGameInfo2.totalgames = 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
            {
                newGameInfo2.totalwins = 1;
                newGameInfo2.totalosses = 0;
            }
            else
            {
                newGameInfo2.totalosses = 1;
                newGameInfo2.totalwins = 0;
            }
            newGameInfo2.totalarchievements = 0;
            await this.GameUserInfo.save(newGameInfo2);
        }
        else
        {
            GameInfo2.totalgames += 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
                GameInfo2.totalwins += 1;
            else
                GameInfo2.totalosses += 1;
            GameInfo2.totalarchievements = await this.CheckArchievementLogic(GameInfo2);
            // await this.GameUserInfo.update(GameInfo2,{key:GameInfo2.key});
            Object.assign(GameUserInfo, GameInfo2);
            await this.GameUserInfo.save(GameInfo2);
        }
    }

    async GetHistoryByUsername(username:string):Promise<GameUserInfo | null>
    {
        return await this.GameUserInfo.findOne({ where: { username:username } });
    }
}
