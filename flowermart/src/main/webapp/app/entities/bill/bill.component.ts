import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBill } from 'app/shared/model/bill.model';
import { BillService } from './bill.service';
import { BillDeleteDialogComponent } from './bill-delete-dialog.component';

@Component({
  selector: 'jhi-bill',
  templateUrl: './bill.component.html',
})
export class BillComponent implements OnInit, OnDestroy {
  bills?: IBill[];
  eventSubscriber?: Subscription;

  constructor(protected billService: BillService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.billService.query().subscribe((res: HttpResponse<IBill[]>) => (this.bills = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBills();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBill): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBills(): void {
    this.eventSubscriber = this.eventManager.subscribe('billListModification', () => this.loadAll());
  }

  delete(bill: IBill): void {
    const modalRef = this.modalService.open(BillDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bill = bill;
  }
}
