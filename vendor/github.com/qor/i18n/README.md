[TOC]

# I18n

I18n provides internationalization support for your application, it supports 2 kinds of storages(backends), the database and file system.

I18n 为你的 应用提供国际化支持.
他支持 两种 存储模式 storages(backends),
一个是 database(数据库),
另一个是文件系统(如,YAML).

[![GoDoc](https://godoc.org/github.com/qor/i18n?status.svg)](https://godoc.org/github.com/qor/i18n)


## Usage (翻译: 使用说明)

Initialize I18n with the storage mode. You can use both storages together, the earlier one has higher priority. So in the example, I18n will look up the translation in database first, then continue finding it in the YAML file if not found.

翻译: 初始化 I18n 为 存储 模式.
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

Once a database has been set for I18n, 
all **untranslated** translations inside `I18n.T()` 
will be loaded into `translations` table in the database when compiling the application. 
For example, we have an untranslated `I18n.T("en-US", "demo.greeting")` in the example, 
so I18n will generate this record in the `translations` table after compiling.


翻译: 一旦 为 I18n 设置了 databalse,
当编译应用时, 所有 I18n.T() 相关的 **untranslated** translations  会被加载到 `translations` 表.
比如, 我们拥有一个 untranslated `I18n.T("en-US", "demo.greeting")`,
所以当应用编译完成后 I18n 会 生成 这个 记录 到 `translations` 表.

| locale | key           | value  |
| ------ | ------------- | ------ |
| en-US  | demo.greeting | &nbsp; |

The YAML file format is

```yaml
en-US:
  demo:
    hello: 'Hello, world'
```

### Use built-in interface for translation management with [QOR Admin](http://github.com/qor/admin)(翻译: 通过 QOR Admin 使用 built-in 界面)

I18n has a built-in web interface for translations which is integrated with [QOR Admin](http://github.com/qor/admin).
翻译: I18n 拥有 translations  构建时的能力 for QOR Admin.

```go
Admin.AddResource(I18n)
```

Then a page like this will be added to [QOR Admin](http://github.com/qor/admin) interface
翻译: 这个页面会被添加到 QOR Admin.

Refer the [online demo](http://demo.getqor.com/admin/translations).

### Use with Golang templates (翻译: 在 go templates 中使用)

The easy way to use I18n in a template is to define a `t` function and register it as `FuncMap`:  
翻译: 最简单地使用 I18n 的方法是在 template 中定义并注册一个 `t` 方法, 如下:

```go
func T(key string, value string, args ...interface{}) string {
  return I18n.Default(value).T("en-US", key, args...)
}

// then use it in the template
{{ t "demo.greet" "Hello, {{$1}}" "John" }} // -> Hello, John
```

### Built-in functions for translations management (翻译: bult-in 提供的一些方法)

I18n has functions to manage translation directly.  
翻译: I18n 还提供了一些方法去直接地管理 translation .

```go
// Add Translation
I18n.AddTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "hello world"})

// Update Translation
I18n.SaveTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "Hello World"})

// Delete Translation
I18n.DeleteTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "Hello World"})
```

### Scope and default value (翻译:  scope 与 默认 值)

Call Translation with `Scope` or set default value.  
 使用 `Scope` 调用 Translation 或者 设置默认 值.

```go
// Read Translation with `Scope`
I18n.Scope("home-page").T("zh-CN", "hello-world") // read translation with translation key `home-page.hello-world`

// Read Translation with `Default Value`
I18n.Default("Default Value").T("zh-CN", "non-existing-key") // Will return default value `Default Value`
```

### Fallbacks (翻译:回退)

I18n has a `Fallbacks` function to register fallbacks. For example, registering `en-GB` as a fallback to `zh-CN`:  
I18n 提供 一个 `Fallbacks` 方法 去注册 fallbacks. 比如, 注册 `en-GB` 为 一个 fallback to `zh-CN`.
```go
i18n := New(&backend{})
i18n.AddTranslation(&Translation{Key: "hello-world", Locale: "en-GB", Value: "Hello World"})

fmt.Print(i18n.Fallbacks("en-GB").T("zh-CN", "hello-world")) // "Hello World"
```

**To set fallback [_Locale_](<https://en.wikipedia.org/wiki/Locale_(computer_software)>) globally** you can use `I18n.FallbackLocales`. This function accepts a `map[string][]string` as parameter. The key is the fallback _Locale_ and the `[]string` is the _Locales_ that could fallback to the first _Locale_.

For example, setting `"fr-FR", "de-DE", "zh-CN"` fallback to `en-GB` globally:

为了 set fallback Locale globally, 你可以用 I1n8n.FallbackLocales.   

这个方法 接受 map[string][]string 作为 参数.
这个 map 中 key 是 fallback Locale, 而 []string 是 Locales 是可以被 fallback 为 首选 Locale 的可选值.

```go
I18n.FallbackLocales = map[string][]string{"en-GB": []{"fr-FR", "de-DE", "zh-CN"}}
```

### Interpolation (翻译:补充变量/修补?)

I18n utilizes a Golang template to parse translations with an interpolation variable.  

I18n 利用 一个 go template 去解析 带有补充变量 的 translations. 

```go
type User struct {
  Name string
}

I18n.AddTranslation(&i18n.Translation{Key: "hello", Locale: "en-US", Value: "Hello {{.Name}}"})

I18n.T("en-US", "hello", User{Name: "Jinzhu"}) //=> Hello Jinzhu
```

### Pluralization (翻译:多元化/世俗化?)

I18n utilizes [cldr](https://github.com/theplant/cldr) to achieve pluralization, it provides the functions `p`, `zero`, `one`, `two`, `few`, `many`, `other` for this purpose. Please refer to [cldr documentation](https://github.com/theplant/cldr) for more information.

翻译: I18n 利用 cldr 去 存档 多元化, 他提供一些方法 如 p,zero,one,two,few,many,other 以便满足你的需求.
请参看 cldr 文档 获取更多信息.

```go
I18n.AddTranslation(&i18n.Translation{Key: "count", Locale: "en-US", Value: "{{p "Count" (one "{{.Count}} item") (other "{{.Count}} items")}}"})
I18n.T("en-US", "count", map[string]int{"Count": 1}) //=> 1 item
```

### Ordered Params  (翻译:参数排序)

```go
I18n.AddTranslation(&i18n.Translation{Key: "ordered_params", Locale: "en-US", Value: "{{$1}} {{$2}} {{$1}}"})
I18n.T("en-US", "ordered_params", "string1", "string2") //=> string1 string2 string1
```

### Inline Edit (翻译:行内编辑)

You could manage translations' data with [QOR Admin](http://github.com/qor/admin) interface (UI) after registering it into [QOR Admin](http://github.com/qor/admin), however we warn you that it is usually quite hard (and error prone!) to _translate a translation_ without knowing its context...Fortunately, the _Inline Edit_ feature of [QOR Admin](http://github.com/qor/admin) was developed to resolve this problem!


翻译: 完成 `registering` 后,
你可能会使用 `QOR Admin` 提供的 Interface UI 去 编辑管理你的 translations 数据.
但是, 我们想劝劝你, 
这个功能经常在 translate 一个 translation 时因为不知道 上下文而
经常会不知搓搓. quite hard(and error prone!) .
但是呢, 幸运的是, 
我们为了解决这些问题, 为 `QOR Admin` 开发了  `inline Edit` 特性.

_Inline Edit_ allows administrators to manage translations from the frontend. Similarly to [integrating with Golang Templates](#integrate-with-golang-templates), you need to register a func map for Golang templates to render _inline editable_ translations.


翻译: inline Edit 功能 允许管理员 在 `frontend` 管理 translations .
类似的 `integratins with golang templates`,
你需要 register 一个 func map 以便让 `golang templates 渲染` `inline editable` translations.


The good thing is we have created a package for you to do this easily, it will generate a `FuncMap`, you just need to use it when parsing your templates:


翻译: 好处是 我们为了让你更简单的做这些事情,我们为你创建了 一个 package.
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
