
import DownloadInfoExporter from './downloadInfoExporter';

test('Should return JSON', () => {
  expect(new DownloadInfoExporter().exportForDirectory('./dist')).toBeDefined();
});