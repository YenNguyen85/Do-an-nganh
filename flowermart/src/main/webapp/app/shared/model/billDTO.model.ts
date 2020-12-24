import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { IBillItem } from './bill-item.model';

export interface IBillDTO {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  billItems: IBillItem[];
  user?: IUser;
}

export class BillDTO implements IBillDTO {
  constructor(
    public id?: number,
    public placedDate?: Moment,
    public status?: OrderStatus,
    public billItems: IBillItem[] = [],
    public user?: IUser
  ) {}
}
