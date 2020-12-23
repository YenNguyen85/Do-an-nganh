import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { IBill } from 'app/shared/model/bill.model';
import { IBillItem } from 'app/shared/model/bill-item.model';
import { IProduct } from 'app/shared/model/product.model';

type EntityResponseType = HttpResponse<IBill>;
type EntityArrayResponseType = HttpResponse<IBillItem[]>;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: IProduct[] = [];

  public billUrl = SERVER_API_URL + 'api/bills';
  public billItemUrl = SERVER_API_URL + 'api/bill-items';

  constructor(protected http: HttpClient) {}

  addToCart(product: IProduct): void {
    //window.alert(`Đã thêm sản phẩm ${product.name} vào giỏ hàng`)
    if (this.cart.includes(product) === false) this.cart.push(product);
  }

  getCart(): Observable<IProduct[]> {
    return of(this.cart);
  }

  clearCart(): IProduct[] {
    this.cart = [];
    return this.cart;
  }

  // Gọi api hiển thị bill mới nhất và đang pending
  // getCart(): Observable<EntityResponseType> {
  //   return this.http
  //   .get<IBill>(`${this.billUrl}/cart`, { observe: 'response' })
  //   .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  // }

  // Hiển thị danh sách các món sản phẩm hiện đang trong cart
  getByBill(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IBillItem[]>(`${this.billItemUrl}/bill/${id}`, { observe: 'response' });
  }

  // Xóa 1 bill item
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.billItemUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.placedDate = res.body.placedDate ? moment(res.body.placedDate) : undefined;
    }
    return res;
  }
}
