import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { INewsAndEvent } from 'app/shared/model/news-and-event.model';

@Component({
  selector: 'jhi-news-and-event-detail',
  templateUrl: './news-and-event-detail.component.html',
})
export class NewsAndEventDetailComponent implements OnInit {
  newsAndEvent: INewsAndEvent | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ newsAndEvent }) => (this.newsAndEvent = newsAndEvent));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
