import { Attribute } from 'src/attributes/entities/attribute.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { Label } from 'src/labels/entities/label.entity';
import { Overview } from 'src/overviews/entities/overview.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: '0' })
  star: string;

  @OneToOne(() => Label, (label) => label.code)
  @JoinColumn({ name: 'labelCode', referencedColumnName: 'code' })
  label: Label;

  @Column()
  address: string;

  @OneToOne(() => Attribute, (attribute) => attribute.id)
  @JoinColumn()
  attribute: Attribute;

  @OneToOne(() => Category, (category) => category.code)
  @JoinColumn({ name: 'categoryCode', referencedColumnName: 'code' })
  category: Category;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToOne(() => Overview, (overview) => overview.id)
  @JoinColumn()
  overview: Overview;

  @OneToOne(() => Image, (image) => image.id)
  @JoinColumn()
  image: Image;
}
