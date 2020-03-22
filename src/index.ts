/**
 * Entry point for demonstrating the DownloadInfoExporter and 
 * MimeTypeWriter classes.
 */

import DownloadInfoExporter from './modules/downloadInfoExporter';

const exporter: DownloadInfoExporter = new DownloadInfoExporter();

// * Change to any dir path you like:
const targetDir: string = './dist';

// * Usage:
console.log(exporter.exportForDirectory(targetDir));