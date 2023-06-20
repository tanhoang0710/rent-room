import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dao/create-post.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async getAllPost(options: IPaginationOptions): Promise<Pagination<Post>> {
    const posts = await paginate(this.postRepository, options, {
      relations: {
        image: true,
        attribute: true,
        overview: true,
        user: true,
        label: true,
        category: true,
      },
      select: {
        image: {
          image: true,
        },
        attribute: {
          price: true,
          arcreage: true,
          published: true,
          hashtag: true,
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

  async getOnePost(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: {
        image: true,
        attribute: true,
        overview: true,
        user: true,
        label: true,
        category: true,
      },
      select: {
        image: {
          image: true,
        },
        attribute: {
          price: true,
          arcreage: true,
          published: true,
          hashtag: true,
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

    return post;
  }

  async createPost(createPostDto: CreatePostDto) {
    return new Promise((resolve, reject) => {
      resolve(createPostDto);
      reject(2);
    });
  }
}
