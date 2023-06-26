import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { LabelsModule } from 'src/labels/labels.module';
import { AttributesModule } from 'src/attributes/attributes.module';
import { OverviewsModule } from 'src/overviews/overviews.module';
import { ImagesModule } from 'src/images/images.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { PriceModule } from 'src/price/price.module';
import { AreaModule } from 'src/area/area.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    LabelsModule,
    AttributesModule,
    OverviewsModule,
    ImagesModule,
    UsersModule,
    CategoriesModule,
    PriceModule,
    AreaModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
