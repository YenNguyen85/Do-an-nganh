import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlowermartSharedModule } from 'app/shared/shared.module';
import { NewsAndEventComponent } from './news-and-event.component';
import { NewsAndEventDetailComponent } from './news-and-event-detail.component';
import { NewsAndEventUpdateComponent } from './news-and-event-update.component';
import { NewsAndEventDeleteDialogComponent } from './news-and-event-delete-dialog.component';
import { newsAndEventRoute } from './news-and-event.route';

@NgModule({
  imports: [FlowermartSharedModule, RouterModule.forChild(newsAndEventRoute)],
  declarations: [NewsAndEventComponent, NewsAndEventDetailComponent, NewsAndEventUpdateComponent, NewsAndEventDeleteDialogComponent],
  entryComponents: [NewsAndEventDeleteDialogComponent],
})
export class FlowermartNewsAndEventModule {}
