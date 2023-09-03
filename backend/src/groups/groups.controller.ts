import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import Groups from 'Database/entity/Groups.entity';
import { groupDto } from './groupsDto';
import { GroupsService } from 'Database/services/groups/groups.service';
import { UserService } from 'src/user/services/user.service';
import { group } from 'console';
import { Admins } from 'Database/entity/Admins.entity';
import { AdminsService } from 'Database/services/admins/admins.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { AdminGuard } from './admin/admin.guard';

@Controller('groups')
export class GroupsController {
    constructor(private readonly GroupService:GroupsService, private readonly User:UserService, private readonly Admins:AdminsService){}
    @Post('create')
    async create(@Body() Group){
        const group = await this.GroupService.create_group(Group);
        this.add({GroupId:group.id,UserId:Group.user})
        return 'created'
    }
    @UseGuards(AuthGuard)
    @Post('add')
    async add(@Body() Group)
    {
        const user = await this.User.findOne(Group.UserId);
        const group = await this.GroupService.findOne(Group.GroupId)
        group.users.push(user);
        this.GroupService.save(group)
        return 'added'
    }
    @UseGuards(AuthGuard)
    @Get('mygroups')
    async mygroups(@Query() param:any)
    {
        const groups = await this.User.getGroups(param.id);
        return groups;
    }
    @UseGuards(AuthGuard)
    @Get('messages')
    async group_messages(@Query() params)
    {
        const group = await this.GroupService.findOne_messages(params.id);
        return (group.messages);
    }
    @UseGuards(AuthGuard)
    @Get('search')
    async search(@Query() Param)
    {
        if (!Param.value)
            return [];
        const res = await this.GroupService.search(Param.value)
        console.log(res, Param.value);
        return res;
    }
    @UseGuards(AuthGuard)
    @Get('join')
    async join(@Query() param)
    {
        try{

            this.add({GroupId:param.id, UserId:param.user});
            return 'created'
        }
        catch(error)
        {
            return 'not joind'
        }
    }
    @UseGuards(AuthGuard)
    @Get('members')
    async members(@Query() param)
    {
        try{
            const group = await this.GroupService.findOne(param.id);
            return group.users;
        }
        catch(error)
        {
            console.log(error);
        }
    }
    @UseGuards(AuthGuard)
    @Get('adminadd')
    async adminadd(@Query() params)
    {
        try
        {
            this.GroupService.new_admin(params.id, params.user)
            return 'created'
        }
        catch(error)
        {
            console.log('cant add to admins')
        }
    }
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    @Get('remove')
    async remove(@Query() params)
    {
        const group = await this.GroupService.findOne(params.id);
        group.users.splice(group.users.findIndex((data) => {return data.id == params.toremove}, 1));
        this.GroupService.save(group);
    }
}
