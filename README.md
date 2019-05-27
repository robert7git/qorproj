# 1. QOR

## 1.1. TODO

-   产品列表链接如何生成
-   spa 机制
-   [ x ] go mod 相关 / debug 时 go mod 走 vendor 但是, go run main 走 \$GOpath / 原来如此

## 1.2. 说明

-   不错的学习资料

## 1.3. 启动

```go

// 1. 配置 gopath
...

// 2. 初始化 go mod.
$ go mod init qorproj/

// 3. 下载依赖到 gopath.
$ go mod tidy -v

// 4. vendor 化, 方便修改错误.
$ go mod vendor

// 5. 生成 mock 数据
$ go run config/db/seeds/main.go config/db/seeds/seeds.go

// 6. vendor main.go.
$ go run -mod

```

## 1.4. 结构

-   app/ - 模块.
-   config/ - 配置
-   vendor/ - 第三方 vendor 方便调试与修改
-   main.go - 入口
-   ... 剩下模块内部原理

## 1.5. 概念

模块化的方式.  
业务都内聚到了 app/ 下的各个模块里.

1. Application 主程序

    1. cmdLine 启动参数输入捕获
    1. application.New
    1. application.Use(mod.New(conf))
    1. application.NewServeMux()

1. Admin 管理

1. 模块机制

    - DraftDB 临时 DB 比如 生成 mock 数据时.
    - resource 概念
    - menu
    - meta
    - scope
    - context
    - router
    - handler
    - action
    - controller
    - template
    - funcMap
    - assetsFS
    - Bindatafs - compile templates into binary,
    - il8n 国际化

        1. yml
        2. built-in 更内聚与模块
        3. inline 最细,最上下文

1. docker 部署

## 1.6. Q 包

-   Q/qor

    -   Q/qor/gulp.js 提供 admin 前端构建能力

-   Q/admin
-   Q/auth
-   Q/page_builder
-   Q/widget

## 1.7. 错误修复

-   登录 - 错误

```go
tx.Model(context.Auth.AuthIdentityModel).Where(authInfo).Scan(&authInfo).RecordNotFound()

... 替换成

authwhere := auth_identity.AuthIdentity{Basic: authInfo}
tx.Model(context.Auth.AuthIdentityModel).Where(authwhere).Scan(&authInfo).RecordNotFound()
```

需要在下面代码替换.

-   Q/auth/providers/user_storer.go 错误
-   Q/auth/providers/password 错误
    -   password.go 错误
    -   handlers.go 错误

## 额外资料

[QOR 官网](https://doc.getqor.com)  
[QOR 相关 blog](https://blog.csdn.net/freewebsys/article/details/80575900)  
[go modules 初探](https://www.cnblogs.com/apocelipes/p/9534885.html)  
[go modules 使用与细节](https://www.cnblogs.com/apocelipes/p/10295096.html)
