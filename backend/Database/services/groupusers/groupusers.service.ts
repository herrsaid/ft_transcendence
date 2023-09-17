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
        const mygorup = groupusers.filter((data) => {return (data.user.id == id && data.status != "baned")}).map((data)=>{
                data.group.role = data.role;
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
    async remove(user_id, group_id)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const spes = groupusers.find(data => (data.group.id == group_id && data.user.id == user_id));
        this.GroupUsers.delete({id:spes.id});
    }
    async is_admin(user_id:number, group_id:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const spes = groupusers.find(data => (data.group.id == group_id && data.user.id == user_id));
        return (spes.role);
    }
    async mute(group_id:number,to_mute:number, time:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]});
        const spes = groupusers.find((data)=> data.group.id == group_id && data.user.id == to_mute);
        spes.status = "muted";
        this.GroupUsers.save(spes);
        setTimeout(() => {
            spes.status = "able"
            this.GroupUsers.save(spes);
        }, (time*60*1000));
    }

    async ban(group_id:number, to_ban:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]});
        const spes = groupusers.find((data)=> data.group.id == group_id && data.user.id == to_ban);
        spes.status = "baned"
        this.GroupUsers.save(spes);
    }

    async isAbleToSend(user_id:number,group_id:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const spes = groupusers.find((data) => (data.group.id == group_id && data.user.id == user_id));
        console.log(spes);
        if (spes.status == 'able')
        {
            return (true);
        }
        return false;
    }
    async isUserInGroup(user_id:number, group_id:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const spes = groupusers.find((data) => (data.group.id == group_id && data.user.id == user_id));
        if (spes)
            return true
        return false;
    }
}