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
}
