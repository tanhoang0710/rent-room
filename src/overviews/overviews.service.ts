import { CreateOverviewDto } from './dto/create-overview.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';
import { Repository } from 'typeorm';
import { UpdateOverviewDto } from './dto/update-overview.dto';

@Injectable()
export class OverviewsService {
  constructor(
    @InjectRepository(Overview)
    private readonly overviewRepository: Repository<Overview>,
  ) {}

  async createOverview(createOverviewDto: CreateOverviewDto) {
    return await this.overviewRepository.save(createOverviewDto);
  }

  async updateOverview(
    id: number,
    updateOverviewDto: UpdateOverviewDto,
  ): Promise<boolean> {
    const res = await this.overviewRepository.update(id, updateOverviewDto);
    if (res.affected === 1) return true;
    return false;
  }
}
