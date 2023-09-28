import { Injectable, NotFoundException, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Groups from 'Database/entity/Groups.entity';
import { Messages } from 'Database/entity/Message.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { Like } from "typeorm"
import { GroupusersService } from '../groupusers/groupusers.service';
import GroupUsers from 'Database/entity/GroupUsers.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class GroupsService {
    constructor(@InjectRepository(Groups) private Groups: Repository<Groups>,
    private readonly user:UserService,
    private readonly eventEmitter:EventEmitter2,
    @Inject(forwardRef(() => GroupusersService)) 
    private readonly Members:GroupusersService
    ){}
    async create_group(group_info: Groups, id:number)
    {
        try
        {
            const info = this.Groups.create(group_info);
            info.size = 1;
            const user = await this.user.findOne(id);
            const members = new GroupUsers;
            members.role = "owner";
            members.user = user;
            const m = await this.Members.create(members);
            info.members = [m];
            await this.Groups.save(info);
            // this.eventEmitter.emit('joinroom',{id:user.id});
        }
        catch
        {
            throw new NotFoundException();
        }
    }
    findOne(groupId:number)
    {
        try
        {
            return this.Groups.findOne({where:{id:groupId},relations: ["members"]})
        }
        catch(error){
            throw new NotFoundException(); 
        }
    }
    findOne_messages(groupId:number)
    {
        try
        {
            return this.Groups.findOne({where:{id:groupId},relations: ["messages"]})
        }
        catch(error){
            throw new NotFoundException(); 
        }
    }
    
    save(group:Groups)
    {
        this.Groups.save(group);
    }
    async search(value:string)
    {
        return this.Groups.find({where:[
            {name: Like(`%${value}%`), type: 'public'},
            {name: Like(`%${value}%`), type: 'protected'}
    ]})
    }
    async getPassword(group_id:number)
    {
        const group = await this.Groups.findOne({where:{id:group_id}})
        if (group.type == 'protected')
            return group.password;
    }
}
