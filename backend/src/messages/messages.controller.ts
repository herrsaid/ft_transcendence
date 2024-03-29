import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { MessageService } from 'src/message/message.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly MessageService: MessageService){}
    @UseGuards(AuthGuard)
    @Get()
    messages(@Query('id') id: number){
        if (isNaN(id))
            return []
        try{

            return this.MessageService.getMessages(id)
        }
        catch(error)
        {
            return [];
        }
    }
}
