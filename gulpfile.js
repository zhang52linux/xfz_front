var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
sass.compiler = require('node-sass');
var bs = require("browser-sync");
var util = require("gulp-util");


// 便于文件的位置修改时，进行快速修改
var path = {
    'css': './src/css/**/',
    'js': './src/js/**/',
    'image': './src/images/',
    'css_dest': './dest/css/',
    'js_dest': './dest/js/',
    'image_dest': './dest/images/',
}

// test
gulp.task("greet",function() {
   console.log(path.css_dest);
})

// 处理css文件压缩
gulp.task("css",function() {
   gulp.src(path.css + '*.css')
       .pipe(cssnano())
       .pipe(gulp.dest(path.css_dest))
});

// 批量压缩css文件
gulp.task("concat_css",function () {
    gulp.src([
        path.css + 'base.css',
        path.css + 'nav.css',
    ])
       .pipe(concat("nav.min.css"))
       .pipe(cssnano())
       .pipe(gulp.dest(path.css_dest))
})

// 自动刷新浏览器
gulp.task("bs",function () {
    bs.init({
        'server': {
            'baseDir': './templates/'
        }
    });
});

// 处理js文件压缩
gulp.task("js",function () {
   return gulp.src(path.js + '*.js')
               .pipe(uglify())
               .pipe(rename({"suffix":".min"}))
               .pipe(gulp.dest(path.js_dest))
               .pipe(bs.stream())
});

// 处理sass的任务 
gulp.task('sass', function () {
  return gulp.src(path.css + '*.scss')        //选择源文件
            .pipe(sass().on('error', util.log))  //转化为css文件
            .pipe(cssnano())                          //进行css文件的压缩
            .pipe(rename({"suffix":".min"}))          //修改压缩后的文件名
            .pipe(gulp.dest(path.css_dest))           //选择目标文件
            .pipe(bs.stream())
});

// 定义一个监听的任务
gulp.task('watch:sass', function () {
   gulp.watch(path.css + '*.scss', gulp.series('sass'));
});

gulp.task('watch:js',function () {
    gulp.watch(path.js + '*.js', gulp.series('js'));
})

// 执行gulp server开启服务器
gulp.task("server:sass",gulp.series('watch:sass'))
gulp.task("server:js",gulp.series('watch:js'))



