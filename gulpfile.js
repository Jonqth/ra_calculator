var gulp = require('gulp'),
		filter = require('gulp-filter'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		uglifyES = require('gulp-uglify-es').default,
		sass = require ('gulp-sass'),
		notify = require('gulp-notify'),
		svgo = require('gulp-svgo'),
		babel = require('gulp-babel'),
		imagemin = require('gulp-imagemin'),
		bower_files = require('main-bower-files');

var config = {
	styles_path:   'styles',
	js_path:       'scripts',
	img_path:      'assets/images',
  font_path:     'assets/fonts',
	bower_path:  	 'bower_components',
	ouput_path:    'public',
}

/**
  * @desc compiles hand coded scripts from scripts folder
  * @param none
  * @return concat file main.js into public/js
  * @note use uglify if by any chance you want a compressed output
*/
gulp.task('scripts', function() {
	return gulp.src(config.js_path+'/*')
		.pipe(filter('**/*.js'))
		.pipe(babel({ minified: true }))
		.pipe(uglifyES())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(config.ouput_path + '/js'));
});

/**
  * @desc compiles vendors from bower_components folder
  * @param none
  * @return concat compressed file vendors.js into public/js`
*/
gulp.task('vendors', function() {
	return gulp.src(bower_files())
		.pipe(filter('**/*.js'))
		.pipe(uglifyES())
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest(config.ouput_path + '/js'));
});

/**
  * @desc compiles vendors and hand coded scss & css files
  * @param none
  * @return concat compressed file main.css into public/css
*/
gulp.task('css', function() {
	return gulp.src(bower_files().concat(config.styles_path + '/main.scss'))
		.pipe(filter(['**/*.scss', '**/*.css']))
		.pipe(sass({
			outputStyle: 'compressed', //at least nested || expanded
			includePaths: [config.styles_path]
		}).on('error', sass.logError))
		.pipe(concat('main.css'))
		.pipe(autoprefixer())
		.pipe(gulp.dest(config.ouput_path + '/css'));
});

/**
  * @desc compiles svg files from assets
  * @param none
  * @return cleaned and compressed svg files to public/assets/images
*/
gulp.task('svg', function(){
	return gulp.src(config.img_path+'/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest(config.ouput_path +'/assets/images'));
});

/**
  * @desc compiles pngs & jpgs files from assets
  * @param none
  * @return optimized pngs & jpgs files to public/assets/images
*/
gulp.task('img', function(){
	return gulp.src([config.img_path+'/*.png',
									 config.img_path+'/*.jpg'])
        .pipe(imagemin())
        .pipe(gulp.dest(config.ouput_path +'/assets/images'));
});

/**
  * @desc compiles standard font files formats from assets
  * @param none
  * @return standard font files formats files to public/assets/fonts
*/
gulp.task('fonts', function(){
  return gulp.src([config.font_path + '/*.eot',
									 config.font_path + '/*.svg',
								 	 config.font_path + '/*.ttf',
								 	 config.font_path + '/*.woff',
								 	 config.font_path + '/*.woff2'])
         .pipe(gulp.dest(config.ouput_path + '/assets/fonts'));
})


gulp.task('watch', function(){
	gulp.watch([config.styles_path 	+ '/**/*.scss',
							config.styles_path 	+ '/**/*.sass',
							config.styles_path	+ '/**/*.css',
							config.bower_path 	+ '/**/*.scss',
							config.bower_path 	+ '/**/*.sass',
							config.bower_path 	+ '/**/*.css'], ['css']);

	gulp.watch([config.bower_path 	+ '/**/*.js'], ['vendors']);
	gulp.watch([config.js_path 			+ '/**/*.js'], ['scripts']);

	gulp.watch([config.img_path 		+ '/*.png',
							config.img_path 		+ '/*.jpg'], ['img']);
	gulp.watch([config.img_path 		+ '/*.svg'], ['svg']);

	notify('Up to date');
})

gulp.task('default', ['scripts', 'vendors', 'css', 'svg', 'img', 'fonts']);
