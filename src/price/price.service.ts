import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}
  async getAll(options: IPaginationOptions): Promise<Pagination<Price>> {
    const prices = await paginate(this.priceRepository, options, {
      select: ['value', 'code', 'id', 'max', 'min'],
    });

    return prices;
  }

  async getAllNoPageable(): Promise<Price[]> {
    return await this.priceRepository.find();
  }

  async getOne(id: number): Promise<Price> {
    const price = await this.priceRepository.findOne({
      where: {
        id,
      },
      select: ['value', 'code', 'id', 'max', 'min'],
    });

    return price;
  }

  async createPrice(createPriceDto: CreatePriceDto): Promise<Partial<Price>> {
    const price = await this.priceRepository.save(createPriceDto);
    return {
      id: price.id,
      code: price.code,
      value: price.value,
      min: price.min,
      max: price.max,
    };
  }

  async updatePrice(
    id: number,
    updatePriceDto: UpdatePriceDto,
  ): Promise<Price> {
    const updateResult = await this.priceRepository.update(id, {
      code: updatePriceDto.code,
      value: updatePriceDto.value,
      min: updatePriceDto.min,
      max: updatePriceDto.max,
    });

    if (updateResult.affected === 1) return await this.getOne(id);

    throw new BadRequestException();
  }

  async deletePrice(id: number): Promise<UpdateResult> {
    return await this.priceRepository.softDelete(id);
  }

  async restorePrice(id: number): Promise<UpdateResult> {
    return await this.priceRepository.restore(id);
  }
}
