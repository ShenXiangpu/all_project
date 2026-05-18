#### 目录结构
```
.
├── mock/                          // mock数据文件夹
├── node_modules/                  // 第三方的依赖
├── public/                        // 存放公共public文件的文件夹
├── src/                           // 源码目录，可选
    ├── assets/                    // 可以放图片等公共资源
    ├── common/                    // 通用的方法
        ├── menu.js                // 左侧菜单
    ├── components/                // 公共的组件，比如布局、加载等
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── dashboard/             // 路由页面
            ├── dashboard.js        // 路由 /dashboard/dashboard 页面
        ├── login/                 
        ├── user/                 
            ├── components/        // 组件
            ├── model.js/            // 逻辑model
            ├── service.js/          // 接口文件
            ├── index.js           // 路由/user页面组件
        ├── index.js               // 根路径页面
        ├── index.css              // 根路径页面样式
    ├── models/                    // 放共用的逻辑model
    ├── services/                  // 放共用的接口文件
    ├── utils/                     // 工具方法
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
├── .editorconfig                  // 保证代码在不同编辑器可视化的工具
├── .eslintrc                      // bower安装目录的配置
├── .gitignore                     // git上传时忽略的文件
├── .umirc.js                      // 项目的配置文件，包括webpack配置
└── package.json                   // 当前整一个项目的依赖
```



#### 启动项目

##### 安装项目依赖

```
$ npm install
```

##### 本地开发环境运行项目

```
$ npm run start
```

##### 生产环境

```
$ npm run build
```

