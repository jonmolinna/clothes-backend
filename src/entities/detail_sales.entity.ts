import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DetailProduct } from './detail_product.entity';
import { Sale } from './sales.entity';

@Entity({ name: 'detail_sales' })
export class DetailSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', default: 0, name: 'quantity' })
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    name: 'unit_price',
  })
  unitPrice: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Sale, (sale) => sale.detailSales)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => DetailProduct, (detailproduct) => detailproduct.detailSales)
  @JoinColumn({ name: 'detail_product_id' })
  detailProduct: DetailProduct;
}
