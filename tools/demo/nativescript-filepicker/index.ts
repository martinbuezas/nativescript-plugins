import { Filepicker } from '@martinbuezas/nativescript-filepicker';
import { DemoSharedBase } from '../utils';

export class DemoSharedNativescriptFilepicker extends DemoSharedBase {
  requestPermissions() {
    Filepicker.requestPermissions()
      .then((result) => {
        console.log("Permissions request:", result);
      })
      .catch((error) => console.log("Picker error:", error));
  }

  pickImage() {
    Filepicker.pickFile({ type: "image/*" })
      .then((filepath: string) => {
        console.log("Picked image:", filepath);
      })
      .catch((error) => console.log("Picker error:", error));
  }

  pickPdf() {
    Filepicker.pickFile({ type: "application/pdf" })
      .then((filepath: string) => {
        console.log("Picked PDF:", filepath);
      })
      .catch((error) => console.log("Picker error:", error));
  }

  listFiles(args) {
    const dir = args.object.dir;
    Filepicker.listFiles(dir);
  }
}
