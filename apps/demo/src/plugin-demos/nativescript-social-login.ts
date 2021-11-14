import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptSocialLogin } from '@demo/shared';
import { } from '@martinbuezas/nativescript-social-login';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptSocialLogin {
	
}
