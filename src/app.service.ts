import { Injectable } from '@nestjs/common';
import { PostsService } from './posts/posts.service';
@Injectable()
export class AppService {
  constructor(private readonly postsService: PostsService) {}
  getHello(): string {
    return 'Hello World!';
  }

  insert(): void {
    this.postsService.insertToDb();
  }
}
