import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admins } from 'Database/entity/Admins.entity';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class AdminsService {
    constructor(@InjectRepository(Admins) private Admins){}
    async save(admins:Admins)
    {
        this.Admins.save(admins);
    }
    async findOne(id:number)
    {
        try
        {
            return this.Admins.findOne({where:{id:id}, relations:["admins"]})
        }
        catch(error)
        {
            throw NotFoundException;
        }
    }
    async add(user:User, admins_id:number)
    {
        try
        {
            const admins = await this.findOne(admins_id);
            admins.admins.push(user);
            this.Admins.save(admins)
        }
        catch(error)
        {
            throw NotFoundException;
        }
    }
}
