import { IUser } from 'app/core/user/user.model';
import { IBill } from 'app/shared/model/bill.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ICustomer {
  id?: number;
  gender?: Gender;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  user?: IUser;
  bills?: IBill[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public gender?: Gender,
    public phone?: string,
    public addressLine1?: string,
    public addressLine2?: string,
    public city?: string,
    public country?: string,
    public user?: IUser,
    public bills?: IBill[]
  ) {}
}
