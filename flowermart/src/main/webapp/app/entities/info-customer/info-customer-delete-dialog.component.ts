import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInfoCustomer } from 'app/shared/model/info-customer.model';
import { InfoCustomerService } from './info-customer.service';

@Component({
  templateUrl: './info-customer-delete-dialog.component.html',
})
export class InfoCustomerDeleteDialogComponent {
  infoCustomer?: IInfoCustomer;

  constructor(
    protected infoCustomerService: InfoCustomerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.infoCustomerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('infoCustomerListModification');
      this.activeModal.close();
    });
  }
}
