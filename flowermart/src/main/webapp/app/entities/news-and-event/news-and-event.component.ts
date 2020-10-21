import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INewsAndEvent } from 'app/shared/model/news-and-event.model';
import { NewsAndEventService } from './news-and-event.service';
import { NewsAndEventDeleteDialogComponent } from './news-and-event-delete-dialog.component';

@Component({
  selector: 'jhi-news-and-event',
  templateUrl: './news-and-event.component.html',
})
export class NewsAndEventComponent implements OnInit, OnDestroy {
  newsAndEvents?: INewsAndEvent[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected newsAndEventService: NewsAndEventService,
    protected dataUtils: JhiDataUtils,
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
      this.newsAndEventService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<INewsAndEvent[]>) => (this.newsAndEvents = res.body || []));
      return;
    }

    this.newsAndEventService.query().subscribe((res: HttpResponse<INewsAndEvent[]>) => (this.newsAndEvents = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNewsAndEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INewsAndEvent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInNewsAndEvents(): void {
    this.eventSubscriber = this.eventManager.subscribe('newsAndEventListModification', () => this.loadAll());
  }

  delete(newsAndEvent: INewsAndEvent): void {
    const modalRef = this.modalService.open(NewsAndEventDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.newsAndEvent = newsAndEvent;
  }
}
