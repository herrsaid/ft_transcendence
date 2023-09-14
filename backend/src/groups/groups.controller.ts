import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import Groups from 'Database/entity/Groups.entity';
import { GroupsService } from 'Database/services/groups/groups.service';
import { UserService } from 'src/user/services/user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GroupusersService } from 'Database/services/groupusers/groupusers.service';
import GroupUsers from 'Database/entity/GroupUsers.entity';

@Controller('groups')
export class GroupsController {
    constructor(private readonly GroupService:GroupsService, private readonly User:UserService,
        private readonly GroupUsersService:GroupusersService,
        private readonly groupusers:GroupusersService){}
        @UseGuards(AuthGuard)
        @Post('create')
        async create(@Req() request, @Body() Group)
        {
            console.log(Group)
            const user_id = request['user'];
            const group  = this.GroupService.create_group(Group, user_id.id);
        }
        @UseGuards(AuthGuard)
        @Get('join')
        async join(@Req() request,@Query() params)
        {
            const user_id = request['user'].id;
            try
            {
                if (await this.GroupUsersService.isUserInGroup(user_id, params.id) == false)
                {
                    const group = await this.GroupService.findOne(params.id);
                    const user = await this.User.findOne(user_id);
                    const member = new GroupUsers();
                    member.user = user;
                    member.group = group;
                    const m = await this.GroupUsersService.create(member);
                    group.members.push(m);
                    return 'created'
                }
            }
            catch(error)
            {
                console.log('error')
            }
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
        @Get('mygroups')
        async myGroups(@Req() request, @Query() params)
        {
            const user_id = request['user'].id;
            const usergroup = await this.groupusers.findGroup(user_id);
            return(usergroup)
        }
        @UseGuards(AuthGuard)
        @Get('messages')
        async group_messages(@Query() params)
        {
            const group = await this.GroupService.findOne_messages(params.id);
            return (group.messages);
        }
        @UseGuards(AuthGuard)
        @Get('members')
        async members(@Query() param)
        {
            try{
                const members = await this.groupusers.findMembers(param.id);
                return members;
            }
            catch(error)
            {
                console.log(error);
            }
        }
        @UseGuards(AuthGuard)
        @Get('leave')
        async leave(@Req() request, @Query() params)
        {
            const user_id = request['user'].id;
            this.GroupUsersService.remove(user_id, params.id)
        }
        @UseGuards(AuthGuard)
        @Get('ban')
        async ban(@Req() request, @Query() parmas)
        {
            const user_id = request['user'].id;
            if((await this.GroupUsersService.is_admin(user_id, parmas.id)) != "user"
                && (await this.GroupUsersService.is_admin(parmas.toremove, parmas.id)) != "owner")
            {
                this.GroupUsersService.remove(parmas.toremove, parmas.id)
                return 'deleted'
            }
            else 
                return 'not deleted';
        }
        @UseGuards(AuthGuard)
        @Get('mute')
        async mute(@Req() request, @Query() parmas)
        {
            const user_id = request['user'].id;
            if((await this.GroupUsersService.is_admin(user_id, parmas.id)) != "user"
                && (await this.GroupUsersService.is_admin(parmas.tomute, parmas.id)) != "owner")
            {
                this.GroupUsersService.mute(parmas.id, parmas.tomute)
                return 'muted'
            }
            else 
                return 'not muted';
        }
    // @Post('create')
    // async create(@Body() Group){
    //     const group = await this.GroupService.create_group(Group);
    //     this.add({GroupId:group.id,UserId:Group.user})
    //     return 'created'
    // }
    // @UseGuards(AuthGuard)
    // @Post('add')
    // async add(@Body() Group)
    // {
    //     const user = await this.User.findOne(Group.UserId);
    //     const group = await this.GroupService.findOne(Group.GroupId)
    //     group.users.push(user);
    //     group.members += 1;
    //     this.GroupService.save(group)
    //     return 'added'
    // }
    // @UseGuards(AuthGuard)
    // @Get('mygroups')
    // async mygroups(@Req() request, @Query() param:any)
    // {
    //     const groups = await this.User.getGroups(param.id);
    //     return groups;
    // }
    // @UseGuards(AuthGuard)
    // @Get('messages')
    // async group_messages(@Query() params)
    // {
    //     const group = await this.GroupService.findOne_messages(params.id);
    //     return (group.messages);
    // }
    // @UseGuards(AuthGuard)
    // @Get('search')
    // async search(@Query() Param)
    // {
    //     if (!Param.value)
    //         return [];
    //     const res = await this.GroupService.search(Param.value)
    //     console.log(res, Param.value);
    //     return res;
    // }
    // @UseGuards(AuthGuard)
    // @Get('join')
    // async join(@Query() param)
    // {
    //     try{

    //         this.add({GroupId:param.id, UserId:param.user});
    //         return 'created'
    //     }
    //     catch(error)
    //     {
    //         return 'not joind'
    //     }
    // }
    // @UseGuards(AuthGuard)
    // @Get('members')
    // async members(@Query() param)
    // {
    //     try{
    //         const group = await this.GroupService.findOne(param.id);
    //         return group.users;
    //     }
    //     catch(error)
    //     {
    //         console.log(error);
    //     }
    // }
    // @UseGuards(AuthGuard)
    // @UseGuards(AdminGuard)
    // @Get('remove')
    // async remove(@Req() request, @Query() params)
    // {
    //     const group = await this.GroupService.findOne(params.id);
    //     group.members -= 1;
    //     group.users.splice(group.users.findIndex((data) => {return data.id == params.toremove}, 1));
    //     this.GroupService.save(group);
    // }
    // @UseGuards(AuthGuard)
    // @Get('leave')
    // async leave(@Req() request, @Query() params)
    // {
    //     const user = request['user'].id;
    //     const group = await this.GroupService.findOne(params.id);
    //     group. -= 1;
    //     const users = group.users;
    //     users.splice(users.findIndex((data) => {return data.id == user}, 1));
    //     group.users = users;
    //     this.GroupService.save(group);
    //     return 'created'
    // }
}
