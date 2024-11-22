/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package javaapplication1;

/**
 *
 * @author ra193934
 */
import modelo.DadosPessoaisM;
import controle.DadosPessoaisC;

public class JavaApplication1 {

    public static void main(String[] args) {
        // Criação de um objeto da classe DadosPessoaisM com os dados
        DadosPessoaisM pessoa = new DadosPessoaisM(
                "123.456.789-00",
                "João Silva",
                "12.345.678-9",
                'M',
                "01/01/1990",
                "joao.silva@example.com",
                "(11) 12345-6789",
                "(11) 98765-4321",
                "Rua Fictícia",
                123,
                "Centro",
                "São Paulo",
                "SP",
                "12345-678",
                "Sem observações");

//        // Criação do objeto da classe DadosPessoaisC
//        DadosPessoaisC controle = new DadosPessoaisC();
//
//        // Cadastrar pessoa
//        String respostaCadastro = controle.cadastrarPessoa(pessoa);
//        System.out.println(respostaCadastro); // Exibe resposta de cadastro
//
//        // Consultar pessoas (exibe a resposta de consulta)
//        String respostaConsulta = controle.consultarPessoas();
//        System.out.println(respostaConsulta);

//        // Atualizar pessoa (alterando dados de João)
//        pessoa.setNome("João Silva Santos");
//        pessoa.setEmail("joao.silva.santos@example.com");
//        String respostaAtualizacao = controle.atualizarPessoa(pessoa);
//        System.out.println(respostaAtualizacao); // Exibe resposta de atualização
//
//        // Excluir pessoa (exclui pelo CPF)
//        String respostaExclusao = controle.excluirPessoa("123.456.789-00");
//        System.out.println(respostaExclusao); // Exibe resposta de exclusão
    }
}
