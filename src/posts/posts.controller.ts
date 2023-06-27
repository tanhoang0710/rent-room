import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dao/create-post.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ICondition } from './interface/condition.interface';
import { ParseOptionPipe } from './pipes/parseOption.pipe';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserHasPostOrAdminGuard } from 'src/common/guards/userHasPostOrAdmin.guard';

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
    return await this.postsService.getOnePost(id, false);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @GetCurrentUserId() userId: number,
  ) {
    return await this.postsService.createPost(createPostDto, userId);
  }

  // Danh cho ADMIN va NORMAL, neu la normal can check them co phai post cua normal day ko
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Soft Delete Post',
  })
  @UseGuards(RolesGuard, UserHasPostOrAdminGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Roles(ROLES.ADMIN, ROLES.NORMAL)
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    const result = await this.postsService.deletePost(id);

    if (result) return true;
    throw new BadRequestException();
  }

  @Post(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Restore Post',
  })
  @UseGuards(RolesGuard, UserHasPostOrAdminGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Roles(ROLES.ADMIN, ROLES.NORMAL)
  async restorePrice(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const result = await this.postsService.restorePost(id);

    if (result) return true;
    throw new BadRequestException();
  }
}
