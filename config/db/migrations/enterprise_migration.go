// +build enterprise

package migrations

import "qorproj/app/enterprise"

func init() {
	AutoMigrate(&enterprise.QorMicroSite{})
}
