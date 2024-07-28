// Импорт основного модуля
import gulp from 'gulp';
// Импорт общих плагинов
import { plugins } from './config/gulp-plugins.js';
// Импорт путей
import { path } from './config/gulp-settings.js';

// Импорт задач
import { reset } from './config/gulp-tasks/reset.js';
import { images } from './config/gulp-tasks/images.js';
import { sprite } from './config/gulp-tasks/sprite.js';
import {
  otfToTtf, ttfToWoff, moveFonts, fontsStyle,
} from './config/gulp-tasks/fonts.js';
import {
  deployAll, deployJS, deployCSS, deployIMG,
} from './config/gulp-tasks/ftp.js';
import { pathsRewrite } from './config/gulp-tasks/pathsRewrite.js';

// Передаем значения в глобальную переменную
global.app = {
  isWebP: !process.argv.includes('--nowebp'),
  isFTPHtml: process.argv.includes('--ftpHtml'),
  isFTPServer: process.argv.includes('--ftpServer'),
  isFontsReW: process.argv.includes('--rewrite'),
  gulp,
  path,
  plugins,
};

const localWatch = () => {
  gulp.watch(app.path.assets.images, gulp.series(images));
  gulp.watch(app.path.assets.fonts, gulp.series(fontsStyle, moveFonts));
};

const remoteWatch = () => {
  gulp.watch(`${app.path.build.images}**/*.*`, gulp.series(deployIMG));
  gulp.watch(`${app.path.build.scripts}**/*.*`, gulp.series(deployJS));
  gulp.watch(`${app.path.build.styles}**/*.*`, gulp.series(deployCSS));
};

gulp.task('viteDev', function() {
	const packageManager = process.env.npm_config_user_agent.split('/')[0]
	return app.plugins.run(`${packageManager || 'npm'} run _viteDev`, {
		verbosity: 3
	}).exec();
});

gulp.task('viteBuild', function() {
	const packageManager = process.env.npm_config_user_agent.split('/')[0]
	return app.plugins.run(`${packageManager || 'npm'} run _viteBuild`, {
		verbosity: 3
	}).exec();
});

const fonts = gulp.series(otfToTtf, ttfToWoff, moveFonts, fontsStyle);
const dev = gulp.series(reset, gulp.parallel(fonts, images), gulp.parallel('viteDev', localWatch));
const build = gulp.series(reset, gulp.parallel(fonts, images, 'viteBuild'), pathsRewrite);
const deployHTML = gulp.series(build, deployAll);
const serverDev = gulp.series(reset, fonts, gulp.parallel(fonts, images, 'viteBuild'), pathsRewrite, remoteWatch);

// Экспорт задач
export {
  fonts, sprite, deployAll, images,
};

// Экспорт сценариев
export { dev, build, deployHTML };

gulp.task('default', dev);
