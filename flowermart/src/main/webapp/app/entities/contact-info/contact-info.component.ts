import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoDeleteDialogComponent } from './contact-info-delete-dialog.component';

@Component({
  selector: 'jhi-contact-info',
  templateUrl: './contact-info.component.html',
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  contactInfos?: IContactInfo[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected contactInfoService: ContactInfoService,
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
      this.contactInfoService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IContactInfo[]>) => (this.contactInfos = res.body || []));
      return;
    }

    this.contactInfoService.query().subscribe((res: HttpResponse<IContactInfo[]>) => (this.contactInfos = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContactInfos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContactInfo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContactInfos(): void {
    this.eventSubscriber = this.eventManager.subscribe('contactInfoListModification', () => this.loadAll());
  }

  delete(contactInfo: IContactInfo): void {
    const modalRef = this.modalService.open(ContactInfoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contactInfo = contactInfo;
  }
}
