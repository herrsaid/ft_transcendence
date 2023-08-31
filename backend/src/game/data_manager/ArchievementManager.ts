import { Injectable, NotFoundException } from "@nestjs/common";
import { GameArchievement, History } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ArchievementManager
{

    constructor(@InjectRepository(GameArchievement) private Archievement: Repository<GameArchievement>,){}
    
    async NewArchievement(UserId:number,ArchievementName:string)
    {
        const archieve:GameArchievement = new GameArchievement;
        const findold: GameArchievement | null = (await this.GetUserArchievementBy(UserId,ArchievementName));
        archieve.userid = UserId;
        archieve.archievement_name = ArchievementName;

        if(!findold)
            await this.Archievement.save(archieve);
        // else
            // console.log('data match');
    }

    async GetAllUserArchievementByUsername(UserId:number):Promise<GameArchievement[]>
    {
        try
        {
            return await this.Archievement.findBy({userid:UserId});
        }
        catch{
            throw new NotFoundException();
        }
        
    }
    async GetUserArchievementBy(UserId:number,ArchievementName:string):Promise<GameArchievement | null>
    {
        return (await this.Archievement.findOneBy(
            {
                    userid:UserId,
                    archievement_name:ArchievementName
            }));
    }
}

// if play 10 game // if play 50 game // if play 100 game 
// if win 10 game // if win 50 game  // if win 100 game 
// if lose 10 game // if lose 50 game // if lose 100 game 
// if exit match without complete it 3 times // if exit match without complete it 6 times // if exit match without complete it 9 times
// if gain 4 archievement // if gain 9 archievement  // if gain 14 archievement 