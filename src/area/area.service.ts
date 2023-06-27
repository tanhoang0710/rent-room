import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateAreaDto } from './dao/create-area.dao';
import { UpdateAreaDto } from './dao/update-area.dao';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async getAll(options: IPaginationOptions): Promise<Pagination<Area>> {
    const areas = await paginate(this.areaRepository, options, {
      select: ['value', 'code', 'id', 'max', 'min'],
    });

    return areas;
  }

  async getAllNoPageable(): Promise<Area[]> {
    return await this.areaRepository.find();
  }

  async getOne(id: number): Promise<Area> {
    const area = await this.areaRepository.findOne({
      where: {
        id,
      },
      select: ['value', 'code', 'id', 'min', 'max'],
    });

    return area;
  }

  async createArea(createAreaDto: CreateAreaDto): Promise<Partial<Area>> {
    const area = await this.areaRepository.save(createAreaDto);
    return {
      id: area.id,
      code: area.code,
      value: area.value,
      min: area.min,
      max: area.max,
    };
  }

  async updateArea(id: number, updateAreaDto: UpdateAreaDto): Promise<Area> {
    const updateResult = await this.areaRepository.update(id, {
      code: updateAreaDto.code,
      value: updateAreaDto.value,
      min: updateAreaDto.min,
      max: updateAreaDto.max,
    });

    if (updateResult.affected === 1) return await this.getOne(id);

    throw new BadRequestException();
  }

  async deleteArea(id: number): Promise<UpdateResult> {
    return await this.areaRepository.softDelete(id);
  }

  async restoreArea(id: number): Promise<UpdateResult> {
    return await this.areaRepository.restore(id);
  }
}
