import { Injectable } from "@nestjs/common";
import { History } from '../PingPong.Entity'
import { config } from 'ormconfig'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class HistoryManager
{

    constructor(@InjectRepository(History) private usersRepository: Repository<History>,){}
    
    newtest()
    {
        let hstry = new History;
    }
}