import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dao/create-post.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  async getAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<PostEntity>> {
    limit = limit > 100 ? 100 : limit;
    return await this.postsService.getAllPost({
      limit,
      page,
      route: 'http://localhost:3000/api-docs/posts',
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async getOnePost(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getOnePost(id);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return createPostDto;
  }
}
