package i18n

import (
	"fmt"
	"path/filepath"

	"github.com/qor/i18n"
	"github.com/qor/i18n/backends/database"
	"github.com/qor/i18n/backends/yaml"
	// "github.com/qor/l10n"

	"qorproj/config"
	"qorproj/config/db"
)

var I18n *i18n.I18n

func init() {
	// I18n = i18n.New(database.New(db.DB), yaml.New(filepath.Join(config.Root, "config/locales")))
	// ymlpath := filepath.Join("", "config/locales")
	ymlpath := filepath.Join(config.Root, "config/locales")
	fmt.Println(ymlpath)
	I18n = i18n.New(database.New(db.DB), yaml.New(ymlpath))
	// l10n.Global = "zh-CN"
	// I18n.T("en-US", "demo.greeting") // Not exist at first
	// I18n.T("en-US", "demo.hello")    // Exists in the yml file
	// fmt.Println(I18n)
	// I18n.SaveTranslation(&i18n.Translation{Key: "qor_i18n.form.saved", Locale: "en-US", Value: "保存"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Site Management", Locale: "en-US", Value: "site management"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Site Management", Locale: "zh-CN", Value: "站点管理"})

	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Order Management", Locale: "en-US", Value: "order management"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Order Management", Locale: "zh-CN", Value: "订单管理"})

	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Dashboard", Locale: "en-US", Value: "dashbord"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Dashboard", Locale: "zh-CN", Value: "控制面板"})

	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.User Management", Locale: "en-US", Value: "user management"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.User Management", Locale: "zh-CN", Value: "用户管理"})

	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Pages Management", Locale: "en-US", Value: "page management"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Pages Management", Locale: "zh-CN", Value: "页面管理"})

	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Publishing", Locale: "en-US", Value: "publishing"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Publishing", Locale: "zh-CN", Value: "发布相关"})

	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Products Management", Locale: "en-US", Value: "products management"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Products Management", Locale: "zh-CN", Value: "商品管理"})

	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Products Management.Products", Locale: "en-US", Value: "products"})
	// I18n.AddTranslation(&i18n.Translation{Key: "qor_admin.menus.Products Management.Products", Locale: "zh-CN", Value: "商品"})
}
