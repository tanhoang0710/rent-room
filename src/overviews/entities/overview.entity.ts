import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('overviews')
export class Overview extends BaseEntity {
  @Column()
  code: string;

  @Column()
  area: string;

  @Column()
  type: string;

  @Column()
  target: string;

  @Column()
  bonus: string;

  @Column({ default: null })
  create: Date;

  @Column({ default: null })
  expire: Date;
}
