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
import { PriceService } from './price.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Price } from './entities/price.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateResult } from 'typeorm';

@Controller('prices')
@ApiTags('prices')
@ApiBearerAuth('access-token')
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
@Roles(ROLES.ADMIN)
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

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
  ): Promise<Pagination<Price>> {
    limit = limit > 100 ? 100 : limit;
    return await this.priceService.getAll({
      limit,
      page,
      route: 'http://localhost:3000/api-docs/prices',
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async getOnePrice(@Param('id', ParseIntPipe) id: number) {
    return await this.priceService.getOne(id);
  }

  @Post()
  async createPrice(
    @Body() createPriceDto: CreatePriceDto,
  ): Promise<Partial<Price>> {
    return await this.priceService.createPrice(createPriceDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  async updatePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriceDto: UpdatePriceDto,
  ): Promise<Price> {
    return await this.priceService.updatePrice(id, updatePriceDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiOperation({
    summary: 'Soft Delete Price',
  })
  async deletePrice(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    return await this.priceService.deletePrice(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiOperation({
    summary: 'Restore Price',
  })
  async restorePrice(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    return await this.priceService.restorePrice(id);
  }
}
