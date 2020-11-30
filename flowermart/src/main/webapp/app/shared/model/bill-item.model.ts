import { IProduct } from 'app/shared/model/product.model';
import { IBill } from 'app/shared/model/bill.model';

export interface IBillItem {
  id?: number;
  quantity?: number;
  product?: IProduct;
  bill?: IBill;
}

export class BillItem implements IBillItem {
  constructor(public id?: number, public quantity?: number, public product?: IProduct, public bill?: IBill) {}
}
