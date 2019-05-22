package auth

import (
	"time"

	"github.com/qor/auth"
	"github.com/qor/auth/authority"

	// "github.com/qor/auth/providers/facebook"
	// "github.com/qor/auth/providers/github"
	// "github.com/qor/auth/providers/google"
	// "github.com/qor/auth/providers/twitter"

	"qorproj/config"
	"qorproj/config/bindatafs"
	"qorproj/config/db"
	"qorproj/models/users"

	"github.com/qor/auth_themes/clean"

	"github.com/qor/render"
)

var (
	// Auth initialize Auth for Authentication
	Auth = clean.New(&auth.Config{
		DB:         db.DB,
		Mailer:     config.Mailer,
		Render:     render.New(&render.Config{AssetFileSystem: bindatafs.AssetFS.NameSpace("auth")}),
		UserModel:  users.User{},
		Redirector: auth.Redirector{RedirectBack: config.RedirectBack},
		// LoginHandler: func(context *auth.Context, authorize func(*auth.Context) (*claims.Claims, error)) {
		// 	var (
		// 		req         = context.Request
		// 		w           = context.Writer
		// 		claims, err = authorize(context)
		// 	)
		// 	fmt.Println(claims)
		// 	if err == nil && claims != nil {
		// 		context.SessionStorer.Flash(w, req, session.Message{Message: "logged"})
		// 		respondAfterLogged(claims, context)
		// 		return
		// 	}

		// },
	})

	// Authority initialize Authority for Authorization
	Authority = authority.New(&authority.Config{
		Auth: Auth,
	})
)

func init() {
	// IMPORTANT: added by robert
	// 参考: https://blog.csdn.net/freewebsys/article/details/80726805
	// Migrate AuthIdentity model, AuthIdentity will be used to save auth info,
	// like username/password, oauth token, you could change that.
	// db.DB.AutoMigrate(&auth_identity.AuthIdentity{})

	// IMPORTANT: added by robert
	// 参考: https://blog.csdn.net/freewebsys/article/details/80726805
	// Register Auth providers
	// Allow use username/password

	// Allow use username/password

	// Auth.RegisterProvider(github.New(&config.Config.Github))
	// Auth.RegisterProvider(google.New(&config.Config.Google))
	// Auth.RegisterProvider(facebook.New(&config.Config.Facebook))
	// Auth.RegisterProvider(twitter.New(&config.Config.Twitter))

	Authority.Register("logged_in_half_hour", authority.Rule{TimeoutSinceLastLogin: time.Minute * 30})
}
