import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DetailProduct } from './detail_product.entity';
import { Product } from './product.entity';

@Entity({ name: 'color' })
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => Product, (product) => product.colors)
  products: Product[];

  @OneToMany(() => DetailProduct, (detailProduct) => detailProduct.color)
  detailProducts: DetailProduct[];
}
