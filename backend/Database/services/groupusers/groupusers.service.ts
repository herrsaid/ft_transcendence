import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import GroupUsers from 'Database/entity/GroupUsers.entity';
import { GroupsService } from 'Database/services/groups/groups.service';

@Injectable()
export class GroupusersService {
    constructor(
        @InjectRepository(GroupUsers) private GroupUsers,
        private eventEmitter:EventEmitter2,
        @Inject(forwardRef(() => GroupsService)) 
        private Group: GroupsService
        ){}
    async create(groupuser:GroupUsers)
    {
        try
        {
            const groupuser_info = this.GroupUsers.create(groupuser);
            return this.GroupUsers.save(groupuser_info);
        }
        catch
        {
            throw new NotFoundException();
        }
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
        try 
        {
            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
            const mygorup = groupusers.filter((data) => {return (data.user.id == id && data.status != "baned")}).map((data)=>{
                    data.group.role = data.role;
                    return (data.group)
            })
            return (mygorup);
        }
        catch
        {
            throw new NotFoundException();
        }
    }
    async findMembers(id:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const members = groupusers.filter(data => data.group.id == id).map((data) => {
                return data;
        })
        return members;
    }
    async remove(user_id:number, group_id:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const group = await this.Group.findOne(group_id);
        const spes = groupusers.find(data => (data.group.id == group_id && data.user.id == user_id));
        // check to leaver is owner if set another owner
        if (spes.role == "owner" && group.members.length > 1)
        {
            var newowner = groupusers.find(data => (data.role == "admin" && data.group.id == group_id))
            if(!newowner)
                newowner = groupusers.find(data => (data.role == "user" && data.group.id == group_id))
            if(newowner)
                newowner.role = "owner"
            this.GroupUsers.delete({id:spes.id});
        }
        else
        {
            this.GroupUsers.delete({id:spes.id});
        }
        // this.GroupUsers.delete({id:spes.id});
        group.size = group.size - 1;
        // this.GroupsService.save(group);
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
        this.eventEmitter.emit('status', {id:group_id, action:"mute", user:to_mute})
        setTimeout(() => {
            spes.status = "able"
            this.GroupUsers.save(spes);
            this.eventEmitter.emit('status', {id:group_id, action:"unmute", user:to_mute})
        }, (time*60*1000));
    }

    async ban(group_id:number, to_ban:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]});
        const spes = groupusers.find((data)=> data.group.id == group_id && data.user.id == to_ban);
        spes.status = "baned"
        this.GroupUsers.save(spes);
    }


    async new(group_id:number, newadmin:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]});
        const spes = groupusers.find((data)=> data.group.id == group_id && data.user.id == newadmin);
        spes.role = "admin"
        this.GroupUsers.save(spes);
    }

    async isAbleToSend(user_id:number,group_id:number)
    {
        const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
        const spes = groupusers.find((data) => (data.group.id == group_id && data.user.id == user_id));
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
    async status(user_id:number, group_id:number)
    {
        try{

            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
            const spes = groupusers.find((data) => (data.group.id == group_id && data.user.id == user_id));
            return {status:spes.status};
        }
        catch
        {
            throw new NotFoundException();
        }
    }
}