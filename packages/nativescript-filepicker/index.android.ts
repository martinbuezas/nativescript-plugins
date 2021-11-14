import { AndroidApplication, Application, Utils } from '@nativescript/core';
import { FilepickerCommon } from './common';
import { FilepickerOptions } from '.';
import * as permissions from 'nativescript-permissions';
// import { UriHelper } from './uri-helper';

declare const org, java;
const REQUESTCODE_OPEN_FILE = 1;

export class Filepicker extends FilepickerCommon {
  static requestPermissions(): Promise<void> {
		if (android.os.Build.VERSION.SDK_INT >= 23) {
			return permissions.requestPermission([
        android.Manifest.permission.READ_EXTERNAL_STORAGE
      ]);
		} else {
			return Promise.resolve();
		}
	}

  static pickFile(opts: FilepickerOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      // CREATE INTENT
      let chooseFile;
      // chooseFile = new android.content.Intent(android.content.Intent.ACTION_GET_CONTENT);
      chooseFile = new android.content.Intent(android.content.Intent.ACTION_OPEN_DOCUMENT);
      chooseFile.addCategory(android.content.Intent.CATEGORY_OPENABLE);
      chooseFile.setType(opts.type);
      chooseFile = android.content.Intent.createChooser(chooseFile, "Choose a file");

      // START ACTIVITY
      const curActivity = (Application.android.foregroundActivity || Application.android.startActivity);
      curActivity.startActivityForResult(chooseFile, REQUESTCODE_OPEN_FILE);

      // HANDLE ACTIVITY RESULT
      const onResult = (args: any) => {
        const requestCode = args.requestCode;
        const resultCode = args.resultCode;
        const data = args.intent;

        Application.android.off(AndroidApplication.activityResultEvent, onResult);

        if (requestCode !== REQUESTCODE_OPEN_FILE || resultCode !== android.app.Activity.RESULT_OK) {
          if (resultCode === android.app.Activity.RESULT_CANCELED) {
            return resolve(null);
          }

          return reject(`Picker error: Request code: ${requestCode}. Result code: ${resultCode}`);
        }

        try {
          const uri = data.getData();
          // const metadata = this.getMetadata(uri);
          // const filepath = UriHelper.getFileUri(uri);

          // OPEN FILE DESCRIPTOR
          let parcelFileDescriptor;
          let fileDescriptor;
          try {
            parcelFileDescriptor = this.getContentResolver().openFileDescriptor(uri, "r");
            fileDescriptor = parcelFileDescriptor.getFileDescriptor();
            // console.log("File Descriptor Valid:", fileDescriptor.valid());
          } catch (error) {
            Application.android.off(AndroidApplication.activityResultEvent, onResult);
            return reject(error);
          }

          // COPY FILE
          const unixtime = (new Date).getTime();
          const dstDir = Utils.android.getApplicationContext().getExternalFilesDir(null);
          const dstFilepath = dstDir.getAbsolutePath() + `/${unixtime}.pdf`;
          const dstFile = new java.io.File(dstFilepath);
          const source = new java.io.FileInputStream(fileDescriptor);
          const target = new java.io.FileOutputStream(dstFile);

          org.nativescript.plugins.martinbuezas.filepicker.Utils.copy(source, target);

          resolve(dstFilepath);
        } catch (error) {
          reject(error);
        }
      };

      Application.android.on(AndroidApplication.activityResultEvent, onResult);
    });
  }

  static listFiles(dir: string): void {
    const context = Utils.android.getApplicationContext();
    let directory: java.io.File;

    if (dir === "internal_files") {
      directory = context.getFilesDir();
    } else if (dir === "internal_cache") {
      directory = context.getCacheDir();
    } else if (dir === "external_files") {
      directory = context.getExternalFilesDir(null);
    } else if (dir === "external_cache") {
      directory = context.getExternalCacheDir();
    } else {
      console.log("Invalid directory:", dir);
      return;
    }

    const files: androidNative.Array<java.io.File> = directory.listFiles();

    console.log("")
    console.log(`List ${dir}:`, {
      item_count: files.length,
      dir_path: directory.getAbsolutePath()
    })

    for (let i = 0; i < files.length; i++) {
      const file: java.io.File = files[i];

      console.log(`File ${i}:`, {
        isDir: file.isDirectory(),
        filename: file.getName(),
        filesize: file.length(),
        abspath: file.getAbsolutePath(),
      });
    }
  }

  private static getContentResolver(): android.content.ContentResolver {
		return Application.android.nativeApp.getContentResolver();
	}

  /*
  private static getInfo() {
    console.log("External storage state:", android.os.Environment.getExternalStorageState());
    console.log("Is emulated:", android.os.Environment.isExternalStorageEmulated());
    console.log("Is removable:", android.os.Environment.isExternalStorageRemovable());
  }

  private static getMetadata(uri: android.net.Uri): any {
    let cursor: android.database.Cursor;
    try {
      cursor = this.getContentResolver().query(uri, null, null, null, null);

      if (cursor != null && cursor.moveToFirst()) {
        const filenameIx = cursor.getColumnIndex(android.provider.OpenableColumns.DISPLAY_NAME);
        const filesizeIx = cursor.getColumnIndex(android.provider.OpenableColumns.SIZE);

        const metadata: any = {
          mime: this.getContentResolver().getType(uri),
          filename: cursor.getString(filenameIx),
          filsize: cursor.getLong(filesizeIx)
        }
        return metadata;
      } else {
        console.log(!cursor ? "Cursor is NULL" : "Cursor has no results");
        return null;
      }
    } catch (error) {
      console.log("Error:", error);
      return null;
    } finally {
      if (cursor != null) {
        cursor.close();
      }
    }
  }
  */
}
