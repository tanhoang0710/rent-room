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
import { ICondition } from './interface/condition.interface';
import { ParseOptionPipe } from './pipes/parseOption.pipe';

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
  @ApiQuery({
    name: 'priceCode',
    required: false,
    example: '7X6M',
  })
  @ApiQuery({
    name: 'areaCode',
    required: false,
    example: '9IHT',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'condition',
    required: false,
    example: '{"price": {"min": 1, "max": 200}}',
  })
  async getAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('priceCode') priceCode: string | undefined,
    @Query('areaCode') areaCode: string | undefined,
    @Query('categoryId', ParseIntPipe) categoryId: number | undefined,
    @Query('condition', ParseOptionPipe) condition: ICondition,
  ): Promise<Pagination<PostEntity>> {
    limit = limit > 100 ? 100 : limit;
    return await this.postsService.getAllPost(
      {
        limit,
        page,
        route: 'http://localhost:3000/api-docs/posts',
      },
      { priceCode, areaCode, categoryId, condition },
    );
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
