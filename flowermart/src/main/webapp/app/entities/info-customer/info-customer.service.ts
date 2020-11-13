import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInfoCustomer } from 'app/shared/model/info-customer.model';

type EntityResponseType = HttpResponse<IInfoCustomer>;
type EntityArrayResponseType = HttpResponse<IInfoCustomer[]>;

@Injectable({ providedIn: 'root' })
export class InfoCustomerService {
  public resourceUrl = SERVER_API_URL + 'api/info-customers';

  constructor(protected http: HttpClient) {}

  create(infoCustomer: IInfoCustomer): Observable<EntityResponseType> {
    return this.http.post<IInfoCustomer>(this.resourceUrl, infoCustomer, { observe: 'response' });
  }

  update(infoCustomer: IInfoCustomer): Observable<EntityResponseType> {
    return this.http.put<IInfoCustomer>(this.resourceUrl, infoCustomer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInfoCustomer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInfoCustomer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
