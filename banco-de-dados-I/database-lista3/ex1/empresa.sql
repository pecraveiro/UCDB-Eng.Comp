create database empresa;

create table funcionario (
    NrMatric numeric not null PRIMARY KEY,
    NmFunc varchar(100) not null,
    DtAdm date,
    Sexo varchar(1),
    CdCargo varchar(3),
    CdDepto varchar(3)
)

insert into funcionario values(1001, 'JOAO SAMPAIO', '10-08-1993', 'M', 'C2', 'D2');
insert into funcionario values(1004, 'LUCIO TORRES', '02-03-1994', 'M', 'C2', 'D2');
insert into funcionario values(1034, 'ROBERTO PEREIRA', '23-05-1992', 'M', 'C3', 'D1');
insert into funcionario values(1021, 'JOSE NOGUEIRA', '10-11-1994', 'M', 'C3', 'D1');
insert into funcionario values(1029, 'RUTH DE SOUZA', '05-01-1992', 'F', 'C1', 'D3');
insert into funcionario values(1095, 'MARIA DA SILVA', '03-09-1992', 'F', 'C4', 'D1');
insert into funcionario values(1023, 'LUIZ DE ALMEIDA', '12-01-1993', 'M', 'C2', 'D2');
insert into funcionario values(1042, 'PEDRO PINHEIRO', '29-07-1994', 'M', 'C4', 'D1');
insert into funcionario values(1048, 'ANA SILVEIRA', '01-06-1993', 'F', 'C5', 'D1');
insert into funcionario values(1015, 'PAULO RODRIGUES', '17-08-1992', 'M', 'C2', 'D2');

select * FROM funcionario 

-- 1) A) Todos os funcionários do departamento 'D1'
select NmFunc from funcionario where CdDepto='D1'

-- 1) B) O nome e a matrícula de todos os funcionários do departamento ‘D1’
select Nmfunc, NrMatric from funcionario where CdDepto='D1'

-- 1) C) A matrícula e o nome do respectivo departamento de todos os funcionários
SELECT f.NrMatric, f.NmFunc, d.NmDepto FROM funcionario f JOIN depto d ON f.CdDepto = d.CdDepto;

-- 1) D) O nome dos funcionários que ganham mais de $500
SELECT f.NmFunc, c.VrSalario FROM cargo c JOIN funcionario f ON c.CdCargo = f.CdCargo WHERE c.VrSalario > 500;

-- 1) E) O ramal do funcionário ‘ANA SILVEIRA’
SELECT d.Ramal FROM funcionario f JOIN depto d ON f.CdDepto = d.CdDepto WHERE f.NmFunc = 'ANA SILVEIRA';

-- 1) F) Os nomes de todos os funcionários com cargo de ‘MECANICO’
SELECT f.NmFunc FROM funcionario f JOIN cargo c ON f.CdCargo = c.CdCargo WHERE c.NmCargo = 'MECÂNICO';

-- 1) G) Os nomes de todos os funcionários que trabalham no mesmo departamento que ‘JOSE NOGUEIRA’

-- 1) H) Os nomes dos departamentos que possuem tanto funcionários como funcionárias
SELECT DISTINCT d.NmDepto FROM funcionario f JOIN depto d ON f.CdDepto = d.CdDepto GROUP BY d.NmDepto HAVING COUNT(DISTINCT f.Sexo) = 2;

create table cargo (
    CdCargo varchar(3) not null PRIMARY KEY,
    NmCargo varchar(100),
    VrSalario numeric
)

insert into cargo values('C1', 'COZINHEIRA', 350)
insert into cargo values('C3', 'AUX. ESCRITÓRIO', 450)
insert into cargo values('C7', 'VIGIA', 400)
insert into cargo values('C2', 'MECANICA', 750)
insert into cargo values('C5', 'GERENTE', 2300)
insert into cargo values('C4', 'ESCRITUARIO', 650)

select * FROM cargo

create table depto (
    CdDepto varchar(3) not null PRIMARY KEY,
    NmDepto varchar(100),
    Ramal varchar(5)
)

insert into depto values('D1','ADMINISTRACAO','221')
insert into depto values('D2','OFICINA','225')
insert into depto values('D3','SERVICOS GERAIS','243')
insert into depto values('D4','VENDAS','258')

select * FROM depto
