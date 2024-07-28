import { deleteAsync } from 'del';

export const reset = async () => {
  await deleteAsync([`${app.path.clean}/**`, `!${app.path.clean}/img`, `!${app.path.clean}/fonts`]);
  return app.gulp.src(`${app.path.assetsFolder}`);
};
