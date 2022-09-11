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
import svgo from 'gulp-svgo';

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
    .pipe(htmlmin({collapseWhitespace: true }))
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

export const copyimages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
}
// WEB-P 
export const wepP = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoos({webp:{}}))
  .pipe(gulp.dest('build/img'))
}
// svg
export const svgOpt = () => {
  return gulp.src('source/img/*.svg')
  .pipe (svgo())
  .pipe (gulp.dest('build/img'))
}
// Server

const server = (done) => {
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

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  html, styles, server, watcher, js, optimazeimages, copyimages, wepP, svgOpt
);
