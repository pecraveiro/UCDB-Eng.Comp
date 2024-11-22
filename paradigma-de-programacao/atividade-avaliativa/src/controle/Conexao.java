package controle;

import java.sql.*;

public class Conexao {

    // Objeto de COnexão com BD
    private Connection conn;
    // Objeto de Consulta SQL
    static public Statement stmt;
    // Objeto com dados SQL
    private ResultSet res;
    static public ResultSet resultado = null;
    //contador de tuplas
    private int affectRows;

    public Conexao() {
    }

    //Função de Conexão com PostgreSQL via JDBC
    public void ConectaBD() {
        try {
            Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/AtvAvaliativaP1", "postgres", "ucdb");
            System.out.println("Conectado ao PostGreSQL.");
        } catch (Exception e) {
            System.out.println("Falha ao tentar a conexão");
            e.printStackTrace();
        }

        try {
            stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
        } catch (Exception e) {
            System.out.println("Falha no Cursor de Execução");
            e.printStackTrace();
        }

    }

    public Connection getConnection() {
        return conn;
    }

    public Statement getStatement() {
        return stmt;
    }

    public void destroy() {
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
            }
        }
    }

}
