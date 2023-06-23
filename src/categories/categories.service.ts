import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dao/create-category.dao';
import { UpdateCategoryDto } from './dao/update-category.dao';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll(options: IPaginationOptions): Promise<Pagination<Category>> {
    const categories = await paginate(this.categoryRepository, options, {
      select: ['value', 'code', 'id'],
    });

    return categories;
  }

  async getOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
      select: ['value', 'code', 'id'],
    });

    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Partial<Category>> {
    const Category = await this.categoryRepository.save(createCategoryDto);
    return {
      id: Category.id,
      code: Category.code,
      value: Category.value,
    };
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    const updateResult = await this.categoryRepository.update(id, {
      code: updateCategoryDto.code,
      value: updateCategoryDto.value,
    });

    return updateResult;
  }

  async deleteCategory(id: number): Promise<UpdateResult> {
    return await this.categoryRepository.softDelete(id);
  }

  async restoreCategory(id: number): Promise<UpdateResult> {
    return await this.categoryRepository.restore(id);
  }
}
