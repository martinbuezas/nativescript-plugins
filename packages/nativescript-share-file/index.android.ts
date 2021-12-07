import { Application, File } from '@nativescript/core';
import { ShareFileCommon } from './common';

export class ShareFile extends ShareFileCommon {
	open(args: any): boolean {
		if (!args.path) {
			console.log('ShareFile: Please add a file path');
			return false;
		}

		try {
			let intent = new android.content.Intent();
			let map = android.webkit.MimeTypeMap.getSingleton();
			let mimeType = map.getMimeTypeFromExtension(this.fileExtension(args.path));
			mimeType = mimeType ? mimeType : 'message/rfc822';

			intent.addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);

			let uris = new java.util.ArrayList();
			let uri = this.getUriForPath(args.path, '/' + this.fileName(args.path), Application.android.context);
			uris.add(uri);
			let builder = new android.os.StrictMode.VmPolicy.Builder();
			android.os.StrictMode.setVmPolicy(builder.build());

			intent.setAction(android.content.Intent.ACTION_SEND_MULTIPLE);
			intent.setType(mimeType);
			intent.putParcelableArrayListExtra(android.content.Intent.EXTRA_STREAM, uris);

			Application.android.foregroundActivity.startActivity(android.content.Intent.createChooser(intent, args.intentTitle ? args.intentTitle : 'Open file:'));

			return true;
		} catch (e) {
			console.log('ShareFile: Android intent failed', e);
			return false;
		}
	}

	private fileExtension(filename) {
		return filename.split('.').pop();
	}

	private fileName(filename) {
		return filename.split('/').pop();
	}

	private getUriForPath(path, fileName, ctx) {
		if (path.indexOf('file:///') === 0) {
			return this.getUriForAbsolutePath(path);
		} else if (path.indexOf('file://') === 0) {
			return this.getUriForAssetPath(path, fileName, ctx);
		} else if (path.indexOf('base64:') === 0) {
			return this.getUriForBase64Content(path, fileName, ctx);
		} else {
			if (path.indexOf(ctx.getPackageName()) > -1) {
				return this.getUriForAssetPath(path, fileName, ctx);
			} else {
				return this.getUriForAbsolutePath(path);
			}
		}
	}

	private getUriForAbsolutePath(path) {
		let absPath = path.replace('file://', '');
		let file = new java.io.File(absPath);

		if (!file.exists()) {
			console.log('File not found: ' + file.getAbsolutePath());
			return null;
		} else {
			return android.net.Uri.fromFile(file);
		}
	}

	private getUriForAssetPath(path, fileName, ctx) {
		path = path.replace('file://', '/');

		if (!File.exists(path)) {
			console.log('File does not exist: ' + path);
			return null;
		}

		let localFile = File.fromPath(path);
		let localFileContents = localFile.readSync(function (e) {
			console.log(e);
		});
		let cacheFileName = this.writeBytesToFile(ctx, fileName, localFileContents);

		if (cacheFileName.indexOf('file://') === -1) {
			cacheFileName = 'file://' + cacheFileName;
		}

		return android.net.Uri.parse(cacheFileName);
	}

	private getUriForBase64Content(path, fileName, ctx) {
		let resData = path.substring(path.indexOf('://') + 3);
		let bytes;

		try {
			bytes = android.util.Base64.decode(resData, 0);
		} catch (ex) {
			console.log('Invalid Base64 string: ' + resData);
			return android.net.Uri.EMPTY;
		}

		let cacheFileName = this.writeBytesToFile(ctx, fileName, bytes);

		return android.net.Uri.parse(cacheFileName);
	}

	private writeBytesToFile(ctx, fileName, contents) {
		let dir = ctx.getExternalCacheDir();

		if (dir === null) {
			console.log('Missing external cache dir');
			return null;
		}

		let storage = dir.toString() + '/filecomposer';
		let cacheFileName = storage + '/' + fileName;
		let toFile = File.fromPath(cacheFileName);

		toFile.writeSync(contents, function (e) {
			console.log(e);
		});

		if (cacheFileName.indexOf('file://') === -1) {
			cacheFileName = 'file://' + cacheFileName;
		}

		return cacheFileName;
	}
}
