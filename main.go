package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"

	"qorproj/app/account"
	adminapp "qorproj/app/admin"

	"github.com/qor/admin"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/qor/publish2"
	"github.com/qor/qor"

	"qorproj/app/api"
	"qorproj/app/enterprise"
	"qorproj/app/home"
	"qorproj/app/orders"
	"qorproj/app/pages"
	"qorproj/app/products"
	"qorproj/app/static"
	"qorproj/app/stores"
	"qorproj/config"
	"qorproj/config/application"
	"qorproj/config/auth"
	"qorproj/config/bindatafs"
	"qorproj/config/db"
	_ "qorproj/config/db/migrations"
	"qorproj/config/i18n"
	"qorproj/utils/funcmapmaker"

	"github.com/qor/qor/utils"
)

func main() {
	cmdLine := flag.NewFlagSet(os.Args[0], flag.ContinueOnError)
	compileTemplate := cmdLine.Bool("compile-templates", false, "Compile Templates")
	cmdLine.Parse(os.Args[1:])

	var (
		// NOTE: router
		Router = chi.NewRouter()
		// NOTE: Admin
		Admin = admin.New(&admin.AdminConfig{
			SiteName: "Qor Demo",
			Auth:     auth.AdminAuth{},
			DB:       db.DB.Set(publish2.VisibleMode, publish2.ModeOff).Set(publish2.ScheduleMode, publish2.ModeOff),
			I18n:     i18n.I18n,
		})
		// NOTE: Application
		Application = application.New(&application.Config{
			Router: Router,
			Admin:  Admin,
			DB:     db.DB,
		})
	)

	funcmapmaker.AddFuncMapMaker(auth.Auth.Config.Render)

	Router.Use(func(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			// for demo, don't use this for your production site
			w.Header().Add("Access-Control-Allow-Origin", "*")
			handler.ServeHTTP(w, req)
		})
	})

	Router.Use(middleware.RealIP)
	Router.Use(middleware.Logger)
	Router.Use(middleware.Recoverer)
	Router.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			var (
				tx         = db.DB
				qorContext = &qor.Context{Request: req, Writer: w}
			)

			if locale := utils.GetLocale(qorContext); locale != "" {
				tx = tx.Set("l10n:locale", locale)
			}

			ctx := context.WithValue(req.Context(), utils.ContextDBName, publish2.PreviewByDB(tx, qorContext))
			next.ServeHTTP(w, req.WithContext(ctx))
		})
	})

	Application.Use(api.New(&api.Config{}))
	Application.Use(adminapp.New(&adminapp.Config{}))
	Application.Use(home.New(&home.Config{}))
	Application.Use(products.New(&products.Config{}))
	Application.Use(account.New(&account.Config{}))
	Application.Use(orders.New(&orders.Config{}))
	Application.Use(pages.New(&pages.Config{}))
	Application.Use(enterprise.New(&enterprise.Config{}))
	Application.Use(stores.New(&stores.Config{}))
	Application.Use(static.New(&static.Config{
		Prefixs: []string{"/system"},
		// NOTE: 这里居然是错的
		// Handler: utils.FileServer(http.Dir(filepath.Join(config.Root, "public"))),
		Handler: bindatafs.AssetFS.FileServer(http.Dir("public")),
	}))
	Application.Use(static.New(&static.Config{
		Prefixs: []string{"javascripts", "stylesheets", "images", "dist", "fonts", "vendors", "favicon.ico"},
		Handler: bindatafs.AssetFS.FileServer(http.Dir("public"), "javascripts", "stylesheets", "images", "dist", "fonts", "vendors", "favicon.ico"),
	}))

	if *compileTemplate {
		bindatafs.AssetFS.Compile()
	} else {
		fmt.Printf("Listening on: %v\n", config.Config.Port)
		if config.Config.HTTPS {
			if err := http.ListenAndServeTLS(fmt.Sprintf(":%d", config.Config.Port), "config/local_certs/server.crt", "config/local_certs/server.key", Application.NewServeMux()); err != nil {
				panic(err)
			}
		} else {
			if err := http.ListenAndServe(fmt.Sprintf(":%d", config.Config.Port), Application.NewServeMux()); err != nil {
				panic(err)
			}
		}
	}
}
