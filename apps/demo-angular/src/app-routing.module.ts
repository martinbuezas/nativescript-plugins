import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';
import { NativescriptFilepickerModule } from "./plugin-demos/nativescript-filepicker.module";

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
	{ path: 'nativescript-filepicker', loadChildren: () => import('./plugin-demos/nativescript-filepicker.module').then(m => m.NativescriptFilepickerModule) },
	{ path: 'nativescript-share-file', loadChildren: () => import('./plugin-demos/nativescript-share-file.module').then(m => m.NativescriptShareFileModule) },
	{ path: 'nativescript-social-login', loadChildren: () => import('./plugin-demos/nativescript-social-login.module').then(m => m.NativescriptSocialLoginModule) }
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
