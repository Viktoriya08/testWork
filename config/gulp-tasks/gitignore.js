import { existsSync, appendFile } from 'node:fs';
import { writeFile } from 'node:fs/promises';

export const gitignore = () => {
  if (!existsSync('.gitignore')) {
    writeFile('./.gitignore', '').then(() => {
      const ignoreFiles = [
        'phpmailer/\r\n',
        'package-lock.json\r\n',
        'node_modules/\r\n',
        'dist/\r\n',
        '.idea\r\n',
        'version.json\r\n',
        '**/*.zip\r\n',
        '**/*.zip\r\n',
        '**/*.rar\r\n',
      ].join('');

      appendFile('./.gitignore', ignoreFiles, () => {});
    });
  }
  return app.gulp.src(`${app.path.srcFolder}`);
};
