import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlowermartSharedModule } from 'app/shared/shared.module';
import { InfoCustomerComponent } from './info-customer.component';
import { InfoCustomerDetailComponent } from './info-customer-detail.component';
import { InfoCustomerUpdateComponent } from './info-customer-update.component';
import { InfoCustomerDeleteDialogComponent } from './info-customer-delete-dialog.component';
import { infoCustomerRoute } from './info-customer.route';

@NgModule({
  imports: [FlowermartSharedModule, RouterModule.forChild(infoCustomerRoute)],
  declarations: [InfoCustomerComponent, InfoCustomerDetailComponent, InfoCustomerUpdateComponent, InfoCustomerDeleteDialogComponent],
  entryComponents: [InfoCustomerDeleteDialogComponent],
})
export class FlowermartInfoCustomerModule {}
