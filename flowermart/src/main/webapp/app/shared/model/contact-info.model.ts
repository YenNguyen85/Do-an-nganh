export interface IContactInfo {
  id?: number;
  email?: string;
  phone?: string;
}

export class ContactInfo implements IContactInfo {
  constructor(public id?: number, public email?: string, public phone?: string) {}
}
