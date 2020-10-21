import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBillItem } from 'app/shared/model/bill-item.model';
import { BillItemService } from './bill-item.service';

@Component({
  templateUrl: './bill-item-delete-dialog.component.html',
})
export class BillItemDeleteDialogComponent {
  billItem?: IBillItem;

  constructor(protected billItemService: BillItemService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.billItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('billItemListModification');
      this.activeModal.close();
    });
  }
}
