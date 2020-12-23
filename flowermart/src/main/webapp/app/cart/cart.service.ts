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
  cart: IBillItem[] = [];

  public billUrl = SERVER_API_URL + 'api/bills';
  public billItemUrl = SERVER_API_URL + 'api/bill-items';

  constructor(protected http: HttpClient) {}

  /**
   * Hàm kiểm tra sản phẩm có tồn tại trong giỏ chưa
   * @param product
   * @returns billItem chứa product đó
   */
  checkProductExists(product: IProduct): IBillItem | undefined {
    return this.cart.find(item => item.product === product);
  }

  /**
   * Hàm thêm sản phẩm vào giỏ hàng
   * @param product sản phẩm cần thêm vào giỏ
   */
  addToCart(product: IProduct): void {
    const item = this.checkProductExists(product);
    if (item === undefined) {
      window.alert(`Đã thêm sản phẩm ${product.name} vào giỏ hàng`);
      const billItem: IBillItem = { product, quantity: 1 };
      this.cart.push(billItem);
    } else {
      window.alert(`Đã tăng số lượng sản phẩm ${product.name} vào giỏ hàng`);
      const index = this.cart.indexOf(item);
      item.quantity = item.quantity! + 1;
      this.cart.splice(index, 1, item);
    }
  }

  getCart(): Observable<IBillItem[]> {
    return of(this.cart);
  }

  clearCart(): IBillItem[] {
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
