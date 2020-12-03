import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IBill } from 'app/shared/model/bill.model';
import { IBillItem } from 'app/shared/model/bill-item.model';

import { Observable, Subscription } from 'rxjs';
import { CartService } from './cart.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from 'app/shared/model/product.model';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  bill?: IBill;

  billItems: IBillItem[] = []; // Khởi tạo biến lưu danh sách bill item

  products: IProduct[] = [];

  eventSubscriber?: Subscription;

  constructor(protected cartService: CartService, protected modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.cartService.getCart().subscribe(res => (this.products = res));
    // eslint-disable-next-line
    //this.cartService.getCart().subscribe((res: HttpResponse<IBill>) => this.bill = res.body || undefined );
  }

  loadBillItem(bill: IBill): void {
    if (bill.id !== undefined) {
      this.cartService.getByBill(bill.id).subscribe((res: HttpResponse<IBillItem[]>) => (this.billItems = res.body || []));
    }
  }

  delete(product: IProduct): void {
    this.products = this.products.filter(value => value !== product);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBill>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {}

  previousState(): void {
    window.history.back();
  }
}
