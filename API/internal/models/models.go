// models.go contém os modelos das tabelas e campos do
// banco de dados da aplicação
package models

import "database/sql"

type Log struct {
	CodLog    int    `json:"codLog"`
	TipoReq   string `json:"tipoReq"`
	Caminho   string `json:"caminho"`
	StatusRes int    `json:"statusRes"`
	CodSessao int    `json:"codSessao"`
	Data      string `json:"data"`
}

type Sessao struct {
	CodSessao  int    		  `json:"codSessao"`
	CodUsuario int    		  `json:"codUsuario"`
	Entrada    string 		  `json:"entrada"`
	Saida      sql.NullString `json:"saida"`
}

type SessaoResponse struct {
	CodSessao  int    		  `json:"codSessao"`
	CodUsuario int    		  `json:"codUsuario"`
	Entrada    string 		  `json:"entrada"`
	Saida      sql.NullString `json:"saida"`
	Error      string         `json:"error"`
	Message    string         `json:"message"`
}

type Usuario struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
	Ativo      bool   `json:"ativo"`
}

type UsuarioResponse struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
	Ativo      bool   `json:"ativo"`
	Error      string `json:"error"`
	Message    string `json:"message"`
}