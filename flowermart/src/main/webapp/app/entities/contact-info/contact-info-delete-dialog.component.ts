import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ContactInfoService } from './contact-info.service';

@Component({
  templateUrl: './contact-info-delete-dialog.component.html',
})
export class ContactInfoDeleteDialogComponent {
  contactInfo?: IContactInfo;

  constructor(
    protected contactInfoService: ContactInfoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contactInfoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contactInfoListModification');
      this.activeModal.close();
    });
  }
}
