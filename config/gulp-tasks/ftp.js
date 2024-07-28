import vinylFTP from 'vinyl-ftp';
import { configFTP } from '../gulp-settings.js';

const serverConnection = vinylFTP.create(configFTP.server);
const htmlBoxConnection = vinylFTP.create(configFTP.html);

export const deployAll = () => {
  let destTask;
  let connection;
  if (app.isFTPHtml) {
    connection = htmlBoxConnection;
    destTask = connection.dest(`/${app.path.ftp.html}`);
  } else if (app.isFTPServer) {
    connection = serverConnection;
    destTask = connection.dest(`/${app.path.ftp.server}`);
  }
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(destTask);
};

export const deployJS = () => {
  let destTask;
  let connection;
  if (app.isFTPHtml) {
    connection = htmlBoxConnection;
    destTask = connection.dest(`/${app.path.ftp.html}`);
  } else if (app.isFTPServer) {
    connection = serverConnection;
    destTask = connection.dest(`/${app.path.ftp.server}`);
  }

  return app.gulp
    .src(`${app.path.build.scripts}/**/*.js`, { since: app.gulp.lastRun('deployJS') })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(destTask);
};

export const deployCSS = () => {
  let destTask;
  let connection;
  if (app.isFTPHtml) {
    connection = htmlBoxConnection;
    destTask = connection.dest(`/${app.path.ftp.html}`);
  } else if (app.isFTPServer) {
    connection = serverConnection;
    destTask = connection.dest(`/${app.path.ftp.server}`);
  }

  return app.gulp
    .src(`${app.path.build.styles}/**/*.css`, { since: app.gulp.lastRun('deployCSS') })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(destTask);
};

export const deployIMG = () => {
  let destTask;
  let connection;
  if (app.isFTPHtml) {
    connection = htmlBoxConnection;
    destTask = connection.dest(`/${app.path.ftp.html}`);
  } else if (app.isFTPServer) {
    connection = serverConnection;
    destTask = connection.dest(`/${app.path.ftp.server}`);
  }

  return app.gulp
    .src(`${app.path.build.images}/**/*.*`, { since: app.gulp.lastRun('deployIMG') })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(destTask);
};
