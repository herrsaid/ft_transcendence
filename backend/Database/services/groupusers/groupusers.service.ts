import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import GroupUsers from 'Database/entity/GroupUsers.entity';
import { GroupsService } from 'Database/services/groups/groups.service';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class GroupusersService {
    constructor(
        @InjectRepository(GroupUsers) private GroupUsers,private readonly Messages:MessageService,
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
            const mygorup = groupusers.filter((data) => {return (data.user.id == id)}).map((data)=>{
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
        try
        {
            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
            const group = await this.Group.findOne(group_id);
            const spes = groupusers.find(data => (data.group.id == group_id && data.user.id == user_id));
            // check to leaver is owner if set another owner
            if (group.members.length == 1)
            {
                try{
    
                    const messages = await this.Group.findOne_messages(group.id)
                    await this.GroupUsers.delete({id:spes.id});
                    await messages.messages.forEach( async element => {
                        await this.Messages.delete(element.id);
                    });
                    this.Group.delete(group.id)
                }
                catch{
                    throw new  NotFoundException();
                }
            }
            else if (spes.role == "owner" && group.members.length > 1)
            {
                var newowner = groupusers.find(data => (data.role == "admin" && data.group.id == group_id))
                if(!newowner)
                    newowner = groupusers.find(data => (data.role == "user" && data.group.id == group_id))
                if(newowner)
                    newowner.role = "owner"
                group.size = group.size - 1;
                this.GroupUsers.save(newowner);
                this.Group.save(group);
                await this.GroupUsers.delete({id:spes.id});
                // this.Group.delete()
            }
            else
            {
                try{
                    await this.GroupUsers.delete({id:spes.id});
                    group.size = group.size - 1;
                    this.GroupUsers.save(group);
                }
                catch
                {
                    throw new NotFoundException();
                }
            }
        }
        catch
        {
            throw new UnauthorizedException();
        }
        // this.GroupUsers.delete({id:spes.id});
        // this.GroupsService.save(group);
    }
    async is_admin(user_id:number, group_id:number)
    {
        try
        {
            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
            const spes = groupusers.find(data => (data.group.id == group_id && data.user.id == user_id));
            return (spes.role);
        }
        catch
        {
            throw new UnauthorizedException();
        }
    }
    async mute(group_id:number,to_mute:number, time:number)
    {
        try{
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
        catch
        {
            throw new UnauthorizedException();
        }
    }

    async unmute(group_id:number,to_mute:number)
    {
        try{
            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]});
            const spes = groupusers.find((data)=> data.group.id == group_id && data.user.id == to_mute);
            spes.status = "able";
            this.GroupUsers.save(spes);
        }
        catch
        {
            throw new UnauthorizedException();
        }
    }
    async ban(group_id:number, to_ban:number)
    {
        try
        {
            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]});
            const spes = groupusers.find((data)=> data.group.id == group_id && data.user.id == to_ban);
            if(spes.status == "able")
            {
                spes.status = "baned"
            }
            else if (spes.status == "baned")
            {
                spes.status = "able"
            }
            console.log('after',spes.status)
            this.GroupUsers.save(spes);
        }
        catch
        {
            throw new UnauthorizedException();
        }
    }


    async new(group_id:number, newadmin:number)
    {
        try
        {
            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]});
            const spes = groupusers.find((data)=> data.group.id == group_id && data.user.id == newadmin);
            spes.role = "admin"
            this.GroupUsers.save(spes);
        }
        catch
        {
            throw new UnauthorizedException();
        }
    }

    async isAbleToSend(user_id:number,group_id:number)
    {
        try
        {
            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
            const spes = groupusers.find((data) => (data.group.id == group_id && data.user.id == user_id));
            if (spes.status == 'able')
            {
                return (true);
            }
            return false;
        }
        catch
        {
            throw new UnauthorizedException();
        }
    }
    async isUserInGroup(user_id:number, group_id:number)
    {
        try{
            const groupusers = await this.GroupUsers.find({relations: ["group", "user"]})
            const spes = groupusers.find((data) => (data.group.id == group_id && data.user.id == user_id));
            if (spes)
                return true
            return false;
        }
        catch
        {
            throw new UnauthorizedException();
        }
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