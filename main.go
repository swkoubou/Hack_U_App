package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

func main() {
	router := gin.Default()

	router.Static("./Assets", "./Assets")
	router.LoadHTMLGlob("Views/*.html")

	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", gin.H{
			"API_KEY": os.Getenv("Google_Map_API_KEY"),
		})
	})

	router.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}