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

@Entity({ name: 'size' })
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];

  @OneToMany(() => DetailProduct, (detailProduct) => detailProduct.size)
  detailProducts: DetailProduct[];
}
