/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controle;
//importacoes necessarias para o arraylist funcionar

import modelo.DadosPessoaisM;

/**
 *
 * @author ra193934
 */
public class DadosPessoaisC {

    String resposta = "";
    Conexao banco = new Conexao();

    public String cadastrarPessoa(DadosPessoaisM pessoa) {
        try {
            banco.ConectaBD();

            String SQL = "INSERT INTO dados_pessoais VALUES('"
                    + pessoa.getNome() + "','"
                    + pessoa.getCPF() + "','"
                    + pessoa.getRG() + "','"
                    + pessoa.getSexo() + "','"
                    + pessoa.getDataNasc() + "','"
                    + pessoa.getEmail() + "','"
                    + pessoa.getFone1() + "','"
                    + pessoa.getFone2() + "','"
                    + pessoa.getRua() + "',"
                    + pessoa.getNumero() + ",'"
                    + pessoa.getBairro() + "','"
                    + pessoa.getCidade() + "','"
                    + pessoa.getEstado() + "','"
                    + pessoa.getCEP() + "','"
                    + pessoa.getObs() + "')";

            banco.getStatement().execute(SQL);
            banco.destroy();
            resposta = "Pessoa cadastrada com sucesso!";

        } catch (Exception erro) {
            erro.printStackTrace();
            resposta = "Falha ao cadastrar pessoa: " + erro.getMessage();
        }
        return resposta;
    }

    // Método para consultar
    public String consultarPessoas() {
        try {
            banco.ConectaBD();
            String SQL = "SELECT * FROM dados_pessoais";
            Conexao.resultado = banco.getStatement().executeQuery(SQL);
            resposta = "Consulta realizada com sucesso!";

        } catch (Exception erro) {
            resposta = "Falha na consulta: " + erro.getMessage();
        }
        return resposta;
    }

    // Método para excluir
    public String excluirPessoa(String cpf) {
        try {
            banco.ConectaBD();
            String SQL = "DELETE FROM dados_pessoais WHERE cpf = '" + cpf + "'";
            banco.getStatement().execute(SQL);
            banco.destroy();
            resposta = "Pessoa excluída com sucesso!";

        } catch (Exception erro) {
            resposta = "Falha ao excluir pessoa: " + erro.getMessage();
        }
        return resposta;
    }

    // Método para atualizar
    public String atualizarPessoa(DadosPessoaisM pessoa) {
        try {
            banco.ConectaBD();
            String SQL = "UPDATE dados_pessoais SET "
                    + "nome = '" + pessoa.getNome() + "',"
                    + "rg = '" + pessoa.getRG() + "',"
                    + "sexo = '" + pessoa.getSexo() + "',"
                    + "data_nasc = '" + pessoa.getDataNasc() + "',"
                    + "email = '" + pessoa.getEmail() + "',"
                    + "fone1 = '" + pessoa.getFone1() + "',"
                    + "fone2 = '" + pessoa.getFone2() + "',"
                    + "rua = '" + pessoa.getRua() + "',"
                    + "numero = " + pessoa.getNumero() + ","
                    + "bairro = '" + pessoa.getBairro() + "',"
                    + "cidade = '" + pessoa.getCidade() + "',"
                    + "estado = '" + pessoa.getEstado() + "',"
                    + "cep = '" + pessoa.getCEP() + "',"
                    + "obs = '" + pessoa.getObs() + "' "
                    + "WHERE cpf = '" + pessoa.getCPF() + "'";

            banco.getStatement().execute(SQL);
            banco.destroy();
            resposta = "Dados atualizados com sucesso!";

        } catch (Exception erro) {
            resposta = "Falha ao atualizar dados: " + erro.getMessage();
        }
        return resposta;
    }
}
