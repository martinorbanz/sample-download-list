/**
 * Entry point for demonstrating the DownloadInfoExporter and 
 * MimeTypeWriter classes.
 */

import DownloadInfoExporter from './modules/downloadInfoExporter';

const exporter: DownloadInfoExporter = new DownloadInfoExporter();

// * Change to any dir path you like:
const targetDir: string = './dist';

// * Usage:
exporter.exportForDirectory(targetDir)
.then(
  (result) => {
    console.log(result);
  },
  (reason) => {
    console.log(reason);
  }
);
// * timeout to demonstrate async execution
setTimeout(() => {console.log('timeout')}, 0);