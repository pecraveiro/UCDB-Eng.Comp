# Banco de Dados I
## Exercícios de Álgebra Relacinal
### Professor: Alexandro Monteiro Carneiro
### Aluno: 193934 - Pedro M. S. Craveiro

### 1) Com base nas tabelas Funcionário, Cargo e Depto, elaborar as expressões da álgebra relacional que obtenham: 

#### a) Todos os funcionários do departamento ‘D1’:
- select NmFunc from funcionario where CdDepto='D1' ou π NmFunc(σ CdDepto='D1' (funcionario))

#### b) O nome e a matrícula de todos os funcionários do departamento ‘D1’
- select Nmfunc, NrMatric from funcionario where CdDepto='D1' ou π NmFunc,NrMatric(σ CdDepto='D1' (funcionario))