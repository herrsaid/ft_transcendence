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
import { hashPassword } from 'src/hash/hash';
// import {hashPassword, compare} from './hash/hash'


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
            const info = await this.Groups.create(group_info);
            await this.Groups.save(info);
            info.size = 1;
            const user = await this.user.findOne(id);
            const members = new GroupUsers;
            members.role = "owner";
            members.user = user;
            const m = await this.Members.create(members);
            info.members = [m];
            await this.Groups.save(info);
            this.eventEmitter.emit('joinroom',{id:user.id});
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
    async delete(id:number)
    {
        try
        {
            console.log('delete', id );
            this.Groups.delete({id:id})
        }
        catch
        {
            throw new NotFoundException();
        }
    }
    async remove(id:number)
    {
        try
        {
            const group = await this.Groups.findOne({where:{id:id}})
            if (group.type == 'protected')
            {
                group.type = 'public';
                group.password = '';
                this.Groups.save(group);
            }
        }
        catch 
        {
            throw new UnauthorizedException;
        }
    }
    async change(id:number, password:string)
    {
        try
        {
            const group = await this.Groups.findOne({where:{id:id}})
            group.type = 'protected';
            group.password = await hashPassword(password);
            this.Groups.save(group);
        }
        catch
        {
            throw new NotFoundException();
        }
    }
}
