import sharpResponsive from 'gulp-sharp-responsive';

const optionsBase = {
  formats: [
    {
      pngOptions: {
        quality: 85,
      },
    },
    {
      format: 'jpeg',
      jpegOptions: {
        quality: 85,
      },
    },
  ],
};

const optionsWebP = {
  formats: [
    {
      pngOptions: {
        quality: 85,
      },
    },
    {
      format: 'jpeg',
      jpegOptions: {
        quality: 95,
      },
    },
    {
      format: 'webp',
    },
  ],
};

export const images = () => app.gulp
  .src(`${app.path.src.images}/**/*.{jpeg,jpg,png,webp,avif,heif,tiff}`)
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'IMAGES',
        message: 'Error: <%= error.message %>',
      }),
    ),
  )
  .pipe(app.plugins.if(
    !app.isWebP,
    app.plugins.newer(app.path.build.images),
  ))
  .pipe(
    app.plugins.if(
      app.isWebP,
      sharpResponsive(optionsWebP),
      sharpResponsive(optionsBase),
    ),
  )
  .pipe(app.gulp.dest(app.path.build.images))
  .pipe(app.gulp.src([`${app.path.src.images}/**/*.*`, `!${app.path.src.images}/**/*.{jpeg,jpg,png,webp,avif,heif,tiff}`]))
  .pipe(app.plugins.newer(app.path.build.images))
  .pipe(app.gulp.dest(app.path.build.images));
