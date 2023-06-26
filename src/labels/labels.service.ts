import { Injectable } from '@nestjs/common';
import { CreateLableDto } from './dto/create-label.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async createLabel(createLableDto: CreateLableDto) {
    return await this.labelRepository.save(createLableDto);
  }
}
