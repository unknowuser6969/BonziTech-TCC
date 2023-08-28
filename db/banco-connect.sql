create database Connect;

create table categorias(
cod_cat int(6) auto_increment primary key,
nome_cat varchar(30) not null,
unid_medida varchar(3) not null,
montagem boolean not null,
apelido varchar(4) not null,
unique(nome_cat)
);

create table subcategorias(
cod_subcat int(7) auto_increment primary key,
cat_principal int(6) not null,
nome_subcat varchar(60) not null,
unique(nome_subcat)
);

create table entradas(
cod_entd int(8) auto_increment primary key,
cod_fab int(6),
data_venda date not null,
quantidade int(6) not null,
nota_fiscal varchar(10), 
valor_total decimal(9,2) not null,
unique(nota_fiscal)
);

-- Lista de todas as entradas identificadas por um cod_entd
create table componentes_entrada(
cod_comp_entd int(8) auto_increment primary key,
cod_entd int(8) not null,
cod_comp int(8) not null,
valor_unit decimal(7,2) not null
);

create table clientes(
cod_cli int(6) auto_increment primary key,
nome_empresa varchar(70) not null,
nome_cli varchar(30) not null,
tipo varchar(32),
dia_reg date not null,
endereco varchar(128),
bairro varchar(30),
cidade varchar(30) not null,
estado varchar(2) not null,
cep varchar(9),
email varchar(255),
unique(nome_cli),
unique(telefone)
);

create table telefones(
cod_tel int(8) auto_increment primary key,
cod_cli int(6) not null,
telefone varchar(19) not null,
nome_tel varchar(45) not null,
tipo_contato varchar(30),
tipo_cli varchar(30)
);

create table estoque( -- componentes em estoque
cod_estq int(8) auto_increment primary key,
cod_comp int(8) not null,
quant_min int(3), 
quant_max int(4),
quantidade decimal(16,13) not null
);

create table componentes( -- lista de componentes salvos
cod_comp int(8) auto_increment primary key,
cod_peca varchar(30) not null,
especificacao varchar(100) not null,
cod_cat int(6) not null,
cod_subcat int(7),
diam_interno varchar(10),
diam_externo decimal(5,2),
diam_nominal varchar(6),
medida_d int(3),
costura boolean,
prensado_reusavel char,
mangueira varchar(30),
material varchar(20),
norma varchar(20),
bitola int(3), -- Sempre com um "-" antes
valor_entrada decimal(9,2) not null,
valor_saida decimal(9,2) not null
);

create table fabricantes(
cod_fab int(6) auto_increment primary key,
nome_fab varchar(45) not null,
razao_social varchar(60),
telefone varchar(19),
fax varchar(19),
celular varchar(19),
nome_contato varchar(50),
endereco varchar(128),
cidade varchar(30),
estado varchar(2),
cep varchar(9)
);

create table vendas(
cod_venda int(8) auto_increment primary key,
data_venda date not null,
quantidade decimal(10,3) not null,
cod_cli int(6),
nome_cli varchar(30),
cod_os int(8) not null, -- ordem de serviço
valor_total decimal(9,2),
descricao varchar(255)
);

-- Lista dos componentes de todas saídas
-- identificados por cod_venda
create table componentes_saida(
cod_comp_venda int(8) auto_increment primary key,
cod_venda int(8) not null,
cod_comp int(8) not null,
valor_unit decimal(7,2) not null
);

create table montagem( 
cod_montagem int(8) auto_increment primary key,
nome_montagem varchar(30) not null,
angulo int(3) not null,
comprimento int(8) not null, -- em milimetros (mm)
medida_d int(6) not null,
instrucoes mediumtext
-- valor_total é computado pelo sistema somando os valores de cada componente
);

create table montagem_componentes(
cod_montagem_comp int(8) auto_increment primary key,
cod_montagem int(8) not null,
cod_comp int(8) not null
);

create table etiquetas( -- save venda
cod_etqt int(8) auto_increment primary key,
cod_venda int(8) not null,
utilizado boolean not null,
unique(cod_venda)
);

create table ordem_servico( -- vendas pendentes
cod_os int(8) auto_increment primary key,
data_emissao datetime not null,
cod_cli int(6) not null,
nome_cli varchar(30),
pedido varchar(255) -- título do orçamento
);

create table usuarios(
cod_usu int(6) auto_increment primary key,
permissoes varchar(20) not null,
nome varchar(30) not null,
email varchar(70) not null,
senha varchar(128) not null,
unique(nome),
unique(email)
);

create table sessao(
cod_sessao int(7) auto_increment primary key,
cod_usu int(6) not null,
entrada datetime not null,
saida datetime
);

CREATE TABLE logs(
cod_log INT(8) PRIMARY KEY AUTO_INCREMENT,
tipo_req VARCHAR(6) NOT NULL,
caminho VARCHAR(255) NOT NULL,
status_res INT(3) NOT NULL,
cod_sessao INT(8),
data DATETIME NOT NULL
);

alter table usuarios auto_increment = 100000;
