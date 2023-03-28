// usuarios.go contém o microserviço de usuários
package main

import (
	"database/sql"
	"log"
	"net/http"

	"connect-ms-usuarios/utils"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type usuario struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
}

var db *sql.DB

func main() {

	db = utils.ConectarBD()

	r := gin.Default()

	r.GET("/api/usuarios", mostrarTodosUsuarios)
	r.GET("/api/usuarios/:codUsu", mostrarUsuario)
	r.POST("/api/usuarios", adicionarUsuario)
	r.PUT("/api/usuarios/:codUsu", atualizarUsuario)
	r.DELETE("/api/usuarios/:codUsu", deletarUsuario)

	r.Run("127.0.0.1:4002")

}


func mostrarUsuario(c *gin.Context) {
	codUsu := c.Param("codUsu")

	rows := db.QueryRow("SELECT cod_usu, permissoes, nome, email FROM usuarios WHERE cod_usu = ?;", codUsu)

	var u usuario
	err := rows.Scan(&u.CodUsuario, &u.Permissoes, &u.Nome, &u.Email)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro procurar usuário. Tente novamente." })
		return
	}

	if u.Permissoes == "" {
		c.IndentedJSON(http.StatusNotFound, gin.H{ "error": "Usuário não encontrado." })
		return
	} 

	c.IndentedJSON(http.StatusOK, u)
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

	if novoUsuario.Permissoes == "" {
		novoUsuario.Permissoes = "Leitura"
	}
	if novoUsuario.Nome == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Nome de usuário não pode estar vazio." })
		return
	}
	if novoUsuario.Email == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Email inválido." })
		return
	}
	if len(novoUsuario.Senha) != 128 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Senha inválida." })
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

func atualizarUsuario(c *gin.Context) {
	codUsu := c.Param("codUsu")

	var u usuario
	err := c.BindJSON(&u)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao atualizar usuário. Tente novamente." })
		return
	}

	if u.Permissoes == "" || u.Nome == "" || u.Email == "" || u.Senha == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Parâmetros insuficientes." })
		return
	}
	
	if u.Senha != "" && len(u.Senha) != 128 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Senha inválida." })
		return
	}
	
	update := "UPDATE usuarios SET permissoes = ?, nome = ?, email = ?, senha = ? WHERE cod_usu = ?;"
	_, err = db.Exec(update, u.Permissoes, u.Nome, u.Email, u.Senha, codUsu)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao atualizar usuário. Tente novamente." })
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{ "message": "Usuário atualizado com sucesso!" })

}

func deletarUsuario(c *gin.Context) {
	codUsu := c.Param("codUsu")

	query := "SELECT cod_usu FROM usuarios WHERE cod_usu = ? AND permissoes <> 'Administrador';"
	rows := db.QueryRow(query, codUsu)

	var codUsuRows int
	err := rows.Scan(&codUsuRows)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Usuário não existe, ou não pode ser deletado." })
		return
	}

	delete := "DELETE FROM usuarios WHERE cod_usu = ?;"
	_, err = db.Exec(delete, codUsu)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao deletar usuário." })
		return
	}

	c.IndentedJSON(http.StatusInternalServerError, gin.H{ "message": "Usuário deletado com sucesso!" })

}