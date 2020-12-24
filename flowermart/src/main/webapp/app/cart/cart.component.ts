import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IBillItem } from 'app/shared/model/bill-item.model';

import { Observable, Subscription } from 'rxjs';
import { CartService } from './cart.service';

import { JhiEventManager } from 'ng-jhipster';
import { IBillDTO } from 'app/shared/model/billDTO.model';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  isSaving = false;
  billItems?: IBillItem[];

  eventSubscriber?: Subscription;

  constructor(protected cartService: CartService, protected eventManager: JhiEventManager) {}

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCategories();
  }

  loadAll(): void {
    this.cartService.getCart().subscribe(res => (this.billItems = res || []));
  }

  /**
   * Hàm tính tổng giá tiền các mặt hàng trong giỏ
   */
  loadTotalPrice(): number {
    let totalPrice = 0;
    this.billItems?.forEach(item => {
      totalPrice = totalPrice + item.quantity! * item.product?.price!;
    });
    return totalPrice;
  }

  delete(item: IBillItem): void {
    this.cartService.deleteItem(item);
    // load lại
    this.loadAll();
  }

  // pay(): void {
  //   this.cartService.saveBill();
  //   this.cartService.clearCart();
  //   this.loadAll();
  // }

  registerChangeInCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('cartModification', () => this.loadAll());
  }

  previousState(): void {
    window.history.back();
  }

  checkout(): void {
    this.isSaving = true;
    if (this.billItems !== undefined && this.billItems !== []) {
      this.subscribeToSaveResponse(this.cartService.saveBill(this.billItems));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBillDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    window.alert('thanh toán thành công');
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
    window.alert('thanh toán thất bại');
  }
}
