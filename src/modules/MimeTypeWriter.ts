/**
 * Author: Martin Orbanz
 */
export default class MimeTypeWriter {

  /**
   * Returns am MIME type string according to a passed file name.
   * 
   * @param name A file name or path assumed to end in a .* extension
   */
  static getTypeFor(name: string | undefined = ''): string {
    let extension = name.split('.').pop()?.toLowerCase(),
        returnType: string ;

    switch (extension) {
      case 'bin':
        returnType = 'application/octet-stream';
        break;

      case 'css':
        returnType = 'text/css';
        break;

      case 'csv':
        returnType = 'text/csv';
        break;

      case 'gif':
        returnType = 'image/gif';
        break;

      case 'html':
        returnType = 'text/html';
        break;

      case 'jpg':
      case 'jpeg':
        returnType = 'image/jpeg';
        break;

      case 'js':
        returnType = 'text/javascript';
        break;

      case 'json':
        returnType = 'application/json';
        break;

      case 'mp3':
        returnType = 'audio/mpeg';
        break;

      case 'mp4':
        returnType = 'video/mp4';
        break;

      case 'png':
        returnType = 'image/png';
        break;

      case 'pdf':
        returnType = 'application/pdf';
        break;

      case 'svg':
        returnType = 'image/svg+xml';
        break;

      case 'txt':
        returnType = 'text/plain';
        break;

      case 'xml':
        returnType = 'application/xml';
        break;

      case 'zip':
        returnType = 'application/zip';
        break;

      default:
        returnType = '';

    }

    return returnType;
  }

  constructor() { }

}