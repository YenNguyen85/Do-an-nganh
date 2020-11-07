import { Moment } from 'moment';
import { IBillItem } from 'app/shared/model/bill-item.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IBill {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  billItems?: IBillItem[];
  customer?: ICustomer;
}

export class Bill implements IBill {
  constructor(
    public id?: number,
    public placedDate?: Moment,
    public status?: OrderStatus,
    public billItems?: IBillItem[],
    public customer?: ICustomer
  ) {}
}
