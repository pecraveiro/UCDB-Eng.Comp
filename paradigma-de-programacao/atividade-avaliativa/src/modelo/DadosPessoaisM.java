/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modelo;

/**
 *
 * @author ra193934
 */
public class DadosPessoaisM extends EnderecoM {

    // Atributos
    private String nome;
    private String CPF;
    private String RG;
    private char sexo;
    private String dataNasc;
    private String email;
    private String fone1;
    private String fone2;

    //Métodos get setters e constructor
    //A classe DadosPessoais herda EnderecoM, dessa forma, como o Matheus me ajudou, nós vamos fazer um controlador utilizando Arraylist, para facilitar a integração

    public DadosPessoaisM(String nome, String CPF, String RG, char sexo, String dataNasc, String email, String fone1, String fone2, String rua, int numero, String bairro, String cidade, String estado, String CEP, String obs) {
        super(rua, numero, bairro, cidade, estado, CEP, obs);
        this.nome = nome;
        this.CPF = CPF;
        this.RG = RG;
        this.sexo = sexo;
        this.dataNasc = dataNasc;
        this.email = email;
        this.fone1 = fone1;
        this.fone2 = fone2;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCPF() {
        return CPF;
    }

    public void setCPF(String CPF) {
        this.CPF = CPF;
    }

    public String getRG() {
        return RG;
    }

    public void setRG(String RG) {
        this.RG = RG;
    }

    public char getSexo() {
        return sexo;
    }

    public void setSexo(char sexo) {
        this.sexo = sexo;
    }

    public String getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(String dataNasc) {
        this.dataNasc = dataNasc;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFone1() {
        return fone1;
    }

    public void setFone1(String fone1) {
        this.fone1 = fone1;
    }

    public String getFone2() {
        return fone2;
    }

    public void setFone2(String fone2) {
        this.fone2 = fone2;
    }

}
