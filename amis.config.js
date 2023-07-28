/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-05-25 13:09:31
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-06-01 10:01:40
 * @FilePath: \amis-editor-demo\amis.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// 统一路径解析
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// 包括生产和开发的环境配置信息
module.exports = {
  webpack: {
    resolve: {
      // webpack的resolve配置
      extensions: ['.js', '.jsx', '.ts', '.tsx','.esm.js', '.umd.js', '.min.js', '.json'], // 用于配置webpack在尝试过程中用到的后缀列表
      alias: {
        '@': resolve('src'),
        // $function: resolve('src/function'),
        // $utils: resolve('src/utils'),
      },
      // conditionNames: ['require']
    },
    createDeclaration: false, // 打包时是否创建ts声明文件
    ignoreNodeModules: false, // 打包时是否忽略 node_modules
    allowList: [], // ignoreNodeModules为true时生效
    externals: [],
    projectDir: ['src'],
    template: resolve('./src/index.html'), // 使用自己的html模板
    // cssLoaderUrl: true,
    // cssLoaderUrlDir: 'editor/fontawesome-free',
    moduleRules: [], // 用于配置自定义loaders
    plugins: [], // 用于配置自定义plugins
    devServer: {
      proxy: {
        '/apiv1': {
          target: 'http://127.0.0.1:5000',
          pathRewrite: { '^/apiv1': '' }
        }
      }
    },
  },
  dev: {
    entry: { // 本地调试模式的入口
      index: './src/index.tsx',
      editor:  './src/mobile.tsx',
    },
    // 用于开启本地调试模式的相关配置信息
    NODE_ENV: 'development',
    ignoreNodeModules: false, // 打包时是否忽略 node_modules
    port: 8888,
    autoOpenBrowser: true,
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    cssSourceMap: false,
    closeHotReload: false, // 是否关闭热更新
    closeEditorClient: true, // 是否关闭自动注入editor
  },
  build: {
    entry: { // webpack构建入口
      index: './src/index.tsx',
      editor:  './src/mobile.tsx',
    },
    // 用于构建生产环境代码的相关配置信息
    NODE_ENV: 'production',
    assetsRoot: resolve('./demo'), // 打包后的文件绝对路径（物理路径）
    assetsPublicPath: 'https://aisuda.github.io/amis-editor-demo/demo/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '', // 资源引用二级路径
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'json'],
    plugins: [new MonacoWebpackPlugin()],
    bundleAnalyzerReport: false,
  }
};
