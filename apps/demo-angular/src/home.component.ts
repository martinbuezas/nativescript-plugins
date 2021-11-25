import { Component } from '@angular/core';

@Component({
	selector: 'demo-home',
	templateUrl: 'home.component.html',
})
export class HomeComponent {
	demos = [
	{
		name: 'nativescript-filepicker'
	},
	{
		name: 'nativescript-share-file'
	},
	{
		name: 'nativescript-social-login'
	}
];
}