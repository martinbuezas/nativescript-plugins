import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptSocialLoginComponent } from './nativescript-social-login.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptSocialLoginComponent }])],
  declarations: [NativescriptSocialLoginComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptSocialLoginModule {}
