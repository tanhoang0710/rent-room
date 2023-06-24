import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('attributes')
export class Attribute extends BaseEntity {
  @Column()
  price: number;

  @Column({ default: 100 })
  arcreage: number;

  @Column()
  published: string;

  @Column()
  hashtag: string;
}
