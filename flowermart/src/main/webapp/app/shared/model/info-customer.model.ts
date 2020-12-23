import { IUser } from 'app/core/user/user.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IInfoCustomer {
  id?: number;
  gender?: Gender;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  user?: IUser;
}

export class InfoCustomer implements IInfoCustomer {
  constructor(
    public id?: number,
    public gender?: Gender,
    public phone?: string,
    public addressLine1?: string,
    public addressLine2?: string,
    public city?: string,
    public country?: string,
    public user?: IUser
  ) {}
}
