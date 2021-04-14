const gulp = require('gulp');
const sourceMaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const browserify = require('browserify');
const css = require('browserify-css');
const tsify = require('tsify');
const reactify = require('reactify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tsProject = ts.createProject('tsconfig.json');

function bundleReact() {
    let b = browserify({
        entries: ['./src/client/src/index.tsx'],
        transform: [reactify, css], // Use reactify and require css
        debug: true,
    });
    return b
        .plugin(tsify) // Transpiles ts
        .bundle() // Bundles all packages
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourceMaps.init())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('./build/public'));
}

function copyPublic() {
    return gulp.src('./src/client/public/**/*').pipe(gulp.dest('./build/public'));
}

function bundleExpress() {
    return gulp.src('./src/server/**/*').pipe(tsProject()).pipe(gulp.dest('./build'));
}

function copyJson() {
    return gulp.src('./src/server/files/*.json').pipe(gulp.dest('./build/files'));
}

function copyEnv() {
    return gulp.src('./.env').pipe(gulp.dest('./build'));
}

const frontend = gulp.series(bundleReact, copyPublic);
const backend = gulp.series(bundleExpress, copyJson, copyEnv);
const build = gulp.series(frontend, backend);

function watch() {
    gulp.watch('./src/server/**/*', { ignoreInitial: false, delay: 500 }, backend);
    gulp.watch('./src/client/**/*', { ignoreInitial: false, delay: 500 }, frontend);
}

exports.build = build;
exports.watch = watch;
