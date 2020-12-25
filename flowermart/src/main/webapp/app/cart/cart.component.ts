import { Component, OnInit } from '@angular/core';

import { IBillItem } from 'app/shared/model/bill-item.model';

import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { JhiEventManager } from 'ng-jhipster';
import { CartDialogComponent } from './cart-dialog.component';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  billItems?: IBillItem[];

  eventSubscriber?: Subscription;

  constructor(protected cartService: CartService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

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

  registerChangeInCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('cartModification', () => this.loadAll());
  }

  previousState(): void {
    window.history.back();
  }

  checkout(): void {
    const modalRef = this.modalService.open(CartDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.billItems = this.billItems;
  }
}
