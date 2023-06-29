import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async getOneImage(id: number): Promise<Image> {
    return await this.imageRepository.findOneBy({
      id,
    });
  }

  async createImage(createImageDto: CreateImageDto) {
    return await this.imageRepository.save(createImageDto);
  }

  async updateImage(
    id: number,
    updateImageDto: UpdateImageDto,
  ): Promise<boolean> {
    const res = await this.imageRepository.update(id, updateImageDto);
    if (res.affected === 1) return true;
    return false;
  }
}
