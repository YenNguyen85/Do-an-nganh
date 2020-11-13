import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlowermartSharedModule } from 'app/shared/shared.module';
import { ContactInfoComponent } from './contact-info.component';
import { ContactInfoDetailComponent } from './contact-info-detail.component';
import { ContactInfoUpdateComponent } from './contact-info-update.component';
import { ContactInfoDeleteDialogComponent } from './contact-info-delete-dialog.component';
import { contactInfoRoute } from './contact-info.route';

@NgModule({
  imports: [FlowermartSharedModule, RouterModule.forChild(contactInfoRoute)],
  declarations: [ContactInfoComponent, ContactInfoDetailComponent, ContactInfoUpdateComponent, ContactInfoDeleteDialogComponent],
  entryComponents: [ContactInfoDeleteDialogComponent],
})
export class FlowermartContactInfoModule {}
