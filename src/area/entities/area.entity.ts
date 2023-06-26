import { BaseEntity } from 'src/base/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Area extends BaseEntity {
  @Column()
  code: string;

  @Column()
  value: string;

  @OneToMany(() => Post, (post) => post.area)
  posts: Post[];

  @Column({ default: 0, nullable: true })
  min: number;

  @Column({ default: 0, nullable: true })
  max: number;
}
