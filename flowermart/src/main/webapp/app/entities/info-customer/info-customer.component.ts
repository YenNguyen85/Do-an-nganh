import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInfoCustomer } from 'app/shared/model/info-customer.model';
import { InfoCustomerService } from './info-customer.service';
import { InfoCustomerDeleteDialogComponent } from './info-customer-delete-dialog.component';

@Component({
  selector: 'jhi-info-customer',
  templateUrl: './info-customer.component.html',
})
export class InfoCustomerComponent implements OnInit, OnDestroy {
  infoCustomers?: IInfoCustomer[];
  eventSubscriber?: Subscription;

  constructor(
    protected infoCustomerService: InfoCustomerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.infoCustomerService.query().subscribe((res: HttpResponse<IInfoCustomer[]>) => (this.infoCustomers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInfoCustomers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInfoCustomer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInfoCustomers(): void {
    this.eventSubscriber = this.eventManager.subscribe('infoCustomerListModification', () => this.loadAll());
  }

  delete(infoCustomer: IInfoCustomer): void {
    const modalRef = this.modalService.open(InfoCustomerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.infoCustomer = infoCustomer;
  }
}
