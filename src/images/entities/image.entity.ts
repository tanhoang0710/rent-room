import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('images')
export class Image extends BaseEntity {
  @Column({ type: 'text' })
  image: string;
}
