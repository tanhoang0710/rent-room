import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { ROLES } from '../enum/roles.enum';

@Injectable()
export class UserHasPostOrAdminGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as any;

    const userInDB = await this.usersService.findOne({
      id: user.sub,
    });
    console.log(
      '🚀 ~ file: userHasPost.guard.ts:21 ~ UserHasPostGuard ~ canActivate ~ userInDB:',
      userInDB,
    );

    const post = await this.postsService.getOnePost(+request.params.id, true);
    console.log(
      '🚀 ~ file: userHasPost.guard.ts:24 ~ UserHasPostGuard ~ canActivate ~ post:',
      post,
    );

    if (userInDB.role === ROLES.ADMIN) return true;

    if (!post) throw new BadRequestException();

    return userInDB && post && userInDB.id === post.user.id;
  }
}
