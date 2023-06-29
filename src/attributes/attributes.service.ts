import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './entities/attribute.entity';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  async createAttribute(createAttributeDto: CreateAttributeDto) {
    return await this.attributeRepository.save(createAttributeDto);
  }

  async updateAttribute(
    id: number,
    updateAttributeDto: UpdateAttributeDto,
  ): Promise<boolean> {
    const res = await this.attributeRepository.update(id, updateAttributeDto);
    if (res.affected === 1) return true;
    return false;
  }
}
