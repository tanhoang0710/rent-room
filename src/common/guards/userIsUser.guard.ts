import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as any;

    const userInDB = await this.usersService.findOne({
      id: user.sub,
    });

    return (
      userInDB &&
      (userInDB.email === request.params.email ||
        userInDB.id === +request.params.id)
    );
  }
}
