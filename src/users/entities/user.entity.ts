import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  password: string;

  @Column()
  phone: string;

  @Column({ default: null, nullable: true })
  refreshToken: string;

  @Column({ default: null, nullable: true, unique: true })
  email: string;

  @Column({ default: null, nullable: true })
  resetPasswordToken: string;

  @Column({ default: null, nullable: true })
  resetPasswordExpires: Date;
}
