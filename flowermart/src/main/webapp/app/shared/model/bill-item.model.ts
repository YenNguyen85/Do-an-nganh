import { IBill } from 'app/shared/model/bill.model';
import { IProduct } from 'app/shared/model/product.model';
import { BillItemStatus } from 'app/shared/model/enumerations/bill-item-status.model';

export interface IBillItem {
  id?: number;
  quantity?: number;
  status?: BillItemStatus;
  bill?: IBill;
  product?: IProduct;
}

export class BillItem implements IBillItem {
  constructor(
    public id?: number,
    public quantity?: number,
    public status?: BillItemStatus,
    public bill?: IBill,
    public product?: IProduct
  ) {}
}
