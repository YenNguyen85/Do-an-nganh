import { IBillItem } from 'app/shared/model/bill-item.model';
import { ICategory } from 'app/shared/model/category.model';
import { Size } from 'app/shared/model/enumerations/size.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: any;
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
    public price?: number,
    public size?: Size,
    public imageContentType?: string,
    public image?: any,
    public billItems?: IBillItem[],
    public categories?: ICategory[]
  ) {}
}
