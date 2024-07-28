import svgSprite from 'gulp-svg-sprite';

export const sprite = () => app.gulp
  .src(app.path.src.svgicons)
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SVG',
        message: 'Error: <%= error.message %>',
      }),
    ),
  )
  .pipe(
    svgSprite({
      mode: {
        symbol: {
          sprite: '../img/icons/icons.svg',
        },
      },
      shape: {
        id: {
          separator: '',
          generator: 'svg-',
        },
        transform: [
          {
            svgo: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      inlineStyles: {
                        onlyMatchedOnce: false,
                      },
                      removeDoctype: false,
                      removeViewBox: false,
                      convertPathData: false,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      svg: {
        rootAttributes: {
          style: 'display: none;',
          'aria-hidden': true,
        },
        xmlDeclaration: false,
      },
    }),
  )
  .pipe(app.gulp.dest(`${app.path.assetsFolder}`));
