import { IBill } from 'app/shared/model/bill.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IBillItem {
  id?: number;
  quantity?: number;
  bill?: IBill;
  product?: IProduct;
}

export class BillItem implements IBillItem {
  constructor(public id?: number, public quantity?: number, public bill?: IBill, public product?: IProduct) {}
}
