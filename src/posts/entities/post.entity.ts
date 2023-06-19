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

  @Column({ default: null })
  attributeId: number;

  @Column()
  categoryCode: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: null })
  userId: number;

  @Column({ default: null })
  overviewId: number;

  @Column({ default: null })
  imagesId: number;
}
