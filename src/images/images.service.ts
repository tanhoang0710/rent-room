import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async createImage(createImageDto: CreateImageDto) {
    return await this.imageRepository.save(createImageDto);
  }
}
