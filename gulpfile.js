const gulp = require('gulp')

// 根据环境引入不同的配置文件
let buildConfig
if (process.env.NODE_ENV === 'dev') {
  buildConfig = require('./build/gulp.dev')
  // gulp.task('server', buildConfig.server);  // 本地服务
} else {
  buildConfig = require('./build/gulp.prod')
  // gulp.task('md5', gulp.series(buildConfig.md5Css, buildConfig.md5Js));
  gulp.task('clean', buildConfig.clean) // 清理目录
}

// gulp.task('html', buildConfig.html);      // 打包html
gulp.task('js', buildConfig.js) // 打包js
gulp.task('css', buildConfig.css) // 打包css
gulp.task('images', buildConfig.image) // 打包image
// gulp.task('sources', gulp.series('html', gulp.parallel('js', 'css', 'images')));
gulp.task('sources', gulp.series('css', gulp.parallel('js', 'images')))

// 监听文件变化
gulp.task('watch', async () => {
  // gulp.watch('src/views/*', gulp.series('html')); // 监听 HTML 变化
  gulp.watch('src/core/**/*', gulp.series('js')) // 监听 js 变化
  gulp.watch('src/scss/**/*', gulp.series('css')) // 监听 scss 变化
  gulp.watch('src/images/**/*', gulp.series('images')) // 监听 image 变化
})

// build
if (process.env.NODE_ENV === 'dev') {
  gulp.task('dev', gulp.series('sources', 'watch'))
} else {
  gulp.task('build', gulp.series('sources'))
}
