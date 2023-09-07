// models.go contém os modelos das tabelas e campos do
// banco de dados da aplicação
package models

import "database/sql"

type Categoria struct {

}

type Componente struct {
	
}

type Estoque struct {
	CodEstq    int     `json:"codEstq"`
	CodComp    int     `json:"codComp"`
	QuantMin   int     `json:"min"`
	QuantMax   int     `json:"max"`
	QuantAtual float64 `json:"quantidade"`
}

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

type Subcategoria struct {

}

type Usuario struct {
	CodUsuario int 	  `json:"codUsuario"`
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
	Senha	   string `json:"senha"`
	Ativo      bool   `json:"ativo"`
}

type UsuarioPublico struct {
	Permissoes string `json:"permissoes"`
	Nome 	   string `json:"nome"`
	Email	   string `json:"email"`
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