/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modelo;

/**
 *
 * @author ra193934
 */
public class EnderecoM {

    //Atributos da classe
    private String rua;
    private int numero;
    private String bairro;
    private String cidade;
    private String estado;
    private String CEP;
    private String obs;

    public void setRua(String rua) {
        this.rua = rua;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setCEP(String CEP) {
        this.CEP = CEP;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public String getRua() {
        return rua;
    }

    public int getNumero() {
        return numero;
    }

    public String getBairro() {
        return bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }

    public String getCEP() {
        return CEP;
    }

    public String getObs() {
        return obs;
    }

    public EnderecoM(String rua, int numero, String bairro, String cidade, String estado, String CEP, String obs) {
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.CEP = CEP;
        this.obs = obs;
    }

}
