import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptShareFile } from '@demo/shared';
import { } from '@martinbuezas/nativescript-share-file';

@Component({
	selector: 'demo-nativescript-share-file',
	templateUrl: 'nativescript-share-file.component.html',
})
export class NativescriptShareFileComponent {
  
  demoShared: DemoSharedNativescriptShareFile;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptShareFile();
  }

}