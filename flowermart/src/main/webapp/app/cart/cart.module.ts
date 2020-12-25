import { NgModule } from '@angular/core';

import { FlowermartSharedModule } from 'app/shared/shared.module';
import { CartComponent } from './cart.component';
import { CartDialogComponent } from './cart-dialog.component';

@NgModule({
  imports: [FlowermartSharedModule],
  declarations: [CartComponent, CartDialogComponent],
  entryComponents: [CartDialogComponent],
})
export class FlowermartCartModule {}
