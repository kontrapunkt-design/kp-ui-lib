'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  let dest = path.join(taskTarget, dirs.videos.replace(/^_/, ''));

  // Copy
  gulp.task('videos', () => {
    return gulp.src([
        path.join(dirs.source, dirs.videos, '**/*.{jpg,png,gif,mp3,mp4,ogg,webm}')
      ])
      .pipe(plugins.rename(function(filepath) {
        // Remove 'source' directory as well as prefixed folder underscores
        filepath.dirname = filepath.dirname.replace(dirs.source, '').replace('_', '');
      }))
      .pipe(gulp.dest(dest));
  });
}
