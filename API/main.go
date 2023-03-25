// main.go é a API gateway do sistema
package main

import (
	"database/sql"
	"log"
	"net/http"
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
	r.GET("/api/usuarios", mostrarTodosUsuarios)
	r.GET("/api/usuarios/:codUsu", mostrarUsuario)
	r.POST("/api/usuarios", adicionarUsuario)
	r.PUT("/api/usuarios/:codUsu", atualizarUsuario)
	r.DELETE("/api/usuarios/:codUsu", deletarUsuario)

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

func mostrarTodosUsuarios(c *gin.Context) {
	res, err := http.Get(os.Getenv("UsuariosMS") + "/usuarios")
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Não foi possível acessar o serviço de usuários." })
		return
	}

	c.IndentedJSON(res.StatusCode, res.Body)
}

func mostrarUsuario(c *gin.Context) {

}

func adicionarUsuario(c *gin.Context) {

}

func atualizarUsuario(c *gin.Context) {

}

func deletarUsuario(c *gin.Context) {

}