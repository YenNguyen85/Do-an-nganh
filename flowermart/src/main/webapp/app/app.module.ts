import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { FlowermartSharedModule } from 'app/shared/shared.module';
import { FlowermartCoreModule } from 'app/core/core.module';
import { FlowermartAppRoutingModule } from './app-routing.module';
import { FlowermartHomeModule } from './home/home.module';
import { FlowermartEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

// embeded text editor
import { QuillModule } from 'ngx-quill';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    BrowserModule,
    FlowermartSharedModule,
    FlowermartCoreModule,
    FlowermartHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    FlowermartEntityModule,
    FlowermartAppRoutingModule,
    // embeded text editor module
    QuillModule.forRoot(),
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent, CartComponent],
  bootstrap: [MainComponent],
})
export class FlowermartAppModule {}
