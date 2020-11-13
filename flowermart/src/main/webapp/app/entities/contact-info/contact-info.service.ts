import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContactInfo } from 'app/shared/model/contact-info.model';

type EntityResponseType = HttpResponse<IContactInfo>;
type EntityArrayResponseType = HttpResponse<IContactInfo[]>;

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  public resourceUrl = SERVER_API_URL + 'api/contact-infos';

  constructor(protected http: HttpClient) {}

  create(contactInfo: IContactInfo): Observable<EntityResponseType> {
    return this.http.post<IContactInfo>(this.resourceUrl, contactInfo, { observe: 'response' });
  }

  update(contactInfo: IContactInfo): Observable<EntityResponseType> {
    return this.http.put<IContactInfo>(this.resourceUrl, contactInfo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
