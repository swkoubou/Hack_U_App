package main

import (
	"github.com/gin-gonic/gin"
	"github.com/swkoubou/Hack_U_App/Applications"
	"github.com/swkoubou/Hack_U_App/Controllers"
	"github.com/swkoubou/Hack_U_App/db"
	"net/http"
	"os"
)

func main() {
	controller := Controllers.NewWheelchairRentalLocationsSearchController(Applications.NewWheelchairRentalLocationsSearchApplication(db.NewMysql()))
	router := gin.Default()

	router.Static("./Assets", "./Views/Assets")
	router.LoadHTMLGlob("Views/*.html")

	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", gin.H{
			"API_KEY": os.Getenv("Google_Map_API_KEY"),
		})
	})

	router.GET("/Page", controller.GetPage)

	router.GET("/allLocation", controller.GetAllLocations)

	router.GET("/search", controller.SearchTags)

	router.GET("/allTag", controller.GetAllTags)

	router.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
