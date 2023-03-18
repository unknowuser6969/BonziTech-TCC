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

// migrar structs para outro arquivo
type usuario struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
}

var db *sql.DB

func main() {
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

	r := gin.Default()

	r.GET("/api/ping", pong)
	r.GET("/api/usuarios", mostrarTodosUsuarios)
	r.POST("/api/usuarios", adicionarUsuario)
	r.PUT("/api/usuarios/:codUsu", atualizarUsuario)
	r.DELETE("/api/usuarios/:codUsu", deletarUsuario)

	r.Run("127.0.0.1:4000")

}

func pong(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{ "message": "pong!" })
}

func mostrarTodosUsuarios(c *gin.Context) {
	rows, err := db.Query("SELECT * FROM usuarios;")
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o banco de dados." })
		return
	}

	var usuarios []usuario
	for rows.Next() {
		var u usuario
		err := rows.Scan(&u.CodUsuario, &u.Permissoes, &u.Nome, &u.Email, &u.Senha)
		if err != nil {
			log.Println(err)
			c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o banco de dados." })
			return
		}

		usuarios = append(usuarios, u)
	}

	if err := rows.Err(); err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o banco de dados." })
		return
	}

	defer rows.Close()

	c.IndentedJSON(http.StatusOK, gin.H{ "usuarios": usuarios })

}

func adicionarUsuario(c *gin.Context) {
	var novoUsuario usuario
	err := c.BindJSON(&novoUsuario)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Dados de usuário inválidos." })
		return
	}

	insert := "INSERT INTO usuarios (permissoes, nome, email, senha) VALUES(?, ?, ?, ?);"
	_, err = db.Exec(insert, novoUsuario.Permissoes, novoUsuario.Nome, novoUsuario.Email, novoUsuario.Senha)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao inserir usuário no banco de dados." })
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{ "message": "Usuário cadastrado com sucesso!" })

}