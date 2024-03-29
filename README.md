# gulp-webpack-ie8 一个现代化开发的基础工程 兼容 IE8+（（Gulp4+Webpack4+Babel7+ES6+Eslint+Prettier））

## 解决开发痛点

* 用 gulp 自动化处理scss、图片等
* 用 webpack 打包js代码，支持模块化开发
* 用 core-js 提供 pollyfill 环境，支持es6语法
* 用 eslint + prettier 规范代码风格，提升代码可读性和可维护性

## 浏览器支持

* 开发环境 所有现代浏览器 和 IE9+
* 生产环境 所有现代浏览器 和 IE8+

## 项目结构

```bash
.
+-- build            // gulp + webpack配置
+-- src               // 项目源码
|   +-- common        // 通用模块
|   +-- config        // 配置模块
|   +-- core          // 核心模块，业务代码都在这个目录下
|       +-- index.js  // 入口文件
+-- package.json
```

## 安装依赖

```bash
npm install
# 或
yarn
```

## 开发环境启动

```bash
npm run dev
# 或
yarn dev
```

## 生产环境构建

```bash
npm run build
# 或
yarn build
```

## 参考项目

* https://github.com/xtTech/dc-sdk-js
* https://github.com/IamManchanda/gulp-webpack

## License

[MIT](http://opensource.org/licenses/MIT)
