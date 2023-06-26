import { CreateOverviewDto } from './dto/create-overview.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OverviewsService {
  constructor(
    @InjectRepository(Overview)
    private readonly overviewRepository: Repository<Overview>,
  ) {}

  async createOverview(createOverviewDto: CreateOverviewDto) {
    return await this.overviewRepository.save(createOverviewDto);
  }
}
