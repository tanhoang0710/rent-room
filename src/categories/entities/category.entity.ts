import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column()
  code: string;

  @Column()
  value: string;

  @Column()
  subtitle: string;
}
