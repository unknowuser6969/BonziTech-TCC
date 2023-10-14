// auth.go contém as funcionalidades de autenticação
// de usuários e suas sessões
package services 

import (
	"bytes"
	"database/sql"
	"encoding/json"
    "io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"

	"github.com/vidacalura/BonziTech-TCC/internal/models"
)

var DB *sql.DB

func ValidarLogin(c *gin.Context) {
	var u models.UsuarioResponse
	err := c.BindJSON(&u)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": "Dados de usuário inválidos." })
		return
	}

	// Chama microserviço de usuários para validação de email e senha
	valuesUsuario := map[string]string{ "email": u.Email, "senha": u.Senha }
	jsonValue, _ := json.Marshal(valuesUsuario)

	respUsuariosLogin, err := http.Post(
		"http://" + os.Getenv("dominio") + "/api/usuarios/login", "Application/JSON",
		bytes.NewBuffer(jsonValue))
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
	}

	defer respUsuariosLogin.Body.Close()
    resBody, err := ioutil.ReadAll(respUsuariosLogin.Body)

    if err := json.Unmarshal(resBody, &u); err != nil {
        log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
    }

	if u.Error != "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": u.Error })
		return
	}

	// Chama microserviço de sessão para criação de nova sessão
	valuesSessao := map[string]int{ "codUsuario": u.CodUsuario }
	jsonValue, _ = json.Marshal(valuesSessao)

	respSessao, err := http.Post(
		"http://" + os.Getenv("dominio") + "/api/sessao", "Application/JSON",
		bytes.NewBuffer(jsonValue))
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
	}

	defer respSessao.Body.Close()
    resBody, err = ioutil.ReadAll(respSessao.Body)

	var s models.SessaoResponse
    if err := json.Unmarshal(resBody, &s); err != nil {
        log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
    }

	if s.Error != "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": s.Error })
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"message": "Usuário autenticado com sucesso!", "codSessao": s.CodSessao })
}

func ValidarPermissoesUsuario(c *gin.Context) {
	var s models.SessaoResponse

	codSessaoStr := c.Request.Header["Codsessao"]
	if codSessaoStr == nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": "Você precisa estar logado para ter acesso ao sistema" })
		c.Abort()
		return
	}

	codSessao, err := strconv.Atoi(codSessaoStr[0])
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao receber sessão de usuário." })
		return
	}
	s.CodSessao = codSessao

	if s.CodSessao == 0 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": "Você precisa estar logado para realizar esata ação." })
		c.Abort()
		return
	}

	// TODO: arrumar
	respSessao, err := http.Get(
		"http://" + os.Getenv("dominio") + "/api/sessao/" + strconv.Itoa(s.CodSessao))
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		c.Abort()
		return
	}

	defer respSessao.Body.Close()
    resBody, err := ioutil.ReadAll(respSessao.Body)

    if err := json.Unmarshal(resBody, &s); err != nil {
        log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao conectar com o servidor. Tente novamente mais tarde." })
		return
    }

	if s.Error != "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": s.Error })
		return
	}	

	// TODO: verificar se sessão tem mais de 1 dia

	// verificar se sessão já está fechada
	if s.Saida.Valid {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": "Sessão de usuário expirou. Faça login e tente novamente." })
		return
	}

	// TODO: Receber usuário

	c.IndentedJSON(http.StatusOK, gin.H{ "message": "", "usuario": "" }) // TODO: trocar ""
}