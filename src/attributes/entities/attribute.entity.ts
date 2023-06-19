import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('attributes')
export class Attribute extends BaseEntity {
  @Column()
  price: string;

  @Column({ default: '100m2' })
  arcreage: string;

  @Column()
  published: string;

  @Column()
  hashtag: string;
}
