import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeormBaseEntity,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends TypeormBaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id!: number;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  @Exclude()
  @ApiHideProperty()
  deletedAt!: Date;
}
