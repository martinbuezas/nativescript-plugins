import { FilepickerCommon } from './common';

export declare class Filepicker extends FilepickerCommon {
  static requestPermissions(): Promise<void>;
  static pickFile(opts: FilepickerOptions): Promise<string>;
  static listFiles(dir: string): void;
}

export interface FilepickerOptions {
  /**
   * Set the Mime Type of the file to pick. Can include wildcards.
   * Eg.: "application/pdf", "image/*", "* /*"
   */
  type: string;
}
