import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GroupsService } from 'Database/services/groups/groups.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private Group:GroupsService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return false;
  }
}
