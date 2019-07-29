const gulp = require("gulp");
// pump可以使我们更容易找到代码出错位置
const pump = require("pump");
// 用来保持输入和输出的文件名相同, 否则会自动生成一个hash
const named = require("vinyl-named");
// 打包 js
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const streamMode = require("./webpack.dev");
// 编译 sass
const Sass = require("gulp-sass");
// html 文件模块化
const FileInclude = require("gulp-file-include");
// 清理目录
const Clean = require("gulp-clean");
// 生成 sourcemap
const sourcemaps = require("gulp-sourcemaps");
// 配置文件
const config = require("./gulp.config");
const { dist } = config;

// 从Webpack检索入口点
const entry = require("./entry.config");
// 将入口点转换为数组，以便在gulp文件中定义
const entryArray = Object.values(entry);

// 重用路径
const srcPath = (file, watch = false) => {
  if (file === "js" && watch === false) return entryArray;
  console.error("在源路径的gulp任务运行程序中输入了不支持的文件类型!!!");
};

// html
// async function html () {
//   return gulp.src('src/views/*.html')
//     // HTML模板替换，具体用法见下文
//     .pipe(FileInclude({
//       prefix: '##',
//       basepath: '@file'
//     })).on('error', function (err) {
//       console.error('Task:copy-html,', err.message)
//       this.end()
//     })
//     .pipe(gulp.dest(dist)) // 拷贝
// }

// css
async function css() {
  const cssSrcArr = [
    "src/scss/*.scss",
    "src/scss/module/**/*.scss",
    "src/scss/pages/**/*.scss"
  ];

  return (
    gulp
      .src(cssSrcArr)
      .pipe(sourcemaps.init())
      // 编译 sass
      .pipe(Sass())
      .pipe(sourcemaps.write("./"))
      // 当前对应css文件
      .pipe(gulp.dest(dist + "/css"))
  );
}

// js
// const compilerJS = Webpack(WebpackConfig);

async function js(done) {
  // webpack 打包配置的入口文件
  pump(
    [
      gulp.src(srcPath("js")),
      named(),
      webpackStream(streamMode, webpack),
      gulp.dest(dist + "/js")
    ],
    done
  );

  // 拷贝第三方插件到dist目录下
  return gulp.src("src/js/plugins/**").pipe(gulp.dest(dist + "/js/plugins"));
}

// image
async function image() {
  return gulp.src("src/images/**/*").pipe(gulp.dest(dist + "/images"));
}

// clean dir
async function clean() {
  // 不设置allowEmpty: true会报File not found with singular glob
  return gulp.src(dist, { allowEmpty: true }).pipe(Clean());
}

module.exports = {
  // html,
  css,
  js,
  image,
  clean
};
