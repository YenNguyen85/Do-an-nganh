import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { INewsAndEvent } from 'app/shared/model/news-and-event.model';

type EntityResponseType = HttpResponse<INewsAndEvent>;
type EntityArrayResponseType = HttpResponse<INewsAndEvent[]>;

@Injectable({ providedIn: 'root' })
export class NewsAndEventService {
  public resourceUrl = SERVER_API_URL + 'api/news-and-events';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/news-and-events';

  constructor(protected http: HttpClient) {}

  create(newsAndEvent: INewsAndEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(newsAndEvent);
    return this.http
      .post<INewsAndEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(newsAndEvent: INewsAndEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(newsAndEvent);
    return this.http
      .put<INewsAndEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INewsAndEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INewsAndEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INewsAndEvent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(newsAndEvent: INewsAndEvent): INewsAndEvent {
    const copy: INewsAndEvent = Object.assign({}, newsAndEvent, {
      time: newsAndEvent.time && newsAndEvent.time.isValid() ? newsAndEvent.time.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.time = res.body.time ? moment(res.body.time) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((newsAndEvent: INewsAndEvent) => {
        newsAndEvent.time = newsAndEvent.time ? moment(newsAndEvent.time) : undefined;
      });
    }
    return res;
  }
}
