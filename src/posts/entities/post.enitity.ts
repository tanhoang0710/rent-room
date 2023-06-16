import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: '0' })
  star: string;

  @Column()
  labelCode: string;

  @Column()
  address: string;

  @Column()
  attributeId: string;

  @Column()
  categoryCode: string;

  @Column()
  description: string;

  @Column()
  userId: string;

  @Column()
  overviewId: string;

  @Column()
  imagesId: string;
}
