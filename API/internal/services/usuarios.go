// usuarios.go contém as funcionalidades de manejo 
// de usuários da aplicação
package services 

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"

	models "github.com/vidacalura/BonziTech-TCC/internal/models"
	utils "github.com/vidacalura/BonziTech-TCC/internal/utils"
)

func MostrarUsuario(c *gin.Context) {
	codUsu := c.Param("codUsu")

	rows := DB.QueryRow("SELECT cod_usu, permissoes, nome, email, ativo FROM usuarios WHERE cod_usu = ?;", codUsu)

	var u models.Usuario
	err := rows.Scan(&u.CodUsuario, &u.Permissoes, &u.Nome, &u.Email, &u.Ativo)
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

func MostrarTodosUsuarios(c *gin.Context) {
	// TODO: mostrar apenas usuários ativos
	rows, err := DB.Query("SELECT * FROM usuarios;")
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao conectar com o banco de dados." })
		return
	}

	var usuarios []models.Usuario
	for rows.Next() {
		var u models.Usuario
		err := rows.Scan(&u.CodUsuario, &u.Permissoes, &u.Nome, &u.Email, &u.Senha, &u.Ativo)
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

	c.IndentedJSON(http.StatusOK, gin.H{ "usuarios": usuarios, "message": "Usuários encontrados com sucesso!" })
}

func ValidarDadosLogin(c *gin.Context) {
	var u models.Usuario
	err := c.BindJSON(&u)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Dados de usuário inválidos." })
		return
	}

	if u.Email == "" || u.Senha == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Email e senha não podem estar vazios." })
		return
	}
	if len(u.Senha) != 128 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Senha inválida." })
		return
	}

	u.Senha = utils.CriptografarSenha(u.Senha)

	query := "SELECT cod_usu FROM usuarios WHERE BINARY email = ? AND BINARY senha = ?;"
	rows := DB.QueryRow(query, u.Email, u.Senha)

	var codUsu int
	err = rows.Scan(&codUsu)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{ "error": "Usuário ou senha incorretos." })
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{ "codUsuario": codUsu, "message": "Usuário encontrado com sucesso!" })
}

func AdicionarUsuario(c *gin.Context) {
	var novoUsuario models.Usuario
	err := c.BindJSON(&novoUsuario)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Dados de usuário inválidos." })
		return
	}

	if len(novoUsuario.Senha) < 8 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Senha precisa de pelo menos 8 caracteres." })
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

	novoUsuario.Senha = utils.CriptografarSenha(novoUsuario.Senha)

	insert := "INSERT INTO usuarios (permissoes, nome, email, senha, ativo) VALUES(?, ?, ?, ?, TRUE);"
	_, err = DB.Exec(insert, novoUsuario.Permissoes, novoUsuario.Nome, novoUsuario.Email, novoUsuario.Senha)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao inserir usuário no banco de dados." })
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{ "message": "Usuário cadastrado com sucesso!" })
}

// TODO: reescrever para aceitar apenas 1 argumento
func AtualizarUsuario(c *gin.Context) {
	codUsu := c.Param("codUsu")

	var u models.Usuario
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

	// TODO: criptografar senha
	
	if u.Senha != "" && len(u.Senha) != 128 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Senha inválida." })
		return
	}
	
	update := "UPDATE usuarios SET permissoes = ?, nome = ?, email = ?, senha = ? WHERE cod_usu = ?;"
	_, err = DB.Exec(update, u.Permissoes, u.Nome, u.Email, u.Senha, codUsu)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao atualizar usuário. Tente novamente." })
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{ "message": "Usuário atualizado com sucesso!" })
}

func DeletarUsuario(c *gin.Context) {
	codUsu := c.Param("codUsu")

	query := "SELECT cod_usu FROM usuarios WHERE cod_usu = ? AND permissoes <> 'Administrador';"
	rows := DB.QueryRow(query, codUsu)

	var codUsuRows int
	err := rows.Scan(&codUsuRows)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Usuário não existe, ou não pode ser deletado." })
		return
	}

	// TODO: inativar ao invés de deletar
	delete := "DELETE FROM usuarios WHERE cod_usu = ?;"
	_, err = DB.Exec(delete, codUsu)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao deletar usuário." })
		return
	}

	c.IndentedJSON(http.StatusInternalServerError, gin.H{ "message": "Usuário deletado com sucesso!" })
}