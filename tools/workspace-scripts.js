const npsUtils = require('nps-utils');

module.exports = {
	message: 'NativeScript Plugins ~ made with โค๏ธ  Choose a command to start...',
	pageSize: 32,
	scripts: {
		default: 'nps-i',
		nx: {
			script: 'nx',
			description: 'Execute any command with the @nrwl/cli',
		},
		format: {
			script: 'nx format:write',
			description: 'Format source code of the entire workspace (auto-run on precommit hook)',
		},
		'๐ง': {
			script: `npx cowsay "NativeScript plugin demos make developers ๐"`,
			description: '_____________  Apps to demo plugins with  _____________',
		},
		// demos
		apps: {
			'...Vanilla...': {
				script: `npx cowsay "Nothing wrong with vanilla ๐ฆ"`,
				description: ` ๐ป Vanilla`,
			},
			demo: {
				clean: {
					script: 'nx run demo:clean',
					description: 'โ  Clean  ๐งน',
				},
				ios: {
					script: 'nx run demo:ios',
					description: 'โ  Run iOS  ๏ฃฟ',
				},
				android: {
					script: 'nx run demo:android',
					description: 'โ  Run Android  ๐ค',
				},
			},
			'...Angular...': {
				script: `npx cowsay "Test all the Angles!"`,
				description: ` ๐ป Angular`,
			},
			'demo-angular': {
				clean: {
					script: 'nx run demo-angular:clean',
					description: 'โ  Clean  ๐งน',
				},
				ios: {
					script: 'nx run demo-angular:ios',
					description: 'โ  Run iOS  ๏ฃฟ',
				},
				android: {
					script: 'nx run demo-angular:android',
					description: 'โ  Run Android  ๐ค',
				},
			},
		},
		'โ๏ธ': {
			script: `npx cowsay "@martinbuezas/* packages will keep your โ๏ธ cranking"`,
			description: '_____________  @martinbuezas/*  _____________',
		},
		// packages
		// build output is always in dist/packages
		'@martinbuezas': {
			// @martinbuezas/nativescript-filepicker
			'nativescript-filepicker': {
				build: {
					script: 'nx run nativescript-filepicker:build.all',
					description: '@martinbuezas/nativescript-filepicker: Build',
				},
			},
			// @martinbuezas/nativescript-social-login
			'nativescript-social-login': {
				build: {
					script: 'nx run nativescript-social-login:build.all',
					description: '@martinbuezas/nativescript-social-login: Build',
				},
			},
			// @martinbuezas/nativescript-share-file
			'nativescript-share-file': {
				build: {
					script: 'nx run nativescript-share-file:build.all',
					description: '@martinbuezas/nativescript-share-file: Build',
				},
			},
			'build-all': {
				script: 'nx run all:build',
				description: 'Build all packages',
			},
		},
		'โก': {
			script: `npx cowsay "Focus only on source you care about for efficiency โก"`,
			description: '_____________  Focus (VS Code supported)  _____________',
		},
		focus: {
			'nativescript-filepicker': {
				script: 'nx run nativescript-filepicker:focus',
				description: 'Focus on @martinbuezas/nativescript-filepicker',
			},
			'nativescript-social-login': {
				script: 'nx run nativescript-social-login:focus',
				description: 'Focus on @martinbuezas/nativescript-social-login',
			},
			'nativescript-share-file': {
				script: 'nx run nativescript-share-file:focus',
				description: 'Focus on @martinbuezas/nativescript-share-file',
			},
			reset: {
				script: 'nx run all:focus',
				description: 'Reset Focus',
			}
		},
		'.....................': {
			script: `npx cowsay "That's all for now folks ~"`,
			description: '.....................',
		},
	},
};
