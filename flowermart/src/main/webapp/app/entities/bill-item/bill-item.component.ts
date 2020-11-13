import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBillItem } from 'app/shared/model/bill-item.model';
import { BillItemService } from './bill-item.service';
import { BillItemDeleteDialogComponent } from './bill-item-delete-dialog.component';

@Component({
  selector: 'jhi-bill-item',
  templateUrl: './bill-item.component.html',
})
export class BillItemComponent implements OnInit, OnDestroy {
  billItems?: IBillItem[];
  eventSubscriber?: Subscription;

  constructor(protected billItemService: BillItemService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.billItemService.query().subscribe((res: HttpResponse<IBillItem[]>) => (this.billItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBillItems();
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

  delete(billItem: IBillItem): void {
    const modalRef = this.modalService.open(BillItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.billItem = billItem;
  }
}
