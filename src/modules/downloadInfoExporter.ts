/**
 * Author: Martin Orbanz
 * 
 * This class compiles a JSON list of typed file descriptor objects for all 
 * files in a directory and its subtree.
 * Descriptors contain the file name, path and MIME type for AJAX requests 
 * as well as a parsed anchor tag HTML string for DOM insertion.
 */



import fs from 'fs';
import path from 'path';
import MimeTypeWriter from './MimeTypeWriter';

/**
 * TYPES
 */

type Dirent = fs.Dirent

/**
 * INTERFACES
 */

export interface DownloadInfo {
  name: string,
  path: string,
  MIMEType: string,
  link: string
}

export interface DownloadInfoCollection {
  files: DownloadInfo[]
}

export interface FileInfoExporter {
  exportForDirectory(dirPath:string): string
}

/**
 * CLASS
 */

class DownloadInfoExporter implements FileInfoExporter {

  mimeTypeWriter: MimeTypeWriter;

  constructor() {
    this.mimeTypeWriter = new MimeTypeWriter;
  }

  /**
   * Ensures the withFileTypes option is true when reading directories.
   * 
   * @param dirPath Path to directory
   */
  private readdirSyncWithTypes(dirPath: string): Dirent[] {
    return fs.readdirSync(dirPath, { withFileTypes: true })
  }

  /**
   * Returns a single DownloadInfo object based on the provided file path.
   * 
   * @param path Abosolute or relative path ending in a file name
   * @returns DownloadInfo
   */
  createDownloadInfo(path: string): DownloadInfo {
    let fileName: string | undefined = path.split('/').pop(),
      mimeType: string = MimeTypeWriter.getTypeFor(fileName);

    return {
      name: fileName || '',
      path: path,
      MIMEType: mimeType,
      link: `<a href="${path}" download="${fileName}" rel="${mimeType}">${fileName}</a>`
    }
  }

  /**
   * Collects an Array of DonwloadInfo objects for all files from a 
   * given directory. 
   * 
   * @param dirPath The relative path of the curent directory, 
   * starting with the initial root of the operation
   * @param files Content of dirPath as an Array of Dirent objects as returned 
   * by fs.readdirSync (with fileTypes)
   * @returns DownloadInfo[]
   */
  private readDirContentsRecursive = (dirPath: string, files: Dirent[]): DownloadInfo[] => {
    // * local values
    let // * the array collecting the DownloadInfo items
      dlFiles: DownloadInfo[],
      // * contents of the current Dirent if it is a directory
      subDirContents: DownloadInfo[],
      // * File info object, written if the current Dirent is not a directory
      dlInfo: DownloadInfo,
      // * slice of the files Array minus the current item
      nextFiles: DownloadInfo[],
      // * the passed dirPath + current file's name, either written to the 
      // * path property of dlInfo or passed as dirPath to the next recursion
      // * of this function
      newPath: string;

    dlFiles = [];

    // * Proceed only if there are files to processed, 
    // * otherwise return the empty dlFiles Array
    if (files.length > 0) {
      // * Set path relative to the root directory for the first file
      newPath = path.join(dirPath, files[0].name);

      if (files[0].isDirectory()) {
        // * If the first file is a directory, call a recursion and spread the 
        // * resulting array into the local dlFiles Array
        subDirContents = this.readDirContentsRecursive(newPath, this.readdirSyncWithTypes(newPath));
        dlFiles = [...dlFiles, ...subDirContents];
      } else {
        // * Store a DownloadInfo object for anything that's not a directory
        dlInfo = this.createDownloadInfo(newPath);
        dlFiles = [...dlFiles, dlInfo];
      }
      // * Remove the processed Dirent and call a recursion on the remaining list
      files = files.slice(1);
      nextFiles = this.readDirContentsRecursive(dirPath, files);
      dlFiles = [...dlFiles, ...nextFiles]
    }

    return dlFiles;
  }

  /**
   * Returns a JSON formatted list of files in the provided directory path 
   * as DownloadInfo objects.
   * 
   * @param dirPath 
   */
  exportForDirectory(dirPath: string): string {

    const rootContents: Dirent[] = this.readdirSyncWithTypes(dirPath);

    const exportData: DownloadInfoCollection = {
      files: this.readDirContentsRecursive(dirPath, rootContents)
    };

    return JSON.stringify(exportData);
  }

}

export default DownloadInfoExporter;