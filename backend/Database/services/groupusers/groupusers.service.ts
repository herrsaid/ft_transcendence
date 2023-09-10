import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import GroupUsers from 'Database/entity/GroupUsers.entity';
import { group } from 'console';

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
            const groupusers = await this.GroupUsers.findOne({where:{id:id}, relations: ["group", "user"]})
            return groupusers;
        }
        catch(error)
        {
            throw NotFoundException;
        }
    }
    async findGroup(id:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const mygorup = groupusers.map((data)=>{
            if (data.user.id == id)
                return (data.group)
        })
        return (mygorup);
    }
    async findMembers(id:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const members = groupusers.filter(data => data.group.id == id).map((data) => {
                return data;
        })
        return members;
    }
}