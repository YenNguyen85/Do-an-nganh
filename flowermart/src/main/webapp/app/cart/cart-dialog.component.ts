import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBillItem } from 'app/shared/model/bill-item.model';
import { IBillDTO } from 'app/shared/model/billDTO.model';

import { JhiEventManager } from 'ng-jhipster';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

@Component({
  templateUrl: './cart-dialog.component.html',
})
export class CartDialogComponent {
  billItems: IBillItem[] = [];

  constructor(protected cartService: CartService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmCheckout(): void {
    if (this.billItems !== undefined && this.billItems !== []) {
      this.subscribeToSaveResponse(this.cartService.saveBill(this.billItems));
      this.cartService.clearCart();
    }
    this.activeModal.close();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBillDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    window.alert('thanh toán thành công');
    window.history.back();
  }

  protected onSaveError(): void {
    window.alert('thanh toán thất bại');
  }
}
