// main.go é a API gateway do sistema
package main

import (
	"database/sql"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"

	"connect-API/utils"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var db *sql.DB

func main() {
	
	db = utils.ConectarBD()

	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	r := gin.Default()

	r.Use(validacaoRequest)

	r.GET("/api/ping", pong)
	r.GET("/api/usuarios", usuariosHandler)
	r.GET("/api/usuarios/:codUsu", usuariosHandler)
	r.POST("/api/usuarios", usuariosHandler)
	r.PUT("/api/usuarios/:codUsu", usuariosHandler)
	r.DELETE("/api/usuarios/:codUsu", usuariosHandler)

	r.POST("/api/auth/login", authHandler)

	r.Run("127.0.0.1:4000")

}


func validacaoRequest(c *gin.Context) {
	// Verificar sessão de usuário

	// Validar permissões de usuário

	c.Next()
}

func pong(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{ "message": "pong!" })
}

func usuariosHandler(c *gin.Context) {
	reqUrl, err := url.Parse(os.Getenv("UsuariosMS"))
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
	}

	proxy := httputil.NewSingleHostReverseProxy(reqUrl)

	proxy.ServeHTTP(c.Writer, c.Request)
}

func authHandler(c *gin.Context) {
	reqUrl, err := url.Parse(os.Getenv("AuthMS"))
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
	}

	proxy := httputil.NewSingleHostReverseProxy(reqUrl)

	proxy.ServeHTTP(c.Writer, c.Request)
}