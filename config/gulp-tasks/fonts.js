import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import gulpRename from 'gulp-rename';
import { getAllFiles } from '../helpers.js';

const otfToTtf = () =>
// Ищем файлы шрифтов .otf
	 (
    app.gulp
      .src(`${app.path.assetsFolder}/fonts/**/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
    // Конвертируем в .ttf
      .pipe(
        fonter({
          formats: ['woff', 'ttf'],
        }),
      )
    // Выгружаем в исходную папку
      .pipe(
        app.gulp.dest(`${app.path.assetsFolder}/fonts/`),
      )
  );

const ttfToWoff = () =>
// Ищем файлы шрифтов .ttf
	 (
    app.gulp
      .src(`${app.path.assetsFolder}/fonts/**/*.ttf`)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
    // Конвертируем в .woff2
      .pipe(ttf2woff2())
    // Выгружаем в исходную папку
      .pipe(app.gulp.dest(`${app.path.assetsFolder}/fonts/`))
  );

// Собирает только woff и woff2
const moveFonts = () => (
  app.gulp
    .src(app.path.assets.fonts)
    .pipe(gulpRename({ dirname: '' }))
    .pipe(app.gulp.dest(app.path.build.fonts))
);

const fontsStyle = () => {
  const fontsFilePath = `${app.path.src.styles}/base/_fonts.sass`;
  let fileData;

  // Если передан флаг --rewrite удаляем файл подключения шрифтов
  if (app.isFontsReW) {
    try {
      writeFileSync(fontsFilePath, '');
    } catch (e) {
      console.log(`Не ошибка! ${app.path.src.styles}/base/_fonts.sass не был предварительно удален по причине его отсутствия`);
    }
  } else {
    // Если не передан флаг --rewrite проверяем наличие файла и создаем новый при отсутствии
    try {
      fileData = readFileSync(fontsFilePath, 'utf8');
    } catch (err) {
      writeFileSync(fontsFilePath, '');
    }
  }

  // Проверяем существуют ли файлы шрифтов
  const fontsFiles = getAllFiles(app.path.build.fonts);
  const woff2Only = fontsFiles.filter((i) => i.match(/\.woff2/gi));

  if (!woff2Only.length) return;

  const fontStyles = {
    italic: 'italic',
  };

  const fontWeights = {
    thin: 100,
    extraLight: 200,
    light: 300,
    normal: 400,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    ultrabold: 800,
    extrabold: 800,
    black: 900,
    heavy: 900,
    extrablack: 950,
  };

  for (let i = 0; i < woff2Only.length; i++) {
    const fontFileName = woff2Only[i];
    const fontFileNameRe = new RegExp(fontFileName, 'gi');

    if (fileData && fileData.match(fontFileNameRe)) {
      continue;
    }

    const clearFontName = fontFileName.replaceAll(/woff2|woff|\W|\s/gi, '');
    const fontName = Object.keys(fontStyles).concat(Object.keys(fontWeights)).reduce((resultFontName, currentValue) => {
      const re = new RegExp(`${currentValue}`, 'i');
      return resultFontName.replace(re, '');
    }, clearFontName);

    let fontWeight = 400;

    for (const weightName in fontWeights) {
      const re = new RegExp(`${weightName}`, 'i');
      if (fontFileName.match(re)) {
        fontWeight = fontWeights[weightName];
        break;
      }
    }

    let fontStyle = 'normal';

    for (const styleName in fontStyles) {
      const re = new RegExp(`${styleName}`, 'i');
      if (fontFileName.match(re)) {
        fontStyle = fontWeights[styleName];
        break;
      }
    }
    const woffName = fontFileName.replace(/woff2/i, 'woff');
    const hasWoff = fontsFiles.includes(woffName);

    appendFileSync(fontsFilePath, `@font-face\n\tfont-family: ${fontName}\n\tfont-display: swap\n\tsrc: url("../fonts/${fontFileName}") format("woff2"), ${hasWoff ? `url("../fonts/${woffName}") format("woff")` : ''}\n\tfont-weight: ${fontWeight}\n\tfont-style: ${fontStyle}\n\r\n`, (err) => {
      if (err) {
        throw Error(err);
      }
    });
  }

  return app.gulp.src(`${app.path.assetsFolder}`);
};

export {
  otfToTtf, ttfToWoff, moveFonts, fontsStyle,
};
