package products

import (
	"net/http"
	"strings"

	"github.com/qor/render"
	"qorproj/models/products"
	"qorproj/utils"
)

// Controller products controller
type Controller struct {
	View *render.Render
}

// Index products index page
func (ctrl Controller) Index(w http.ResponseWriter, req *http.Request) {
	var (
		Products []products.Product
		tx       = utils.GetDB(req)
	)

	tx.Preload("Category").Find(&Products)

	ctrl.View.Execute("index", map[string]interface{}{}, req, w)
}

// Gender products gender page
func (ctrl Controller) Gender(w http.ResponseWriter, req *http.Request) {
	var (
		Products []products.Product
		tx       = utils.GetDB(req)
	)

	/* ------------------------------------------------------
		  //NOTE: 修复导航数据空的问题
		  原因是因为数据库里Products表gender字段存的是Men、Kids、Women, 导致查询出来的是空数组 修复方法:
	    将utils.URLParam("gender", req) 获取出来的首字母大写
	    app/products/handlers.go
		  ------------------------------------------------------ */
	//
	tx.Where(&products.Product{Gender: utils.URLParam("gender", req)}).Preload("Category").Find(&Products)
	// tx.Where(&products.Product{Gender: strings.Title(utils.URLParam("gender", req))}).Preload("Category").Find(&Products)
	ctrl.View.Execute("gender", map[string]interface{}{"Products": Products}, req, w)
}

// Show product show page
func (ctrl Controller) Show(w http.ResponseWriter, req *http.Request) {
	var (
		product        products.Product
		colorVariation products.ColorVariation
		codes          = strings.Split(utils.URLParam("code", req), "_")
		productCode    = codes[0]
		colorCode      string
		tx             = utils.GetDB(req)
	)

	if len(codes) > 1 {
		colorCode = codes[1]
	}

	if tx.Preload("Category").Where(&products.Product{Code: productCode}).First(&product).RecordNotFound() {
		http.Redirect(w, req, "/", http.StatusFound)
	}

	tx.Preload("Product").Preload("Color").Preload("SizeVariations.Size").Where(&products.ColorVariation{ProductID: product.ID, ColorCode: colorCode}).First(&colorVariation)
	ctrl.View.Execute("show", map[string]interface{}{"CurrentColorVariation": colorVariation}, req, w)
}

// Category category show page
func (ctrl Controller) Category(w http.ResponseWriter, req *http.Request) {
	var (
		category products.Category
		Products []products.Product
		tx       = utils.GetDB(req)
	)

	if tx.Where("code = ?", utils.URLParam("code", req)).First(&category).RecordNotFound() {
		http.Redirect(w, req, "/", http.StatusFound)
	}

	tx.Where(&products.Product{CategoryID: category.ID}).Preload("ColorVariations").Find(&Products)

	ctrl.View.Execute("category", map[string]interface{}{"CategoryName": category.Name, "Products": Products}, req, w)
}
