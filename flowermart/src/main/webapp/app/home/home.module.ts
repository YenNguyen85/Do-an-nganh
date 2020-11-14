import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlowermartSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [FlowermartSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class FlowermartHomeModule {}
