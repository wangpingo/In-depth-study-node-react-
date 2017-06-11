#### 第一天  现代前端开发
 1. ES6 新一代javascript语言标准
 2. Component组件和模块的发展历程
 3. 前端开发常用工具
 
 关于es6 推荐看 阮一封老师的书。一定要舍得买一本啊，讲的非常的好
 
 前端组件化四个阶段
 1. 基于命名文件的多入口文件组件
 2. 基于模块的多入口文件组件
 3. 单javascript入口文件
 4. web omponent
 
 辅助工具
 
 包管理器有很多用 node亲儿子npm吧
 
 包和模块的区别
 
 前端项目复杂，模块打包前端构建系统的核心
 
 #### 今天重点webpack 
 webpack 与requireJs，bowserify
require是一个模块加载器，基于AMD规范实现，通过将开发时的单独的匿名模块具名话进行合并
browersify 是一个以使用nodejs模块为出发点的工具
1. 对cmmonjs模块规范代码进行转换与包装
2. 对nodejs标准的包进行浏览器端的适配

Requirejs 项目本身是最流行的AMD 规范的实现
```javascript
define(function(require) {
  modules.exports='hello!'
})
```
require js 缺陷
1. 加载与构建的分离导致plugin分别需要实现两套逻辑。
2. 浏览器安全策略决定大多数需要读取的文本内容无法被跨越加载

#### 安装 
npm install  webpack -g

plugins 插件
loaders 接受源代码返回新代码
webpackBootstrap 启动入口
webpack -w 监听
webpack-dev-serve 通过socket.io与服务器进行通信

 