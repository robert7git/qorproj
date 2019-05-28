/*
@Time : 2019-05-26 04:55
@Author : Robert
@File : i18n_test.go
@Software: GoLand
*/
package i18n

import (
	"qorproj/config/i18n"
	"testing"
	//
	//"github.com/jinzhu/gorm"
	//"github.com/qor/i18n"
	//"github.com/qor/i18n/backends/database"
	//"github.com/qor/i18n/backends/yaml"
)


func TestAddResource(t *testing.T) {
	trans := i18n.I18n
	fmt.Println(trans)
}