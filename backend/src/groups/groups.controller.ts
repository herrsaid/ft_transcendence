import { Body, Controller, Post } from '@nestjs/common';
import Groups from 'Database/entity/Groups.entity';
import { groupDto } from './groupsDto';
import { GroupsService } from 'Database/services/groups/groups.service';

@Controller('groups')
export class GroupsController {
    // constructor(private readonly GroupService:GroupsService){}
    @Post('create')
    create(@Body() Group){
        // this.GroupService.create_group({name:'said'});
        return 'created'
    }
}
