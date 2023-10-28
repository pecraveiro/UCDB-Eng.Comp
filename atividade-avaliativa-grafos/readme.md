

# Criação e Propriedades de um Grafo

Este é um programa Python que permite a criação e manipulação de grafos, bem como a análise de várias propriedades dos mesmos. O programa foi desenvolvido com a utilização das bibliotecas NetworkX, Pyvis, Matplotlib e CSV. A seguir, detalharemos os principais aspectos do programa, suas funcionalidades e como usá-lo. Desenvolvido por [Pedro M. S. Craveiro](https://linkedin.com/in/pecraveiro)

## Introdução

O programa permite a criação de um grafo, a adição e remoção de vértices e arestas, bem como a visualização das propriedades do grafo, como o número de vértices, tamanho, grau médio, conectividade, bipartição, árvore, número cromático, grau máximo e mínimo, raio, diâmetro e perímetro. Além disso, é possível calcular a Árvore Mínima Geradora do grafo e salvar o grafo em arquivos no formato .txt ou .csv.

## Requisitos

- Python 3.x
- Bibliotecas: NetworkX, Pyvis, Matplotlib
- Um navegador da web para visualizar o grafo

## Instruções de Uso

1. Execute o programa em seu ambiente Python.
2. O programa fornecerá um menu principal com as seguintes opções:

    - **1. Criar um novo grafo:** Permite criar um novo grafo, adicionando vértices e arestas manualmente.

    - **2. Abrir um arquivo .txt:** Permite abrir um grafo previamente criado a partir de um arquivo de texto (.txt).

    - **3. Abrir um arquivo .csv:** Permite abrir um grafo previamente criado a partir de um arquivo CSV (.csv).

3. Uma vez que você tenha criado ou aberto um grafo, o programa oferecerá um menu para explorar as propriedades do grafo e realizar ações adicionais. Você pode escolher uma das seguintes opções:

    - **1. Ordem do Grafo:** Exibe o número de vértices no grafo.
    
    - **2. Tamanho do Grafo:** Exibe o número de arestas no grafo.
    
    - **3. Grau Médio do Grafo:** Calcula e exibe o grau médio do grafo.
    
    - **4. Conectividade do Grafo:** Informa se o grafo é conexo ou não.
    
    - **5. Bipartição do Grafo:** Verifica se o grafo é bipartido.
    
    - **6. Árvore do Grafo:** Verifica se o grafo é uma árvore.
    
    - **7. Número Cromático do Grafo:** Calcula e exibe o número cromático do grafo.
    
    - **8. Grau Máximo e Mínimo do Grafo:** Calcula e exibe o grau máximo e mínimo do grafo.
    
    - **9. Raio, Diâmetro e Perímetro do Grafo:** Calcula e exibe o raio, diâmetro e perímetro do grafo, se o grafo for conexo.
    
    - **10. Calcular Árvore Mínima Geradora:** Permite calcular a Árvore Mínima Geradora do grafo.

    - **11. Visualizar Grafo:** Gera uma visualização interativa do grafo no navegador.

    - **12. Visualizar um novo grafo por arquivo:** Permite abrir um novo grafo a partir de um arquivo.

    - **13. Salvar grafo em arquivo .txt:** Salva o grafo atual em um arquivo .txt.

    - **14. Salvar grafo em arquivo .csv:** Salva o grafo atual em um arquivo CSV.

    - **0. Sair:** Fecha o programa.

## Exemplo de Uso

Aqui está um exemplo de uso do programa:

1. Execute o programa e escolha a opção "1. Criar um novo grafo" para criar um grafo manualmente, adicionando vértices e arestas.

2. Explore as propriedades do grafo selecionando as opções no menu de propriedades do grafo (opções de 1 a 10).

3. Para visualizar o grafo, escolha a opção "11. Visualizar Grafo". Isso abrirá uma visualização interativa do grafo em seu navegador padrão.

4. Você pode escolher salvar o grafo em um arquivo .txt ou .csv usando as opções "13. Salvar grafo em arquivo .txt" ou "14. Salvar grafo em arquivo .csv".

5. Ao terminar, escolha a opção "0. Sair" para encerrar o programa.

## Considerações Finais

Este programa oferece uma ampla gama de funcionalidades para a criação, manipulação e análise de grafos. Você pode usá-lo para fins educacionais, análise de redes e muito mais. Certifique-se de ter os requisitos instalados e siga as instruções fornecidas para explorar as funcionalidades do programa.

Lembre-se de que o programa também pode ser usado para abrir e analisar grafos a partir de arquivos existentes, permitindo maior flexibilidade no uso.
