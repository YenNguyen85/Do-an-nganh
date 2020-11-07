import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  currentSearch: string;

  constructor(
    protected billService: BillService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.billService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IBill[]>) => (this.bills = res.body || []));
      return;
    }

    this.billService.query().subscribe((res: HttpResponse<IBill[]>) => (this.bills = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
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
