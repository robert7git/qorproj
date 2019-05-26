package admin

import (
	// "fmt"
	"github.com/qor/action_bar"
	"github.com/qor/admin"
	"github.com/qor/auth/auth_identity"
	"github.com/qor/help"

	"github.com/qor/media/asset_manager"
	"github.com/qor/media/media_library"
	"qorproj/config/application"
	"qorproj/config/i18n"
	"qorproj/models/settings"
	// "github.com/qor/i18n"
	// confi18n "qorproj/config/i18n"
)

// ActionBar admin action bar
var ActionBar *action_bar.ActionBar

// AssetManager asset manager
var AssetManager *admin.Resource

// New new home app
func New(config *Config) *App {
	if config.Prefix == "" {
		config.Prefix = "/admin"
	}
	return &App{Config: config}
}

// App home app
type App struct {
	Config *Config
}

// Config home config struct
type Config struct {
	Prefix string
}

// ConfigureApplication configure application
func (app App) ConfigureApplication(application *application.Application) {
	Admin := application.Admin

	menuitem := "Site Management"
	// i18nyml := i18n.I18n
	// fmt.Println(i18nyml)
	// Admin.RegisterFuncMap("666666", func() {
	// 	fmt.Println(666666)
	// })

	// trans := confi18n.I18n
	// // trans.AddTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "hello world"})
	// // Update Translation
	// // trans.SaveTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "Hello World"})
	// menu_itemname := trans.
	// 	Scope("qor_admin").
	// 	Scope("menus").
	// 	Scope(menuitem)
	// 	// T("zh-CN", "hello-world")

	AssetManager = Admin.AddResource(&asset_manager.AssetManager{}, &admin.Config{Invisible: true})

	// Add Media Library
	Admin.AddResource(&media_library.MediaLibrary{}, &admin.Config{Menu: []string{menuitem}})

	Admin.AddResource(&auth_identity.AuthIdentity{})

	// Add Help
	Help := Admin.NewResource(&help.QorHelpEntry{})
	Help.Meta(&admin.Meta{Name: "Body", Config: &admin.RichEditorConfig{AssetManager: AssetManager}})

	// Add action bar
	ActionBar = action_bar.New(Admin)
	ActionBar.RegisterAction(&action_bar.Action{Name: "Admin Dashboard", Link: "/admin"})

	// Add Translations
	// NOTE: 这是把 i18n interface to Qor Admin
	Admin.AddResource(i18n.I18n, &admin.Config{Menu: []string{menuitem}, Priority: -1})

	// Add Setting
	Admin.AddResource(&settings.Setting{}, &admin.Config{Name: "Shop Setting", Menu: []string{menuitem}, Singleton: true, Priority: 1})

	// IMPORTANT: added by robert
	// 参考: https://blog.csdn.net/freewebsys/article/details/80726805

	SetupNotification(Admin)
	SetupWorker(Admin)
	SetupSEO(Admin)
	SetupWidget(Admin)
	SetupDashboard(Admin)

	application.Router.Mount(app.Config.Prefix, Admin.NewServeMux(app.Config.Prefix))
}
