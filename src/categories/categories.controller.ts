import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { ROLES } from 'src/common/enum/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateResult } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dao/create-category.dao';
import { UpdateCategoryDto } from './dao/update-category.dao';

@Controller('categories')
@ApiTags('categories')
@ApiBearerAuth('access-token')
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
@Roles(ROLES.ADMIN)
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

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
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Category>> {
    limit = limit > 100 ? 100 : limit;
    return await this.categoryService.getAll({
      limit,
      page,
      route: 'http://localhost:3000/api-docs/categories',
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async getOneCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.getOne(id);
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Partial<Category>> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategory: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryService.updateCategory(id, updateCategory);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiOperation({
    summary: 'Soft Delete Category',
  })
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    return await this.categoryService.deleteCategory(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiOperation({
    summary: 'Restore Category',
  })
  async restoreCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    return await this.categoryService.restoreCategory(id);
  }
}
