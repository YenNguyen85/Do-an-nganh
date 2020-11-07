import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlowermartSharedModule } from 'app/shared/shared.module';
import { BillItemComponent } from './bill-item.component';
import { BillItemDetailComponent } from './bill-item-detail.component';
import { BillItemUpdateComponent } from './bill-item-update.component';
import { BillItemDeleteDialogComponent } from './bill-item-delete-dialog.component';
import { billItemRoute } from './bill-item.route';

@NgModule({
  imports: [FlowermartSharedModule, RouterModule.forChild(billItemRoute)],
  declarations: [BillItemComponent, BillItemDetailComponent, BillItemUpdateComponent, BillItemDeleteDialogComponent],
  entryComponents: [BillItemDeleteDialogComponent],
})
export class FlowermartBillItemModule {}
