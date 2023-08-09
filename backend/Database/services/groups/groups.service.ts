import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Groups from 'Database/entity/Groups.entity';
import { Messages } from 'Database/entity/Message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
    constructor(@InjectRepository(Groups) private Groups: Repository<Groups>){}
    async create_group(group_info: Partial<Groups>)
    {
        const info = this.Groups.create(group_info);
        return this.Groups.save(info);
    }
    async new_message(message:Messages, group_id:number)
    {
        const group = this.Groups.findOne({where:{id:8}});
        const msg = new Messages();
        msg.dst = 2;
        msg.src = 4;
        msg.content = 'test Message';
        group.then(data => {msg.Group = data});
        group.then(data => console.log("kin wla makinch", data.messages));
        console.log(group);
        // group.then(data => data.Messages = message);
    }
}
