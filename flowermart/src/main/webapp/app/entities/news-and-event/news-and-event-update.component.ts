import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { INewsAndEvent, NewsAndEvent } from 'app/shared/model/news-and-event.model';
import { NewsAndEventService } from './news-and-event.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-news-and-event-update',
  templateUrl: './news-and-event-update.component.html',
})
export class NewsAndEventUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    content: [],
    time: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected newsAndEventService: NewsAndEventService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ newsAndEvent }) => {
      if (!newsAndEvent.id) {
        const today = moment().startOf('day');
        newsAndEvent.time = today;
      }

      this.updateForm(newsAndEvent);
    });
  }

  updateForm(newsAndEvent: INewsAndEvent): void {
    this.editForm.patchValue({
      id: newsAndEvent.id,
      title: newsAndEvent.title,
      content: newsAndEvent.content,
      time: newsAndEvent.time ? newsAndEvent.time.format(DATE_TIME_FORMAT) : null,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('flowermartApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const newsAndEvent = this.createFromForm();
    if (newsAndEvent.id !== undefined) {
      this.subscribeToSaveResponse(this.newsAndEventService.update(newsAndEvent));
    } else {
      this.subscribeToSaveResponse(this.newsAndEventService.create(newsAndEvent));
    }
  }

  private createFromForm(): INewsAndEvent {
    return {
      ...new NewsAndEvent(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      content: this.editForm.get(['content'])!.value,
      time: this.editForm.get(['time'])!.value ? moment(this.editForm.get(['time'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INewsAndEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
