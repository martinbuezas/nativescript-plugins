import { NativeScriptConfig } from '@nativescript/core';

export default {
	id: 'com.rdba.nativescriptngapp.dev',
	appResourcesPath: '../../tools/assets/App_Resources',
	android: {
		v8Flags: '--expose_gc',
		markingMode: 'none',
	},
	appPath: 'src',
} as NativeScriptConfig;
