import { DemoSharedBase } from '../utils';
import { ShareFile } from '@martinbuezas/nativescript-share-file';
import { knownFolders, path, File } from '@nativescript/core';

export class DemoSharedNativescriptShareFile extends DemoSharedBase {

  testIt() {
    const fileName = 'share-test.txt';
    const documents = knownFolders.documents();
    const filePath = path.join(documents.path, fileName);
    const file = File.fromPath(filePath);
    const shareFile = new ShareFile();

    file.writeText('Share this text')
      .then(() => {
          shareFile.open({
            path: filePath,
            intentTitle: 'Open text file with:',
            rect: {
              x: 110,
              y: 110,
              width: 0,
              height: 0
            },
            options: true,
            animated: true
          });
      })
      .catch(error => {
        console.log('Creating text file failed', error);
      });
  }
}