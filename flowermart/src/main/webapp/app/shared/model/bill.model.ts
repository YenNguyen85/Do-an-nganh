import { Moment } from 'moment';
import { IBillItem } from 'app/shared/model/bill-item.model';
import { IUser } from 'app/core/user/user.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IBill {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  billItems?: IBillItem[];
  user?: IUser;
}

export class Bill implements IBill {
  constructor(
    public id?: number,
    public placedDate?: Moment,
    public status?: OrderStatus,
    public billItems?: IBillItem[],
    public user?: IUser
  ) {}
}
