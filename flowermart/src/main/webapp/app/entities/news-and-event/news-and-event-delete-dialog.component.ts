import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INewsAndEvent } from 'app/shared/model/news-and-event.model';
import { NewsAndEventService } from './news-and-event.service';

@Component({
  templateUrl: './news-and-event-delete-dialog.component.html',
})
export class NewsAndEventDeleteDialogComponent {
  newsAndEvent?: INewsAndEvent;

  constructor(
    protected newsAndEventService: NewsAndEventService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.newsAndEventService.delete(id).subscribe(() => {
      this.eventManager.broadcast('newsAndEventListModification');
      this.activeModal.close();
    });
  }
}
