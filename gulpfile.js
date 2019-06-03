/*
	Tasks:

	$ gulp 			: Runs "css" and "js" tasks
	$ gulp watch	: Starts a watch on "css" and "js" tasks
*/

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const typescript = require('gulp-typescript');
const webpack = require('webpack-stream');

const inputDir = 'src';
const outputDir = 'dist';

exports.css = css = () => {
    return gulp
        .src(inputDir + '/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['> 5%', 'last 5 versions']))
        .pipe(cleancss())
        .pipe(gulp.dest(outputDir));
};

// Transpile all TS files to JS.
const JStranspile = cb => {
    return gulp
        .src(inputDir + '/**/*.ts')
        .pipe(
            typescript({
                target: 'es6',
                module: 'es6'
            })
        )
        .pipe(gulp.dest(outputDir));
};

// Pack the files.
const JSpack = () => {
    return gulp
        .src(inputDir + '/mhead.js')
        .pipe(
            webpack({
                // mode: 'development',
                mode: 'production',
                output: {
                    filename: 'mhead.js'
                }
                // optimization: {
                //     minimize: false
                // }
            })
        )
        .pipe(gulp.dest(outputDir));
};

exports.js = js = gulp.series(JStranspile, JSpack);
exports.default = gulp.parallel(js, css);

exports.watch = cb => {
    gulp.watch('src/**/*.ts', js);
    gulp.watch('src/**/*.scss', css);
    cb();
};
