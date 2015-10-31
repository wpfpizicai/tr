var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
    del = require('del'),
    //rename = require("gulp-rename-plus"),
	notify = require('gulp-notify');

gulp.task('img',function() {
	var img_src = './www/resource/simg/*';
  var img_des = './www/resource/img';
	return gulp.src(img_src)
		.pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(img_des));
});
gulp.task('css', function() {
	return gulp.src('./www/resource/scss/pages/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('./www/resource/css'))
		.pipe(notify({ message: 'SCSS编译完成' }));
});

gulp.task('clean', function(cb) {
    del(['./www/resource/img/*'], cb)
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./www/resource/scss/**/*.scss', ['css']);
});


//gulp.task('change_file_name',function(){
//    return gulp.src('./App/View/**/*.html')
//        .pipe(rename({suffix : 'ejs'}))
//        .pipe(gulp.dest("./output"));
//});

gulp.task('default',['clean'], function() {
  return gulp.start('img','css')
});