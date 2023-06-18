import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { LabelsModule } from './labels/labels.module';
import { AttributesModule } from './attributes/attributes.module';
import { ImagesModule } from './images/images.module';
import { OverviewsModule } from './overviews/overviews.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule,
    PostsModule,
    LabelsModule,
    AttributesModule,
    ImagesModule,
    OverviewsModule,
    CategoriesModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
