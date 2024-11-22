CREATE TABLE dados_pessoais (
    cpf VARCHAR(14) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    rg VARCHAR(12),
    sexo CHAR(1),
    data_nasc VARCHAR(10),
    email VARCHAR(100),
    fone1 VARCHAR(15),
    fone2 VARCHAR(15),
    rua VARCHAR(100),
    numero INTEGER,
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado VARCHAR(2),
    cep VARCHAR(9),
    obs TEXT
);

select * from dados_pessoais;

drop table dados_pessoais;

