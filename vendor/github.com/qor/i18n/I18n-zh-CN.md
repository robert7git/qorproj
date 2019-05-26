[TOC]

# I18n

I18n 为你的 应用提供国际化支持.
他支持 两种 存储模式 storages(backends),
一个是 database(数据库),
另一个是文件系统(如,YAML).

[![GoDoc](https://godoc.org/github.com/qor/i18n?status.svg)](https://godoc.org/github.com/qor/i18n)


## 使用说明

初始化 I18n 为 存储 模式.
你可以 同时一起使用 两种 存储模式, 
更简单地方法拥有更高的优先级嘛.
所以,在例子中, 
I18n 会优先在 数据库中 查找特定的 translation,
然后, 如果没找到, 接着会继续在 YAML 文件查找.


```go
import (
  "github.com/jinzhu/gorm"
  "github.com/qor/i18n"
  "github.com/qor/i18n/backends/database"
  "github.com/qor/i18n/backends/yaml"
)

func main() {
  db, _ := gorm.Open("mysql", "user:password@/dbname?charset=utf8&parseTime=True&loc=Local")

  I18n := i18n.New(
    database.New(&db), // load translations from the database
    yaml.New(filepath.Join(config.Root, "config/locales")), // load translations from the YAML files in directory `config/locales`
  )

  I18n.T("en-US", "demo.greeting") // Not exist at first
  I18n.T("en-US", "demo.hello") // Exists in the yml file
}
```

一旦 为 I18n 设置了 databalse,
当编译应用时, 所有 I18n.T() 相关的 **untranslated** translations  会被加载到 `translations` 表.
比如, 我们拥有一个 untranslated `I18n.T("en-US", "demo.greeting")`,
所以当应用编译完成后 I18n 会 生成 这个 记录 到 `translations` 表.

| locale | key           | value  |
| ------ | ------------- | ------ |
| en-US  | demo.greeting | &nbsp; |

yaml 文件的 格式如下:

```yaml
en-US:
  demo:
    hello: 'Hello, world'
```

### 通过  [QOR Admin](http://github.com/qor/admin) 使用 built-in 界面

I18n 拥有 translations  构建时的能力 for [QOR Admin](http://github.com/qor/admin)..

```go
Admin.AddResource(I18n)
```

这个页面会被添加到 [QOR Admin](http://github.com/qor/admin) interface

查看 demo 链接 [online demo](http://demo.getqor.com/admin/translations).

### 在 go templates 中使用

翻译: 最简单地使用 I18n 的方法是在 template 中定义并注册一个 `t` 方法作为 `FuncMap`, 如下:

```go
func T(key string, value string, args ...interface{}) string {
  return I18n.Default(value).T("en-US", key, args...)
}

// then use it in the template
{{ t "demo.greet" "Hello, {{$1}}" "John" }} // -> Hello, John
```

### bult-in 提供的一些方法

I18n 还提供了一些方法去直接地管理 translation .

```go
// Add Translation
I18n.AddTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "hello world"})

// Update Translation
I18n.SaveTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "Hello World"})

// Delete Translation
I18n.DeleteTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "Hello World"})
```

### scope 与 默认值

 使用 `Scope` 调用 Translation 或者 设置默认值.

```go
// Read Translation with `Scope`
I18n.Scope("home-page").T("zh-CN", "hello-world") // read translation with translation key `home-page.hello-world`

// Read Translation with `Default Value`
I18n.Default("Default Value").T("zh-CN", "non-existing-key") // Will return default value `Default Value`
```

### 回退(Fallbacks)

I18n 提供 一个 `Fallbacks` 方法 去注册 fallbacks. 比如, 注册 `en-GB` 为 一个 fallback to `zh-CN`.

```go
i18n := New(&backend{})
i18n.AddTranslation(&Translation{Key: "hello-world", Locale: "en-GB", Value: "Hello World"})

fmt.Print(i18n.Fallbacks("en-GB").T("zh-CN", "hello-world")) // "Hello World"
```


为了 **To set fallback [_Locale_](<https://en.wikipedia.org/wiki/Locale_(computer_software)>) globally**, 
你可以用 `I18n.FallbackLocales`. 
这个方法 接受 `map[string][]string` 作为 参数.
这个 map 中 key 是 fallback _Locale_, 而 `[]string` 是一个可以被 fallback 为 首选 Locale 的可选值 的 _Locale_.

如, 设置 `"fr-FR", "de-DE", "zh-CN"` fallback to `en-GB` globally:


```go
I18n.FallbackLocales = map[string][]string{"en-GB": []{"fr-FR", "de-DE", "zh-CN"}}
```

### 补充变量/修补? (Interpolation)

I18n 利用 一个 go template 去解析 带有补充变量 的 translations. 

```go
type User struct {
  Name string
}

I18n.AddTranslation(&i18n.Translation{Key: "hello", Locale: "en-US", Value: "Hello {{.Name}}"})

I18n.T("en-US", "hello", User{Name: "Jinzhu"}) //=> Hello Jinzhu
```

### 多元化/世俗化? (Pluralization)

I18n 利用 [cldr](https://github.com/theplant/cldr) 去 存档 多元化, 
他提供一些方法 如 `p`, `zero`, `one`, `two`, `few`, `many`, `other` 以便满足你的需求.
请参看 [cldr documentation](https://github.com/theplant/cldr)  文档 获取更多信息.

```go
I18n.AddTranslation(&i18n.Translation{Key: "count", Locale: "en-US", Value: "{{p "Count" (one "{{.Count}} item") (other "{{.Count}} items")}}"})
I18n.T("en-US", "count", map[string]int{"Count": 1}) //=> 1 item
```

### 参数排序 (Ordered Params)

```go
I18n.AddTranslation(&i18n.Translation{Key: "ordered_params", Locale: "en-US", Value: "{{$1}} {{$2}} {{$1}}"})
I18n.T("en-US", "ordered_params", "string1", "string2") //=> string1 string2 string1
```

### 行内编辑 (Inline Edit)


完成 `registering` 后,
你可能会使用 [QOR Admin](http://github.com/qor/admin) 提供的 Interface UI 去 编辑管理你的 translations 数据.
但是, 我们想劝劝你, 
这个功能经常在 translate 一个 translation 时因为不知道 上下文而
经常会不知搓搓. quite hard(and error prone!) .
但是呢, 幸运的是, 
我们为了解决这些问题, 为  [QOR Admin](http://github.com/qor/admin) 开发了  _Inline Edit_ 特性~!


_Inline Edit_ 功能允许管理员 在 `frontend` 管理 translations .
类似的  [integrating with Golang Templates](#integrate-with-golang-templates),
你需要 register 一个 func map 以便让 `golang templates 渲染` _inline editable_  translations.


好消息是,我们为了让你更简单的做这些事情, 我们为你创建了 一个 package.
这个 package 会 生成 一个 `FuncMap` .
你只需要在 解析你的 templates 时 使用它就 ok 了.
简单吗? 哈哈.
let's coding, happily ~ we let your life shine brightly.
好吧,开始愉快的 coding 吧, 祝你的生活阳光灿烂~


```go
// `I18n` hold translations backends
// `en-US` current locale
// `true` enable inline edit mode or not, if inline edit not enabled, it works just like the funcmap in section "Integrate with Golang Templates"
inline_edit.FuncMap(I18n, "en-US", true) // => map[string]interface{}{
                                         //     "t": func(string, ...interface{}) template.HTML {
                                         //        // ...
                                         //      },
                                         //    }
```

## License

Released under the [MIT License](http://opensource.org/licenses/MIT).
