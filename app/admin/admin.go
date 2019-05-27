package admin

import (
	"github.com/qor/action_bar"
	"github.com/qor/admin"
	"github.com/qor/auth/auth_identity"
	"github.com/qor/help"

	"github.com/qor/media/asset_manager"
	"github.com/qor/media/media_library"
	"qorproj/config/application"
	"qorproj/config/i18n"
	"qorproj/models/settings"
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

// NOTE: 国际化相关备用
// Admin.RegisterFuncMap("666666", func() {fmt.Println(666666)})
// trans := confi18n.I18n
// trans.AddTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "hello world"})
// trans.SaveTranslation(&i18n.Translation{Key: "hello-world", Locale: "en-US", Value: "Hello World"})
// menu_itemname := trans.Scope("qor_admin").Scope(ROOTMENU).T("zh-CN", "hello-world")
// Admin.AddMenu(&admin.Menu{Name: "Api Management", Priority: 1})

// ConfigureApplication configure application
func (app App) ConfigureApplication(application *application.Application) {
	ROOTMENU := "Site Management"
	Admin := application.Admin

	AssetManager = Admin.AddResource(&asset_manager.AssetManager{}, &admin.Config{Invisible: true})

	// Add Media Library
	Admin.AddResource(&media_library.MediaLibrary{}, &admin.Config{Menu: []string{ROOTMENU}})

	Admin.AddResource(&auth_identity.AuthIdentity{})

	// Add Help
	Help := Admin.NewResource(&help.QorHelpEntry{})
	Help.Meta(&admin.Meta{Name: "Body", Config: &admin.RichEditorConfig{AssetManager: AssetManager}})

	// Add action bar
	ActionBar = action_bar.New(Admin)
	ActionBar.RegisterAction(&action_bar.Action{Name: "Admin Dashboard", Link: "/admin"})

	// Add Translations
	// NOTE: 这是把 i18n interface to Qor Admin
	Admin.AddResource(i18n.I18n, &admin.Config{Menu: []string{ROOTMENU}, Priority: -1})

	// Add Setting
	Admin.AddResource(&settings.Setting{}, &admin.Config{Name: "Shop Setting", Menu: []string{ROOTMENU}, Singleton: true, Priority: 1})

	SetupNotification(Admin)
	SetupWorker(Admin)
	SetupSEO(Admin)
	SetupWidget(Admin)
	SetupDashboard(Admin)

	application.Router.Mount(app.Config.Prefix, Admin.NewServeMux(app.Config.Prefix))
}
