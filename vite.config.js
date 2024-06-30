import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import postCssPxToRem from "postcss-pxtorem";
import UnoCSS from 'unocss/vite'
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from "vite-plugin-compression";
// 当前工作目录路径
const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const env = loadEnv(mode, process.cwd(), '')
  const env = loadEnv(mode, root)
  const { VITE_BASE_URL, VITE_BASE_API } = env
  return {
    base: VITE_BASE_URL,
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 去除console
          drop_debugger: true // 去除debugger
        }
      }
    },
    server: {
      port: 3000,
      open: 'http://localhost:3000' + VITE_BASE_URL,
      host: true,
      proxy: {
        [VITE_BASE_API]: {
          target: "",
          changeOrigin: true, // 是否允许不同源
          secure: false, // 支持https
          rewrite: (path) => path.replace(new RegExp('^' + VITE_BASE_API), '')
        }
      }
    },
    plugins: [
      vue(),
      // 原子化css
      UnoCSS({
        configFile: './uno.config.js',
      }),
      // VueDevTools(),// 官方调试工具
      viteMockServe({
        mockPath: './mock/', // 设置模拟数据的存储文件夹
        supportTs: false, // 是否读取ts文件模块
        logger: true, //  是否在控制台显示请求日志
        localEnabled: true, //设置是否启用本地mock文件
        prodEnabled: false //设置打包是否启用 mock 功能
      }),
      // svg 图标
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/assets/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      // 允许 setup 语法糖上添加组件名属性
      vueSetupExtend(),
      // 生产环境 gzip 压缩资源
      viteCompression(),
      // 自动导入
      AutoImport({
        resolvers: [VantResolver()],
        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-i18n',
          'vue-router',
          // custom
          {
            '@vueuse/core': [
              // named imports
              'useMouse', // import { useMouse } from '@vueuse/core',
              // alias
              ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
            ],
            'axios': [
              // default imports
              ['default', 'axios'], // import { default as axios } from 'axios',
            ],
            '[package-name]': [
              '[import-names]',
              // alias
              ['[from]', '[alias]'],
            ],
          }
        ],
        dirs: [
          'src/composables',
          'src/store/modules',
        ],
        vueTemplate: true,
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    css: {
      postcss: {
        preprocessorOptions: {
          // 这里可以配置sass的选项，例如全局变量、函数等
          scss: {
            javascriptEnabled: true,
            additionalData: '@import "./assets/styles/variable.scss";',
          },
        },
        plugins: [
          postCssPxToRem({
            rootValue: 37.5, // 1rem，根据 设计稿宽度/10 进行设置
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            selectorBlackList: ["norem"], // 过滤掉norem-开头的class，不进行rem转换
          })
        ]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
}
)
