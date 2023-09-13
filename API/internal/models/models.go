// models.go contém os modelos das tabelas e campos do
// banco de dados da aplicação
package models

import "database/sql"

type Categoria struct {
	CodCat     int    `json:"codCat"`
	NomeCat    string `json:"nomeCat"`
	UnidMedida string `json:"unidMedida"`
	Montagem   bool   `json:"montagem"`
	Apelido    string `json:"apelido"`
}

type Componente struct {
	CodComp          int             `json:"codComp"`
	CodPeca          string          `json:"codPeca"`
	Especificacao    string          `json:"especificacao"`
	CodCat           int             `json:"codCat"`
	CodSubcat        sql.NullInt64   `json:"codCat"`
	DiamInterno      sql.NullString  `json:"diamInterno"`
	DiamExterno      sql.NullFloat64 `json:"diamExterno"`
	DiamNominal      sql.NullString  `json:"diamNominal"`
	MedidaD          sql.NullInt64   `json:"medidaD"`
	Costura          sql.NullBool    `json:"costura"`
	PrensadoReusavel sql.NullString  `json:"prensadoReusavel"`
	Mangueira        sql.NullString  `json:"mangueira"`
	Material         sql.NullString  `json:"material"`
	Norma            sql.NullString  `json:"norma"`
	Bitola           sql.NullInt64   `json:"bitola"`
	ValorEntrada     float64         `json:"valorEntrada"`
	ValorSaida       float64         `json:"valorEntrada"`
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
	CodSubcat int    `json:"codSubcat"`
	CodCat    int    `json:"codCat"`
	Nome      string `json:"nome"`
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