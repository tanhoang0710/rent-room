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
import { AreaService } from './area.service';
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
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dao/create-area.dao';
import { UpdateAreaDto } from './dao/update-area.dao';
import { UpdateResult } from 'typeorm';

@Controller('areas')
@ApiTags('areas')
@ApiBearerAuth('access-token')
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
@Roles(ROLES.ADMIN)
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

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
  ): Promise<Pagination<Area>> {
    limit = limit > 100 ? 100 : limit;
    return await this.areaService.getAll({
      limit,
      page,
      route: 'http://localhost:3000/api-docs/areas',
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async getOneArea(@Param('id', ParseIntPipe) id: number) {
    return await this.areaService.getOne(id);
  }

  @Post()
  async createArea(
    @Body() createAreaDto: CreateAreaDto,
  ): Promise<Partial<Area>> {
    return await this.areaService.createArea(createAreaDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async updateArea(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ): Promise<UpdateResult> {
    return await this.areaService.updateArea(id, updateAreaDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiOperation({
    summary: 'Soft Delete Area',
  })
  async deleteArea(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    return await this.areaService.deleteArea(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiOperation({
    summary: 'Restore Area',
  })
  async restoreArea(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    return await this.areaService.restoreArea(id);
  }
}
