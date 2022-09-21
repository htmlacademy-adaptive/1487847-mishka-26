import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoos from 'gulp-libsquoosh';
import del from 'del';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';


// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}
// HTML
const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: false }))
    .pipe(gulp.dest('build'));
}
// JS
const js = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

// Images
const optimazeimages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoos())
  .pipe(gulp.dest('build/img'));
}

const copyimages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
}
// WEB-P
const wepP = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoos({webp:{}}))
  .pipe(gulp.dest('build/img'))
}
// svg
const svgOpt = () => {
  return gulp.src([ 'source/img/background-svg/*.svg',
  'source/img/img-about/*.svg',
  'source/img/img-icon/*.svg',
  'source/img/logo-svg/*.svg',
  '!source/img/svg-sprite/*.svg'
] )
  .pipe (svgo())
  .pipe (gulp.dest('build/img'))
}

const svgSprite = () => {
  return gulp.src('source/img/svg-sprite/*.svg')
  .pipe (svgo())
  .pipe (svgstore({
    inlineSvg: true
  }))
  .pipe (rename('sprite.svg'))
  .pipe (gulp.dest('build/img'))
}

// copy
const copy = (done) => {
  gulp.src ([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',]
    , {
      base: 'source'
    })
    .pipe(gulp.dest('build'))
    done();
  }
//clean
const clean = () => {
  return del('build');
};
// }
// Server

function server(done) {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
// Reload
const reload = (done) => {
  browser.reload();
  done();
}
// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html, reload));
}
//Build
export const build = gulp.series (
  clean,
  copy,
  optimazeimages,
  gulp.parallel(
    styles,
    html,
    js,
    svgOpt,
    svgSprite,
    wepP,
  ),
);
// Default
export default gulp.series (
  clean,
  copy,
  copyimages,
  gulp.parallel(
    styles,
    html,
    js,
    svgOpt,
    svgSprite,
    wepP,
  ),
  gulp.series (
    server,
    watcher
  )
);
