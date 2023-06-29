import { Injectable } from '@nestjs/common';
import { CreateLableDto } from './dto/create-label.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { Repository } from 'typeorm';
import { UpdateLableDto } from './dto/update-label-dto';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async createLabel(createLableDto: CreateLableDto) {
    return await this.labelRepository.save(createLableDto);
  }

  async updateLabel(
    id: number,
    updateLableDto: UpdateLableDto,
  ): Promise<boolean> {
    const res = await this.labelRepository.update(id, updateLableDto);
    if (res.affected === 1) return true;
    return false;
  }
}
