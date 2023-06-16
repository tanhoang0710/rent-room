import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('labels')
export class Label extends BaseEntity {
  @Column()
  code: string;

  @Column()
  value: string;
}
