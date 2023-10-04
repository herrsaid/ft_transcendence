import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'Database/entity/Message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(@InjectRepository(Messages) private messageRepo : Repository<Messages>){}
    async create(messageData: Partial<Messages>)
    {
        try
        {
            const message = this.messageRepo.create(messageData);
            return this.messageRepo.save(message);
        }
        catch
        {
            throw new NotFoundException();
        }
    }
    getMessages(id:number): Promise<Messages[]> {
        try
        {
            if (!id)
                return;
            return this.messageRepo.find({
                where:[{src: id, toGroup:false}, {dst: id, toGroup:false},],
            })
        }
        catch{
            throw new NotFoundException();
        }
    }
    async delete(id:number)
    {
        try{
            this.messageRepo.delete({id:id})
        }
        catch
        {
            throw new NotFoundException();
        }
    }
}