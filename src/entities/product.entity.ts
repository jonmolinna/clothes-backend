import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color, Size } from '.';
import { Category } from './category.entity';
import { Gender } from './gender.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  marca: string;

  @Column({ type: 'varchar', length: 255 })
  code: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'bool', default: true })
  status: boolean;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Gender, (gender) => gender.products)
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @ManyToMany(() => Color, (color) => color.products)
  @JoinTable({
    name: 'products_colors',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'color_id' },
  })
  colors: Color[];

  @ManyToMany(() => Size, (size) => size.products)
  @JoinTable({
    name: 'products_sizes',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'size_id' },
  })
  size: Size[];
}
