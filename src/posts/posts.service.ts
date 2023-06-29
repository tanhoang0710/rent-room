import * as moment from 'moment';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dao/create-post.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { IFilterOptions } from 'src/common/interfaces/filterOptions.interface';
import { LabelsService } from 'src/labels/labels.service';
import { generateCode } from 'src/utils/generateCode.util';
import { AttributesService } from 'src/attributes/attributes.service';
import { OverviewsService } from 'src/overviews/overviews.service';
import { ImagesService } from 'src/images/images.service';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { PriceService } from 'src/price/price.service';
import { AreaService } from 'src/area/area.service';
import { UpdatePostDto } from './dao/update-post.dto';
import { StarPostDto } from './dao/star-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly labelService: LabelsService,
    private readonly attributeService: AttributesService,
    private readonly overviewService: OverviewsService,
    private readonly imageService: ImagesService,
    private readonly userService: UsersService,
    private readonly categoryService: CategoriesService,
    private readonly priceSevice: PriceService,
    private readonly areaService: AreaService,
  ) {}

  async getAllPost(
    options: IPaginationOptions,
    filterOptions: IFilterOptions,
  ): Promise<Pagination<Post>> {
    const posts = await paginate(this.postRepository, options, {
      where: {
        price: {
          code: filterOptions.priceCode,
        },
        area: {
          code: filterOptions.areaCode,
        },
        category: {
          id: filterOptions.categoryId,
        },
        attribute: {
          price: Between(
            filterOptions.condition.price?.min || 0,
            filterOptions.condition.price?.max || 999,
          ),
          arcreage: Between(
            filterOptions.condition.arcreage?.min || 0,
            filterOptions.condition.arcreage?.max || 999,
          ),
        },
      },
      relations: {
        image: true,
        attribute: true,
        area: true,
        price: true,
        overview: true,
        user: true,
        label: true,
        category: true,
      },
      select: {
        deletedAt: false,
        updatedAt: false,
        createdAt: false,
        image: {
          image: true,
        },
        attribute: {
          price: true,
          arcreage: true,
          published: true,
          hashtag: true,
        },
        price: {
          value: true,
        },
        area: {
          value: true,
        },
        overview: {
          code: true,
          area: true,
          type: true,
          target: true,
          bonus: true,
          create: true,
          expire: true,
        },
        user: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
        label: {
          code: true,
          value: true,
        },
        category: {
          code: true,
          value: true,
          subtitle: true,
        },
      },
    });

    return posts;
  }

  async getOnePost(id: number, withDeleted: boolean): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      withDeleted: withDeleted ? true : false,
      relations: {
        image: true,
        attribute: true,
        area: true,
        price: true,
        overview: true,
        user: true,
        label: true,
        category: true,
      },
      select: {
        deletedAt: false,
        updatedAt: false,
        createdAt: false,
        image: {
          image: true,
        },
        attribute: {
          id: true,
          price: true,
          arcreage: true,
          published: true,
          hashtag: true,
        },
        price: {
          id: true,
          value: true,
        },
        area: {
          id: true,
          value: true,
        },
        overview: {
          id: true,
          code: true,
          area: true,
          type: true,
          target: true,
          bonus: true,
          create: true,
          expire: true,
        },
        user: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
        label: {
          id: true,
          code: true,
          value: true,
        },
        category: {
          id: true,
          code: true,
          value: true,
          subtitle: true,
        },
      },
    });

    return post;
  }

  async createPost(createPostDto: CreatePostDto, userId: number) {
    const hashtag = generateCode(6);

    const label = await this.labelService.createLabel({
      code: generateCode(4),
      value: createPostDto.labelValue,
    });

    const attribute = await this.attributeService.createAttribute({
      arcreage: createPostDto.arcreage,
      price: createPostDto.price,
      hashtag,
      published: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    });

    const overview = await this.overviewService.createOverview({
      target: createPostDto.overiewTarget,
      bonus: createPostDto.overviewBonus,
      code: `#${hashtag}`,
      area: createPostDto.address,
      type: 'Cho thue can ho',
    });

    const image = await this.imageService.createImage({
      image: createPostDto.image,
    });

    const user = await this.userService.findOne({ id: userId });

    if (!user) throw new BadRequestException();

    const category = await this.categoryService.getOne(
      createPostDto.categoryId,
    );

    if (!category) throw new BadRequestException();

    const prices = await this.priceSevice.getAllNoPageable();
    const price = prices.find(
      (price) =>
        createPostDto.price >= price.min && createPostDto.price < price.max,
    );
    const areas = await this.areaService.getAllNoPageable();
    const area = areas.find(
      (area) =>
        createPostDto.arcreage >= area.min && createPostDto.arcreage < area.max,
    );

    const post = await this.postRepository.save({
      title: createPostDto.title,
      address: createPostDto.address,
      attribute,
      user,
      overview,
      image,
      description: createPostDto.description,
      label,
      category,
      price,
      area,
    });

    return post;
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await this.postRepository.softDelete(id);

    if (result.affected === 1) return true;
    return false;
  }

  async restorePost(id: number): Promise<boolean> {
    const result = await this.postRepository.restore(id);

    if (result.affected === 1) return true;
    return false;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.getOnePost(id, false);
    const {
      labelValue,
      price,
      arcreage,
      overiewTarget,
      overviewBonus,
      address,
      categoryId,
      description,
      title,
    } = updatePostDto;

    try {
      if (labelValue) {
        const resultUpdateLabel = await this.labelService.updateLabel(
          post.label.id,
          { value: labelValue },
        );

        if (!resultUpdateLabel) throw new BadRequestException();
      }

      if (price) {
        const resultUpdateAttribute =
          await this.attributeService.updateAttribute(post.attribute.id, {
            price,
            published: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
          });

        if (!resultUpdateAttribute) throw new BadRequestException();
        const prices = await this.priceSevice.getAllNoPageable();
        const priceItem = prices.find((p) => price >= p.min && price < p.max);

        if (priceItem)
          await this.postRepository.update(id, {
            price: priceItem,
          });
        else throw new BadRequestException();
      }

      if (arcreage) {
        const resultUpdateAttribute =
          await this.attributeService.updateAttribute(post.attribute.id, {
            arcreage,
            published: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
          });

        if (!resultUpdateAttribute) throw new BadRequestException();
        const areas = await this.areaService.getAllNoPageable();
        const areaItem = areas.find(
          (a) => arcreage >= a.min && arcreage < a.max,
        );

        if (areaItem)
          await this.postRepository.update(id, {
            area: areaItem,
          });
        else throw new BadRequestException();
      }

      if (overiewTarget) {
        const resultUpdateOverview = await this.overviewService.updateOverview(
          post.overview.id,
          {
            target: overiewTarget,
          },
        );

        if (!resultUpdateOverview) throw new BadRequestException();
      }

      if (overviewBonus) {
        const resultUpdateOverview = await this.overviewService.updateOverview(
          post.overview.id,
          {
            bonus: overviewBonus,
          },
        );

        if (!resultUpdateOverview) throw new BadRequestException();
      }

      if (address) {
        const resultUpdateOverview = await this.overviewService.updateOverview(
          post.overview.id,
          {
            area: address,
          },
        );

        if (!resultUpdateOverview) throw new BadRequestException();
      }

      const category = await this.categoryService.getOne(categoryId);

      if (!category) throw new BadRequestException();

      await this.postRepository.update(id, {
        address,
        description,
        title,
        category,
      });
      return await this.getOnePost(id, false);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async starPort(id: number, starPostDto: StarPostDto) {
    const result = await this.postRepository.update(id, {
      star: starPostDto.star,
    });

    if (result.affected === 1) return true;
    throw new InternalServerErrorException();
  }
}
