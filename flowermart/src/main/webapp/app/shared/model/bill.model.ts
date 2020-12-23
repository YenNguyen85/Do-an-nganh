import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IBill {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  user?: IUser;
}

export class Bill implements IBill {
  constructor(public id?: number, public placedDate?: Moment, public status?: OrderStatus, public user?: IUser) {}
}
