import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptShareFileComponent } from './nativescript-share-file.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptShareFileComponent }])],
  declarations: [NativescriptShareFileComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptShareFileModule {}
