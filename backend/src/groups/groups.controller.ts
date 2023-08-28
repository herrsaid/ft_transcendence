import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import Groups from 'Database/entity/Groups.entity';
import { groupDto } from './groupsDto';
import { GroupsService } from 'Database/services/groups/groups.service';
import { UserService } from 'src/user/services/user.service';
import { group } from 'console';

@Controller('groups')
export class GroupsController {
    constructor(private readonly GroupService:GroupsService, private readonly User:UserService){}
    @Post('create')
    create(@Body() Group){
        this.GroupService.create_group(Group);
        return 'created'
    }
    @Post('add')
    async add(@Body() Group)
    {
        const user = await this.User.findOne(Group.UserId);
        const group = await this.GroupService.findOne(Group.GroupId)
        group.users.push(user);
        this.GroupService.save(group)
        return 'added'
    }
    @Get('mygroups')
    async mygroups(@Query() param:any)
    {
        const groups = await this.User.getGroups(param.id);
        return groups;
    }
    @Get('messages')
    async group_messages(@Query() params)
    {
        const group = await this.GroupService.findOne_messages(params.id);
        return (group.messages);
    }
}
