import { Application } from "@nativescript/core";

export class UriHelper {
	public static getFileUri(uri: android.net.Uri) {
    if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.KITKAT) {
      console.log("SDK < 19 (KitKat) are not supported");
      return null;
    }

    if (!android.provider.DocumentsContract.isDocumentUri(Application.android.context, uri)) {
      console.log("The given URI does not represent a Document backed by a DocumentsProvider.");
      return null;

      // if ('content' === uri.getScheme()) {
      //   // MediaStore (and general)
			// 	return UriHelper.getDataColumn(uri, null, null, false);
			// } else if ('file' === uri.getScheme()) {
      //   // FILE
			// 	return uri.getPath();
			// }
    }

    let docId, id, type;
    let contentUri: android.net.Uri;

    // ExternalStorageProvider
    if (UriHelper.isExternalStorageDocument(uri)) {
      console.log("Provider: External Storage");

      docId = android.provider.DocumentsContract.getDocumentId(uri);
      id = docId.split(':')[1];
      type = docId.split(':')[0];

      if ('primary' === type.toLowerCase()) {
        console.log("primary");
        return android.os.Environment.getExternalStorageDirectory() + '/' + id;
      } else {
        console.log("alternative");
        if (android.os.Build.VERSION.SDK_INT > 23) {
          (this.getContentResolver() as any).takePersistableUriPermission(uri, android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION | android.content.Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
          const externalMediaDirs = Application.android.context.getExternalMediaDirs();
          if (externalMediaDirs.length > 1) {
            let filePath = externalMediaDirs[1].getAbsolutePath();
            filePath = filePath.substring(0, filePath.indexOf('Android')) + id;
            return filePath;
          }
        }
      }
    }

    // DownloadsProvider
    else if (UriHelper.isDownloadsDocument(uri)) {
      console.log("Provider: Downloads");
      return UriHelper.getDataColumn(uri, null, null);
    }

    // MediaProvider
    else if (UriHelper.isMediaDocument(uri)) {
      console.log("Provider: Media");

      docId = android.provider.DocumentsContract.getDocumentId(uri);
      type  = docId.split(':')[0];
      id    = docId.split(':')[1];

      console.log("Document ID:", docId)

      if ('image' === type) {
        contentUri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
      } else if ('video' === type) {
        contentUri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
      } else if ('audio' === type) {
        contentUri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
      } else {
        contentUri = android.provider.MediaStore.Downloads.EXTERNAL_CONTENT_URI;
      }

      let selection = '_id=?';
      let selectionArgs = [id];

      return UriHelper.getDataColumn(contentUri, selection, selectionArgs);
    }
	}

  private static getDataColumn(uri: android.net.Uri, selection, selectionArgs): string {
    let cursor;
    const columns = ["_data"];
    // const columns = [android.provider.MediaStore.Files.FileColumns.DATA];

    try {
      cursor = this.getContentResolver().query(uri, columns, selection, selectionArgs, null);
      if (cursor != null && cursor.moveToFirst()) {
        const index = cursor.getColumnIndexOrThrow(columns[0]);
        return cursor.getString(index);
      } else {
        console.log(!cursor ? "Cursor is NULL" : "Cursor has no results");
      }
    } finally {
      if (cursor != null) {
        cursor.close();
      }
    }

    return null;
  }

  // AUTHORITIES

	private static isExternalStorageDocument(uri: android.net.Uri) {
		return 'com.android.externalstorage.documents' === uri.getAuthority();
	}

  /**
   * Whether the Uri authority is DownloadsProvider
   */
	private static isDownloadsDocument(uri: android.net.Uri) {
		return 'com.android.providers.downloads.documents' === uri.getAuthority();
	}

  /**
   * Whether the Uri authority is MediaProvider
   */
	private static isMediaDocument(uri: android.net.Uri) {
		return 'com.android.providers.media.documents' === uri.getAuthority();
	}

  /**
   * Whether the Uri authority is Google Photos
   */
   private static isGooglePhotosUri(uri: android.net.Uri): boolean {
    return 'com.google.android.apps.photos.content' === uri.getAuthority();
  }

  // HELPERS

  private static getContentResolver(): android.content.ContentResolver {
		return Application.android.nativeApp.getContentResolver();
	}
}
