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
        const Win10Times: GameArchievement | null =  await this.Archievement.GetUserArchievementBy(GameInfo.username,'Win10Times');
        const Win50Times: GameArchievement | null =  await this.Archievement.GetUserArchievementBy(GameInfo.username,'Win50Times');
        const Win100Times: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Win100Times');
        const Lose10Times: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Lose10Times');
        const Lose50Times: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Lose50Times');
        const Lose100Times: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Lose100Times');
        const Play10Times: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Play10Times');
        const Play50Times: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Play50Times');
        const Play100Times: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Play100Times');
        const Gain4Archievement: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Gain4Archievement');
        const Gain9Archievement: GameArchievement | null = await this.Archievement.GetUserArchievementBy(GameInfo.username,'Gain9Archievement');
        const Gain15Archievement: GameArchievement | null =  await this.Archievement.GetUserArchievementBy(GameInfo.username,'Gain15Archievement');
        if(GameInfo.totalwins === 1 && !Win10Times)
            this.Archievement.NewArchievement('Win10Times',GameInfo.username);
        else if(GameInfo.totalwins === 2 && !Win50Times)
            this.Archievement.NewArchievement('Win50Times',GameInfo.username);
        else if(GameInfo.totalwins === 3 && !Win100Times)
            this.Archievement.NewArchievement('Win100Times',GameInfo.username);
        if(GameInfo.totalosses === 1 && !Lose10Times)
            this.Archievement.NewArchievement('Lose10Times',GameInfo.username);
        else if(GameInfo.totalosses === 2 && !Lose50Times)
            this.Archievement.NewArchievement('Lose50Times',GameInfo.username);
        else if(GameInfo.totalosses === 3 && !Lose100Times)
            this.Archievement.NewArchievement('Lose100Times',GameInfo.username);
        if(GameInfo.totalgames === 2 && !Play10Times)
            this.Archievement.NewArchievement('Play10Times',GameInfo.username);
        else if(GameInfo.totalgames === 4 && !Play50Times)
            this.Archievement.NewArchievement('Play50Times',GameInfo.username);
        else if(GameInfo.totalgames === 6 && !Play100Times)
            this.Archievement.NewArchievement('Play100Times',GameInfo.username);
        //maybe should be a problem becouse return null ,so 'null.length' should'nt work?
        ArchievementLength = (await (this.Archievement.GetAllUserArchievementByUsername(GameInfo.username))).length;
        if(ArchievementLength === 4 && !Gain4Archievement)
            this.Archievement.NewArchievement('Gain4Archievement',GameInfo.username);
        else if(ArchievementLength === 9 && !Gain9Archievement)
            this.Archievement.NewArchievement('Gain9Archievement',GameInfo.username);
        else if(ArchievementLength === 15 && !Gain15Archievement)
            this.Archievement.NewArchievement('Gain15Archievement',GameInfo.username);
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
