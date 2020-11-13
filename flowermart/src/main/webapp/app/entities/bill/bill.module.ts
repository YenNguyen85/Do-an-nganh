import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlowermartSharedModule } from 'app/shared/shared.module';
import { BillComponent } from './bill.component';
import { BillDetailComponent } from './bill-detail.component';
import { BillUpdateComponent } from './bill-update.component';
import { BillDeleteDialogComponent } from './bill-delete-dialog.component';
import { billRoute } from './bill.route';

@NgModule({
  imports: [FlowermartSharedModule, RouterModule.forChild(billRoute)],
  declarations: [BillComponent, BillDetailComponent, BillUpdateComponent, BillDeleteDialogComponent],
  entryComponents: [BillDeleteDialogComponent],
})
export class FlowermartBillModule {}
