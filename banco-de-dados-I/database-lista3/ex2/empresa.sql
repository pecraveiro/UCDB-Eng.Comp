create database empresa;

create table empregado (
  CODIGO integer NOT NULL PRIMARY KEY,
  NOME varchar(50) NOT NULL,
  SOBRENOME varchar(50) NOT NULL,
  DATANASC date,
  ENDERECO varchar(50),
  SEXO char(1) CHECK (SEXO IN ('M', 'F')),  -- Verifica se o sexo é 'M' ou 'F'
  SALARIO integer,
  CODSUPER integer REFERENCES empregado(CODIGO),  -- Chefe se refere a outro funcionário
  CODDPTO integer NOT NULL REFERENCES departamento(CODIGO)  -- Departamento
);

-- Criando a tabela
insert into empregado values('1','JOHN','B','SMITH','65/09/01','RUA 123','M','30000','2','5');


create table projeto (
  CODPROJETO integer NOT NULL PRIMARY KEY,
  NOME varchar(50) NOT NULL,
  LOCALIZACAO varchar(50),
  CODDPTO integer NOT NULL REFERENCES departamento(CODIGO)  -- Departamento
);

create table dependente (
  CODEMP integer NOT NULL PRIMARY KEY,
  NOME varchar(50) NOT NULL,
  SEXO char(1) CHECK (SEXO IN ('M', 'F')),
  DATANASC date,
  PARENTESCO varchar(50),
  FOREIGN KEY (CODEMP) REFERENCES empregado(CODIGO)  -- Dependente de um funcionário
);

create table trabalha_em (
  CODEMP integer NOT NULL,
  CODPROJETO integer NOT NULL,
  HORAS integer,
  PRIMARY KEY (CODEMP, CODPROJETO),  -- Chave composta para evitar linhas duplicadas
  FOREIGN KEY (CODEMP) REFERENCES empregado(CODIGO),
  FOREIGN KEY (CODPROJETO) REFERENCES projeto(CODPROJETO)
);

create table departamento (
  CODIGO integer NOT NULL PRIMARY KEY,
  NOMEDPTO varchar(50) NOT NULL,
  CODGERENTE integer REFERENCES empregado(CODIGO),  -- Gerente do departamento
  GERDTINICIO date
);
