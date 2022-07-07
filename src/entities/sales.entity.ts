import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { DetailSale } from './detail_sales.entity';
import { User } from './users.entity';

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'sale_date' })
  saleDate: Date;

  @Column({ type: 'bool', default: true })
  status: boolean;

  @Column({ type: 'uuid' })
  serialNumber: string;

  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => DetailSale, (detailSale) => detailSale.sale, {
    cascade: true,
  })
  detailSales: DetailSale[];
}
