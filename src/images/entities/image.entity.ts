import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('images')
export class Image extends BaseEntity {
  @Column()
  image: string;
}
