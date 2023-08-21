// models.go contém os modelos das tabelas e campos do
// banco de dados da aplicação
package models

import "database/sql"

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

type SessaoResponse struct {
	CodSessao  int    		  `json:"codSessao"`
	CodUsuario int    		  `json:"codUsuario"`
	Entrada    string 		  `json:"entrada"`
	Saida      sql.NullString `json:"saida"`
	Error      string         `json:"error"`
	Message    string         `json:"message"`
}

type Sessao struct {
	CodSessao  int    		  `json:"codSessao"`
	CodUsuario int    		  `json:"codUsuario"`
	Entrada    string 		  `json:"entrada"`
	Saida      sql.NullString `json:"saida"`
}

type Usuario struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
	Ativo      bool   `json:"ativo"`
}