## 问题
1. 这些包作者貌似不进行维护
也不接受 PR . 提取到 自己的 lib 路径 又发现 一堆 struct 类型错误, 即使 go 认为 同样的文件 go 也会认为是 不同的.

只好 慢慢提取成自己的代码啦~ 也是一次学习机会吧. 

2. 前端的 js 在 各个包里 是压缩过的
这部分需要 重构 成自己的 前端

## 生成数据

```go
$ go run config/db/seeds/main.go config/db/seeds/seeds.go
```

## 目录结构


## TODO
- 添加 spa
- 逐个提取成自己的包
- docker 部署
