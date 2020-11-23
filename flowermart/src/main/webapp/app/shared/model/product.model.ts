import { IBillItem } from 'app/shared/model/bill-item.model';
import { ICategory } from 'app/shared/model/category.model';
import { ProductStatus } from 'app/shared/model/enumerations/product-status.model';
import { Size } from 'app/shared/model/enumerations/size.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: any;
  status?: ProductStatus;
  price?: number;
  size?: Size;
  imageContentType?: string;
  image?: any;
  billItems?: IBillItem[];
  categories?: ICategory[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public status?: ProductStatus,
    public price?: number,
    public size?: Size,
    public imageContentType?: string,
    public image?: any,
    public billItems?: IBillItem[],
    public categories?: ICategory[]
  ) {}
}
