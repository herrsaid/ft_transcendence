import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import Groups from 'Database/entity/Groups.entity';
import { groupDto } from './groupsDto';
import { GroupsService } from 'Database/services/groups/groups.service';
import { UserService } from 'src/user/services/user.service';
import { group } from 'console';

@Controller('groups')
export class GroupsController {
    constructor(private readonly GroupService:GroupsService, private readonly User:UserService){}
    @Post('create')
    async create(@Body() Group){
        const group = await this.GroupService.create_group(Group);
        this.add({GroupId:group.id,UserId:Group.user})
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
    @Get('search')
    async search(@Query() Param)
    {
        if (!Param.value)
            return [];
        const res = await this.GroupService.search(Param.value)
        console.log(res, Param.value);
        return res;
    }
    @Get('join')
    async join(@Query() param)
    {
        try{

            this.add({GroupId:param.id, UserId:param.user});
            return 'joinde'
        }
        catch(error)
        {
            return 'not joind'
        }
    }
}
