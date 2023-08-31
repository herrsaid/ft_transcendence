import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'Database/entity/Message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(@InjectRepository(Messages) private messageRepo : Repository<Messages>){}
    async create(messageData: Partial<Messages>)
    {
        const message = this.messageRepo.create(messageData);
        return this.messageRepo.save(message);
    }
    getMessages(id:number): Promise<Messages[]> {
        if (!id)
            return;
        return this.messageRepo.find({
            where:[{src: id, toGroup:false}, {dst: id, toGroup:false},],
        })
    }
}