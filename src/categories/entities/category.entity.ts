import { BaseEntity } from 'src/base/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column()
  code: string;

  @Column()
  value: string;

  @Column()
  subtitle: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
