import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import GroupUsers from 'Database/entity/GroupUsers.entity';

@Injectable()
export class GroupusersService {
    constructor(@InjectRepository(GroupUsers) private GroupUsers){}
    async create(groupuser:GroupUsers)
    {
        const groupuser_info = this.GroupUsers.create(groupuser);
        return this.GroupUsers.save(groupuser_info);
    }
    async findeOne(id:number)
    {
        try
        {
            const groupusers = await this.GroupUsers.findOne({where:{id:id}})
            console.log(groupusers)
            return groupusers;
        }
        catch(error)
        {
            throw NotFoundException;
        }
    }
    async findGroup(id:number)
    {

    }
}
