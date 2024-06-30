

<div align="center">
	<img src="src/assets/logo/logo_melomini.png" alt="logo_melomini" width=200 />
</div>

<div align="center">
  <a href="https://gitee.com/limin04551/vue3-h5-template/blob/main/LICENSE">
   <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT">
  </a>
  <a href="https://gitee.com/limin04551/vue3-h5-template/stargazers">
    <img src="https://gitee.com/limin04551/vue3-h5-template/badge/star.svg" alt="Gitee star">
  </a>
  <a href="https://gitee.com/limin04551/vue3-h5-template">
    <img src="https://gitee.com/limin04551/vue3-h5-template/badge/fork.svg?style=flat-square" alt="Gitee fork">
  </a>
</div>


<h1 align="center">vue3 h5 template</h1>



**🌱 基于 Vue3 全家桶、JavaScript-放弃为TS而TS🤪、Vite 构建工具，开箱即用的 H5 移动端项目基础模板。**

- [x] ⚡ Vue3 + Vite4
- [x] 🍕 JavaScript 无需类型定义
- [x] ✨ Vant4 组件库
- [x] 🎨 Unocss - 高性能且极具灵活性原子化CSS
- [x] 🍍 Pinia 状态管理并进行持久化
- [x] 🌓 支持深色模式
- [x] 🌍 I18n 国际化开箱即用
- [x] 🔥 Vue-router 4
- [x] 📥 API及组件 自动加载 无需引入
- [x] 🌠 支持 SVG 图标自动注册组件
- [x] 🖼️ rem 适配
- [x] 📩 Axios 封装
- [x] 📨 开发环境支持 Mock 数据
- [x] 📊 首屏加载动画
- [x] 💻 VConsole 开发环境调试面板
- [x] 📦 打包资源 gzip 压缩



## 在线预览Preview

👓 [点击这里](http://124.223.116.62:10000/vue3-h5-template/)（PC浏览器请切换手机端模式）



## 截图
<div style="flex justify-content: space-between;">
<img alt="" src="docs/home-zh.png" width=200>
<img alt="" src="docs/home-en.png" width=200>
<img alt="" src="docs/home-zh-dark.png" width=200>
</div>



## 运行项目

注意：要求 Node 版本 16+，可使用 [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) 进行本地 Node 版本管理，同时建议使用 [pnpm](https://pnpm.io/zh/installation) 包管理器。

```shell
# 克隆项目
git clone https://gitee.com/limin04551/vue3-h5-template.git

# 进入项目目录
cd vue3-h5-template

# 安装依赖
pnpm install

# 启动服务
pnpm dev
```


## 文档引导

> - [按需引入 vant 组件](#vant)
> - [SVG 图标使用](#svg)
> - [路由缓存](#router)
> - [调试面板 vconsole](#console)
> - [动态设置页面标题](#page-title)
> - [rem 视口适配](#viewport)
> - [Unocss 原子类框架](#Unocss)
> - [Git 提交信息规范](#git)



### - <span id="vant">按需引入 vant 组件</span>

全量引入组件库太过臃肿，项目中使用 `unplugin-vue-components` 插件进行按需自动引入组件，可通过[官方文档](https://vant-ui.github.io/vant/#/zh-CN/quickstart#2.-pei-zhi-cha-jian)了解更多。



### - <span id="svg">SVG 图标使用</span>


> 1. 将 svg 图标文件放在 `src/assets/icons/svg` 目录下
> 2. 在项目中直接使用 `<svg-icon name="svg图标文件命名" />` 即可

例如：

本项目 `src/assets/icons/svg` 中放了个 `dark.svg` 的图标文件，然后在组件 `name` 属性中填入文件的命名即可，So easy~

```Vue
<svg-icon name="dark" />
```

> 项目中使用了 `unplugin-vue-components` 自动引入组件，所以 `main.ts` 中无需注册全局图标组件。



### - <span id="router">路由缓存</span>

组件默认不缓存，如某个组件需缓存，在对应路由 `meta` 内的 `isKeepAlive` 字段赋值为 `true` 即可。

```javascript
// src/router/routes.js
 {
        path: "about",
        name: "about",
        component: () => import('../views/about/index.vue'),
        meta: {
          title: "关于",
          isKeepAlive: true // 进行路由缓存
        }
      }
```


### - <span id="console">调试面板 vconsole</span>
<img alt="" src="docs/console.png" width=240>

为了方便移动端查看 log 信息和调试，开发环境引入了 vconsole 调试面板。如果你的开发环境不需要的话请在 `main.js` 中注释

```html
# .env.development

# 开发环境启用 VCONSOLE 调试工具。若不启用，将 true 修改为 false
VITE_ENABLE_VCONSOLE = true
```



### - <span id="page-title">动态设置页面标题</span>

在路由全局前置守卫中：

```js
// src/router/index.js
// ...
router.beforeEach((to, from, next) => {
  NProgress.start();
  useTitle(to.meta.title || pageDefaultTitle)// 设置页面标题
  if (getToken()) {
    next();
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next('/login');
  }
});
```



### - <span id="mock">开发环境 Mock</span>

> 本项目开发环境支持 mock 请求数据，在 `mock` 目录中可配置接口和数据，具体见[文档](http://mockjs.com)。



### - <span id="viewport">rem 适配</span>

使用 `postcss-pxtorem amfe-flexible` 进行视口适配，相关配置见项目根目录下 `vite.config.js`。

```js
// vite.config.js
css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem，根据 设计稿宽度/10 进行设置
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ["norem"], // 过滤掉norem-开头的class，不进行rem转换
        })
      ]
    }
  }
```



### - <span id="Unocss">Unocss 原子类框架</span>

Tailwindcss 从 3.0 版本开始默认使用 `JIT` 模式，打包代码不再臃肿，结合 `vite` 使用非常香~ 如果你还没使用过类似的框架，Tailwindcss 首页的[示例](https://tailwindcss.com/)非常直观。

官方文档：https://tailwindcss.com/docs/padding



### - <span id="git">Git 提交信息规范</span>

项目使用 `husky` 规范 Git 提交信息，遵循社区主流的 [Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) 规范。

```
feat 增加新功能
fix 修复问题/BUG
style 代码风格相关无影响运行结果的
perf 优化/性能提升
refactor 重构
revert 撤销修改
test 测试相关
docs 文档/注释
chore 依赖更新/脚手架配置修改等
workflow 工作流改进
ci 持续集成
types 类型定义文件更改
wip 开发中
```

```
// 格式
<type>(<scope>): <subject>
// 示例
feat(layout): 布局完成
```

## 鸣谢

 [vue3-h5-template](https://github.com/yulimchen/vue3-h5-template) 

## License

[MIT license](https://gitee.com/limin04551/vue3-h5-template/blob/main/LICENSE).
