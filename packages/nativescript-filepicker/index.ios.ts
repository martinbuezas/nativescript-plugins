import { FilepickerCommon } from './common';
import { FilepickerOptions } from '.';

export class Filepicker extends FilepickerCommon {
  static requestPermissions(): Promise<void> {
    return Promise.reject("Not implemented");
	}

  static pickFile(opts: FilepickerOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      reject("Not implemented");
    });
  }

  static listFiles(dir: string): void {
    console.log("Not implemented");
  }
}
