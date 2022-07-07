import { Customer } from './customer.entity';
import { Role } from './roles.entity';
import { User } from './users.entity';
import { Category } from './category.entity';
import { Gender } from './gender.entity';
import { Size } from './size.entity';
import { Color } from './color.entity';
import { Product } from './product.entity';
import { DetailProduct } from './detail_product.entity';
import { Sale } from './sales.entity';
import { DetailSale } from './detail_sales.entity';

const entities = [
  Customer,
  Role,
  User,
  Category,
  Gender,
  Size,
  Color,
  Product,
  DetailProduct,
  Sale,
  DetailSale,
];

export {
  Customer,
  Role,
  User,
  Category,
  Gender,
  Size,
  Color,
  Product,
  DetailProduct,
  Sale,
  DetailSale,
};

export default entities;
