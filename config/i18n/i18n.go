package i18n

import (
	"fmt"
	"path/filepath"

	"github.com/qor/i18n"
	"github.com/qor/i18n/backends/database"
	"github.com/qor/i18n/backends/yaml"

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
}
