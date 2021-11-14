import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptSocialLogin } from '@demo/shared';
import { } from '@martinbuezas/nativescript-social-login';

@Component({
	selector: 'demo-nativescript-social-login',
	templateUrl: 'nativescript-social-login.component.html',
})
export class NativescriptSocialLoginComponent {
  
  demoShared: DemoSharedNativescriptSocialLogin;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptSocialLogin();
  }
}