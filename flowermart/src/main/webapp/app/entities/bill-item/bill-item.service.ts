import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IBillItem } from 'app/shared/model/bill-item.model';

type EntityResponseType = HttpResponse<IBillItem>;
type EntityArrayResponseType = HttpResponse<IBillItem[]>;

@Injectable({ providedIn: 'root' })
export class BillItemService {
  public resourceUrl = SERVER_API_URL + 'api/bill-items';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/bill-items';

  constructor(protected http: HttpClient) {}

  create(billItem: IBillItem): Observable<EntityResponseType> {
    return this.http.post<IBillItem>(this.resourceUrl, billItem, { observe: 'response' });
  }

  update(billItem: IBillItem): Observable<EntityResponseType> {
    return this.http.put<IBillItem>(this.resourceUrl, billItem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBillItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBillItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBillItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
