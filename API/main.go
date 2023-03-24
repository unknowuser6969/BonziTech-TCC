package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var db *sql.DB

func main() {
	
	conectarBD()

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


func conectarBD() {
	// Pega dados de .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	// Conecta ao banco de dados
	db, err = sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		log.Fatal(err)
	}

	// Checa conexão com o banco de dados
	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}
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
	
}

func mostrarUsuario(c *gin.Context) {

}

func adicionarUsuario(c *gin.Context) {

}

func atualizarUsuario(c *gin.Context) {

}

func deletarUsuario(c *gin.Context) {

}