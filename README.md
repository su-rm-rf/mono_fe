monorepo单体仓库 + Docker容器化部署

git@github.com:su-rm-rf/mono_fe.git

# 共用dependency
webpack:
  webpack webpack-cli webpack-merge webpack-node-externals copy-webpack-plugin
babel:
  @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/runtime @babel/plugin-transform-runtime
ts: 
  typescript ts-loader
react18:
  react react-dom react-router react-redux @reduxjs/toolkit
  @types/react @types/react-dom
vue3:
  vue vue-router vuex pinia
  vue-loader
css:
  css-loader sass sass-loader postcss postcss-loader postcss-preset-env mini-css-extract-plugin css-minimizer-webpack-plugin
js:
  terser-webpack-plugin
http:
  axios
system: 
  cross-env dotenv
node:
  express
  @types/express

# 业务需求
购物
toC前端：注册、登录，个人信息维护，商品信息展示、搜索，下单，订单管理
toB前端：管理员登录，用户管理，维护商品信息，订单信息展示

# 构建
根据 build:dev:admin, build:dev:wap_pc 携带的 NODE_ENV 在 webpack.admin.js, webpack.wap_pc.js 判断调用 dev-common, prod-common 再合并 webpack-common

webpack.common.js, webpack.dev.js, webpack.prod.js 都是标准配置
webpack.admin.js, webpack.wap_pc.js 是模块的个性化配置
