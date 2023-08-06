import { Injectable } from "@nestjs/common";
import { GameArchievement, History } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ArchievementManager
{

    constructor(@InjectRepository(GameArchievement) private Archievement: Repository<GameArchievement>,){}
    
    async NewArchievement(username:string,archievement_name:string)
    {
        const archieve:GameArchievement = new GameArchievement;
        archieve.username = username;
        archieve.archievement_name = archievement_name;
        this.Archievement.save(archieve);
    }

    async GetAllUserArchievementByUsername(username:string):Promise<GameArchievement[]>
    {
        return await this.Archievement.findBy({username:username});
    }
    async GetUserArchievementBy(username:string,archievement_name:string):Promise<GameArchievement| null>
    {
        return await this.Archievement.findOne(
            {
                where: 
                {
                    username:username,
                    archievement_name:archievement_name
                }
            });
    }
}

// if play 10 game // if play 50 game // if play 100 game 
// if win 10 game // if win 50 game  // if win 100 game 
// if lose 10 game // if lose 50 game // if lose 100 game 
// if exit match without complete it 3 times // if exit match without complete it 6 times // if exit match without complete it 9 times
// if gain 4 archievement // if gain 9 archievement  // if gain 14 archievement 