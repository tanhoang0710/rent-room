import { BaseEntity } from 'src/base/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Price extends BaseEntity {
  @Column()
  code: string;

  @Column()
  value: string;

  @OneToMany(() => Post, (post) => post.price)
  posts: Post[];
}
