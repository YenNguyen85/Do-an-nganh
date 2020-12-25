import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBillItem } from 'app/shared/model/bill-item.model';

import { IBill } from 'app/shared/model/bill.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { BillItemService } from '../bill-item/bill-item.service';

@Component({
  selector: 'jhi-bill-detail',
  templateUrl: './bill-detail.component.html',
})
export class BillDetailComponent implements OnInit, OnDestroy {
  bill: IBill | null = null;

  billItems?: IBillItem[];
  eventSubscriber?: Subscription;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected billItemService: BillItemService,
    protected eventManager: JhiEventManager
  ) {}

  loadAll(): void {
    if (this.bill?.id !== undefined)
      this.billItemService.getItemsOfBill(this.bill?.id).subscribe((res: HttpResponse<IBillItem[]>) => (this.billItems = res.body || []));
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bill }) => (this.bill = bill));
    this.loadAll();
    this.registerChangeInBillItems();
  }

  previousState(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBillItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBillItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('billItemListModification', () => this.loadAll());
  }
}
