import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AdminsService } from 'Database/services/admins/admins.service';
import { GroupsService } from 'Database/services/groups/groups.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private Group:GroupsService, private Admins:AdminsService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.Group.admin_check(request.query.id, request.query.user);
  }
}
