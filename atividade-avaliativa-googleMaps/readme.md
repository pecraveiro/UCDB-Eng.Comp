# Calculadora de Rotas Atividade Avaliativa Google Maps

## Descrição

Este código Python implementa uma calculadora de rotas usando as seguintes bibliotecas:

- **NetworkX:** Manipulação e representação de grafos.
- **Folium:** Criação de mapas interativos para visualização do grafo e da rota.
- **Tkinter:** Criação da interface gráfica.
- **webbrowser:** Abertura de arquivos HTML no navegador.

O sistema permite calcular o menor caminho entre dois pontos em um mapa da cidade, considerando diferentes modos de transporte (carro ou a pé).

## Funcionalidades

- **Cálculo de Rota:** Calcula o menor caminho no grafo, considerando o modo de transporte selecionado.
- **Visualização do Grafo:** Exibe o mapa da cidade como um grafo, mostrando as conexões entre os pontos.

## Estrutura do Código

O código é dividido em três partes principais:

1. **Funções de Cálculo de Rota:**
   - `calcular_rota()`: Calcula o menor caminho no grafo, considerando o modo de transporte selecionado.
   - `encontrar_menor_caminho()`: Implementa uma busca em largura personalizada para encontrar o menor caminho no grafo.

2. **Função de Visualização do Grafo:**
   - `mostrar_grafo()`: Gera um mapa interativo mostrando os pontos e conexões do grafo.

3. **Configuração da Interface Gráfica (Tkinter):**
   - Configuração da janela principal.
   - Seleção do modo de transporte (carro ou a pé) por meio de botões de rádio.
   - Botões para calcular a rota e exibir o grafo.

## Utilização

1. Execute o código em um ambiente Python.
2. Selecione o modo de transporte desejado (carro ou a pé).
3. Clique no botão "Calcular Rota" para encontrar o menor caminho entre dois pontos no mapa.
4. Clique no botão "Exibir Grafo" para visualizar o mapa da cidade como um grafo.

## Requisitos

- Instalar as bibliotecas e dependencias necessárias.

## Observações

- Certifique-se de ter as bibliotecas necessárias instaladas no seu ambiente Python.
- Os pontos no mapa (vértices) e as conexões entre eles (arestas) estão definidos no código e podem ser ajustados conforme necessário.
- O resultado do cálculo da rota é salvo em um arquivo HTML, que é automaticamente aberto no navegador padrão.