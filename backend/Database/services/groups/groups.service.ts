import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Groups from 'Database/entity/Groups.entity';
import { Messages } from 'Database/entity/Message.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { Like } from "typeorm"
import { AdminsService } from '../admins/admins.service';
import { group } from 'console';
import { Admins } from 'Database/entity/Admins.entity';

@Injectable()
export class GroupsService {
    constructor(@InjectRepository(Groups) private Groups: Repository<Groups>, private readonly user:UserService, private readonly Admins:AdminsService){}
    async create_group(group_info: Partial<Groups>)
    {
        const info = this.Groups.create(group_info);
        const adm = new Admins()
        this.Admins.save(adm);
        info.admins = adm;
        return this.Groups.save(info);
    }
    findOne(groupId:number)
    {
        try
        {
            return this.Groups.findOne({where:{id:groupId},relations: ["users","admins"]})
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
        return this.Groups.findBy({
             name: Like(`%${value}%`)
        })
    }
    async new_admin(group_id:number, user_id:number)
    {
        try
        {
            const group = await this.Groups.findOne({where:{id:group_id}, relations:['admins']});
            const user = await this.user.findOne(user_id);
            console.log(group.admins.id)
            this.Admins.add(user, group.admins.id)
        }
        catch(error)
        {
            console.log('NotFoundException') 
        }
    }
    async admin_check(group_id:number, user_id:number)
    {
        const group = await this.findOne(group_id);
        const admins = await this.Admins.findOne(group.admins.id)
        if (admins.admins.find((data) => {return (data.id == user_id)}))
            return true;
        else
            return false;
    }
}
