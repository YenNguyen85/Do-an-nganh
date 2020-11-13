import { Moment } from 'moment';

export interface INewsAndEvent {
  id?: number;
  title?: string;
  content?: any;
  time?: Moment;
}

export class NewsAndEvent implements INewsAndEvent {
  constructor(public id?: number, public title?: string, public content?: any, public time?: Moment) {}
}
