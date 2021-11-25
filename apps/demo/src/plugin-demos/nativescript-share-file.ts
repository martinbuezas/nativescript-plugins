import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptShareFile } from '@demo/shared';
import { } from '@martinbuezas/nativescript-share-file';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptShareFile {
	
}
