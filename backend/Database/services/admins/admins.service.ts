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
            return this.Admins.findOne({where:{id:id}, relations:["users"]})
        }
        catch(error)
        {
            throw NotFoundException;
        }
    }
    async add(user:User, admins:Admins)
    {
        try
        {
            admins.admins.push(user);
        }
        catch(error)
        {
            throw NotFoundException;
        }
    }
}
