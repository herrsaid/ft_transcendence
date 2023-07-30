import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'Database/entity/Message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(Messages) private messageRepository : Repository<Messages>){}
    async create(messageData: Partial<Messages>)
    {
        const message = this.messageRepository.create(messageData);
        return this.messageRepository.save(message);
    }
}
