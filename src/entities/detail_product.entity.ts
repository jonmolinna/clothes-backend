import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';
import { DetailSale } from './detail_sales.entity';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity({ name: 'detail_product' })
export class DetailProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'bool', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.detailProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Color, (color) => color.detailProducts)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @ManyToOne(() => Size)
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @OneToMany(() => DetailSale, (detailSale) => detailSale.detailProduct)
  detailSales: DetailSale[];
}
