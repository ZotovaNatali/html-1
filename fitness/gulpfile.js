import gulp from 'gulp';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';

import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import copyAssets from 'postcss-copy-assets';
import csso from 'postcss-csso';

import rename from 'gulp-rename';
// import terser from 'gulp-terser';
// import concat from 'gulp-concat';

// import htmlmin from 'gulp-htmlmin';
import posthtml from 'gulp-posthtml';
import include from 'posthtml-include';

import squoosh from 'gulp-libsquoosh';
// import webp from 'gulp-webp';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';

import del from 'del';

import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';

import browser from 'browser-sync';


// Styles
export const styles = () => {
  return gulp.src('source/sass/style.scss', {
    sourcemaps: true
  })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      grid: true,
    })]))
    .pipe(postcss([copyAssets({ base: 'build' })], { to: 'build/css/style.css' }))
    .pipe(gcmq())// выключите, если в проект импортятся шрифты через ссылку на внешний источник
    .pipe(gulp.dest('build/css'))
    .pipe(postcss([csso()]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', {
      sourcemaps: '.'
    }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('build'));
}

// Scripts

// const scripts = () => {
//   return gulp.src(['source/js/modules/*.js', '!source/**/_*.*'], {
//     sourcemaps: true,
//   })
//     // .pipe(terser())
//     .pipe(concat('script.js'))
//     .pipe(gulp.dest('build/js', {
//       sourcemaps: '.',
//     }))
//     .pipe(browser.stream());
// }

const scripts = () => {
  return gulp.src(['source/js/script.js'])
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('build/js'))
};

// Images

export const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(newer('build/img'))
    .pipe(squoosh({
      oxipng: { level: 3 },
      mozjpeg: { quality: 75, progressive: true }
    }))
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,webp}')
    .pipe(newer('build/img'))
    .pipe(gulp.dest('build/img'))
}

// WebP

// export const createWebp = () => {
//   return gulp.src('source/img/**/*.{png,jpg}')
//     .pipe(squoosh({
//       encodeOptions: {
//         webp: {},
//       },
//     }))
//     .pipe(gulp.dest('build/img'))
// }

// Используйте отличное от дефолтного значение root, если нужно обработать отдельную папку в img,
// а не все изображения в img во всех папках.
// root = '' - по дефолту webp добавляются и обновляются во всех папках в source/img/
// root = 'content/' - webp добавляются и обновляются только в source/img/content/
export const createWebp = () => {
  const root = '';
  return gulp.src(`source/img/${root}**/*.{png,jpg}`)
    .pipe(squoosh({
      encodeOptions: {
        webp: { quality: 90 },
      },
    }))
    .pipe(gulp.dest(`build/img/${root}`));
}

// SVG

export const svg = () => {
  return gulp.src('source/img/svg/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img/svg'));
}

export const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Copy

export const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}


// Clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    notify: false,
    open: true,
    cors: true,
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
  gulp.watch('source/js/**/*.js', gulp.series(scripts, reload));
  gulp.watch('source/**/*.html', gulp.series(html, reload));
  // gulp.watch('source/img/**/*.{jpg,png}', gulp.series(optimizeImages, createWebp, reload));
  gulp.watch('source/img/**/*.{jpg,png}', gulp.series(createWebp, copyImages, reload));
  gulp.watch('source/img/svg/*.svg', gulp.series(svg, reload));
  gulp.watch('source/img/sprite/*.svg', gulp.series(sprite, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  createWebp,
  // optimizeImages,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite
  ),
);

// Default

export const start = gulp.series(build, server, watcher);
