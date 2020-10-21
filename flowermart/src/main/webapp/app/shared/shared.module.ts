import { NgModule } from '@angular/core';
import { FlowermartSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

import { JhMaterialModule } from 'app/shared/material.module';

@NgModule({
  imports: [FlowermartSharedLibsModule, JhMaterialModule],
  declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [LoginModalComponent],
  exports: [
    FlowermartSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    JhMaterialModule,
  ],
})
export class FlowermartSharedModule {}
