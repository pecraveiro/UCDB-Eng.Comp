# Atividade Avaliativa Grafos
# Aluno: Pedro Muhamad Suleiman Craveiro
# RA: 193934
# Curso: Engenharia de Computação
# Disciplina: Matemática Discreta
# Professor: Hemerson Pistori
# Data de Entrega: 21/11/2023
# Descrição: O projeto consiste na criação de um programa em que o usuário pode importar um grafo e/ou criá-lo a partir do menu interativo que o algoritmo oferece

import networkx as nx
from pyvis.network import Network
import matplotlib.pyplot as plt
import random
import csv
import webbrowser

def criar_grafo():
    grafo = nx.Graph()

    while True:
        vertice = input("Digite um vértice (ou 'fim' para parar): ")
        if vertice.lower() == 'fim':
            break
        elif not vertice:
            print("\nErro: Digite pelo menos 1 caractere para criar um vértice.\n")
            continue
        grafo.add_node(vertice)

    while True:
        aresta = input("Digite no formato VérticeOrigem-VérticeDestino-Peso (Exemplo A-B-3) ou 'fim' para parar: ")
        if aresta.lower() == 'fim':
            break

        if '-' not in aresta:
            print("\nFormato inválido. Certifique-se de usar o formato VérticeOrigem-VérticeDestino-Peso. Por exemplo, A-B-3.\n")
            continue

        vertice1, vertice2, peso = aresta.split('-')

        if grafo.has_edge(vertice1, vertice2):
            print(f"\nA aresta {aresta} já foi digitada. Ela será ignorada.\n")
        elif vertice1 in grafo.nodes() and vertice2 in grafo.nodes():
            grafo.add_edge(vertice1, vertice2, weight=int(peso))
            print(f"\nAresta {aresta} adicionada com sucesso.\n")
        else:
            print("\nErro: Vértices não encontrados. Certifique-se de que ambos os vértices existem no grafo.\n")

    adicionar_remover_vertices_arestas(grafo)  # Chamada da nova função

    return grafo

def adicionar_remover_vertices_arestas(grafo):
    while True:
        print("\nOpções:")
        print("1. Adicionar novo vértice")
        print("2. Remover vértice")
        print("3. Adicionar nova aresta")
        print("4. Remover aresta")
        print("0. Continuar")

        escolha = input("\nEscolha uma opção: ")

        if escolha == "0":
            break
        elif escolha == "1":
            vertice = input("Digite um vértice para adicionar: ")
            grafo.add_node(vertice)
            print(f"\nVértice {vertice} adicionado com sucesso.\n")
        elif escolha == "2":
            vertice = input("Digite um vértice para remover: ")
            if vertice in grafo.nodes():
                grafo.remove_node(vertice)
                print(f"\nVértice {vertice} removido com sucesso.\n")
            else:
                print(f"\nVértice {vertice} não encontrado. Não foi removido.\n")
        elif escolha == "3":
            while True:
                aresta = input("Digite uma aresta no formato VérticeOrigem-VérticeDestino-Peso para adicionar (ou 'fim' para parar): ")

                if aresta.lower() == 'fim':
                    break

                if '-' not in aresta or aresta.count('-') != 2:
                    print("\nFormato inválido. Certifique-se de usar o formato VérticeOrigem-VérticeDestino-Peso. Por exemplo, A-B-3.\n")
                    continue

                vertice1, vertice2, peso = aresta.split('-')

                try:
                    peso = int(peso)
                except ValueError:
                    print("\nPeso inválido. Certifique-se de que o peso é um número.\n")
                    continue

                if grafo.has_edge(vertice1, vertice2):
                    print(f"\nA aresta {aresta} já existe. Ela será ignorada.\n")
                elif vertice1 in grafo.nodes() and vertice2 in grafo.nodes():
                    grafo.add_edge(vertice1, vertice2, weight=peso)
                    print(f"\nAresta {aresta} adicionada com sucesso.\n")
                else:
                    print("\nErro: Vértices não encontrados. Certifique-se de que ambos os vértices existem no grafo.\n")
        elif escolha == "4":
            while True:
                aresta = input("Digite uma aresta no formato VérticeOrigem-VérticeDestino para remover: ")

                if '-' not in aresta or aresta.count('-') != 1:
                    print("\nFormato inválido. Certifique-se de usar o formato VérticeOrigem-VérticeDestino. Por exemplo, A-B.\n")
                    continue

                vertice1, vertice2 = aresta.split('-')

                if grafo.has_edge(vertice1, vertice2):
                    peso = grafo[vertice1][vertice2].get('weight')  # Verifica se a aresta tem peso
                    grafo.remove_edge(vertice1, vertice2)
                    if peso is not None:
                        print(f"\nAresta {aresta} removida com sucesso. Peso: {peso}\n")
                    else:
                        print(f"\nAresta {aresta} removida com sucesso.\n")
                    break
                else:
                    print(f"\nAresta {aresta} não encontrada. Não foi removida.\n")
        else:
            print("Opção inválida. Tente novamente.")


def abrir_arquivo_ou_criar_grafo():
    while True:
        print("\nOpções:")
        print("1. Criar um novo grafo")
        print("2. Abrir um arquivo .txt")
        print("3. Abrir um arquivo .csv")
        print("0. Sair do menu")
        escolha = input("\nEscolha uma opção: ")

        if escolha == "1":
            grafo = criar_grafo()
            return grafo
        elif escolha == "2":
            nome_arquivo = input("Digite o nome do arquivo TXT: ")
            try:
                grafo = carregar_grafo_de_arquivo(nome_arquivo)
                return grafo
            except FileNotFoundError:
                print(f"Arquivo TXT '{nome_arquivo}' não encontrado. Tente novamente. Lembre-se de adicionar a extensão .txt")
        elif escolha == "3":
            nome_arquivo = input("Digite o nome do arquivo CSV: ")
            try:
                grafo = carregar_grafo_de_arquivo(nome_arquivo)
                return grafo
            except FileNotFoundError:
                print(f"Arquivo CSV '{nome_arquivo}' não encontrado. Tente novamente. Lembre-se de adiconar a extensão .csv")
        elif escolha == "0":
            break
        else:
            print("Opção inválida. Tente novamente.\n")

#def carregar_grafo_de_arquivo(nome_arquivo):
#    grafo = nx.Graph()
#    with open(nome_arquivo, 'r') as arquivo:
#        for linha in arquivo:
#            vertice1, vertice2 = linha.strip().split('-')
#            grafo.add_edge(vertice1, vertice2)
#    return grafo

def carregar_grafo_de_arquivo(nome_arquivo):
    grafo = nx.Graph()

    if nome_arquivo.lower().endswith('.txt'):
        with open(nome_arquivo, 'r') as arquivo:
            for linha in arquivo:
                partes = linha.strip().split('-')
                vertice1, vertice2 = partes[0], partes[1]
                peso = int(partes[2]) if len(partes) == 3 else 1  # Se não houver peso, assume 1
                grafo.add_edge(vertice1, vertice2, weight=peso)
    elif nome_arquivo.lower().endswith('.csv'):
        with open(nome_arquivo, 'r') as arquivo:
            leitor_csv = csv.reader(arquivo)
            for linha in leitor_csv:
                vertice1, vertice2 = linha[0], linha[1]
                peso = int(linha[2]) if len(linha) == 3 else 1  # Se não houver peso, assume 1
                grafo.add_edge(vertice1, vertice2, weight=peso)
    else:
        print("\nFormato de arquivo não suportado. Use um arquivo .txt ou .csv.")

    return grafo

# Função não é mais necessária pois agora fazemos tudo em uma função
#def importar_grafo_de_csv(nome_arquivo_csv):
#    grafo = nx.Graph()
#    with open(nome_arquivo_csv, 'r') as arquivo:
#        leitor_csv = csv.reader(arquivo)
#        for linha in leitor_csv:
#            if len(linha) == 2:
#                vertice1, vertice2 = linha
#                peso = 1  # Peso padrão se não houver informação de peso
#                grafo.add_edge(vertice1, vertice2, weight=int(peso))
#            elif len(linha) == 3:
#                vertice1, vertice2, peso = linha
#                grafo.add_edge(vertice1, vertice2, weight=int(peso))
#    return grafo


# def visualizar_grafo(grafo):
#    pos = nx.spring_layout(grafo)
#    nx.draw(grafo, pos, with_labels=True, node_size=500, node_color='lightblue', font_size=10, font_color='black')
#    plt.title("Grafo Criado")
#    plt.show()

def visualizar_grafo(grafo):
    nt = Network(notebook=True)
    
    # Layout personalizado (spring layout neste exemplo)
    pos = nx.spring_layout(grafo)
    for node in grafo.nodes():
        nt.add_node(node, x=pos[node][0] * 100, y=pos[node][1] * 100, color='brown')

    # Adicionando um fundo branco
    nt.bgcolor = "white"

    # Personalizando as arestas
    for edge in grafo.edges(data=True):
        vertice1, vertice2, dados_aresta = edge
        peso = dados_aresta.get('weight', 1)
        color = "green" if peso > 1 else "black"  # Arestas vermelhas para pesos maiores que 1
        nt.add_edge(vertice1, vertice2, label=f"Peso: {peso}", color=color)

    nt.show_buttons(filter_=['physics'])
    #nt.show_buttons(filter_=['nodes'])
    #nt.Network.set_options() #caso queira modificar alguma config

    # Exibindo a visualização
    nt.show("visualizacao_grafo_criado.html")

    # Abrindo a visualização no navegador
    webbrowser.open("visualizacao_grafo_criado.html")

def calcular_numero_cromatico(grafo):
    coloring = nx.coloring.greedy_color(grafo, strategy='largest_first')
    num_colors = max(coloring.values()) + 1
    return num_colors

def calcular_arvore_minima_geradora(grafo):
    print("\nEscolha o algoritmo:")
    print("1. Kruskal")
    print("2. Prim")

    escolha = input("Escolha uma opção: ")

    if escolha == "1":
        arvore_minima = nx.minimum_spanning_tree(grafo, algorithm='kruskal')
    elif escolha == "2":
        arvore_minima = nx.minimum_spanning_tree(grafo, algorithm='prim')
    else:
        print("Opção inválida.")
        return

    visualizar_grafo(arvore_minima)
    print("Árvore Mínima Geradora Calculada.")

def salvar_grafo_em_arquivo(grafo, nome_arquivo):
    if '.' not in nome_arquivo:
        print("\nErro: Nome do arquivo sem extensão. Por favor, inclua a extensão do arquivo (por exemplo novografo.txt).")
        return

    try:
        with open(nome_arquivo, 'w') as arquivo:
            for aresta in grafo.edges(data=True):
                vertice1, vertice2, peso = aresta[0], aresta[1], aresta[2].get('weight', 1)  # Se não houver peso, assume 1
                arquivo.write(f"{vertice1}-{vertice2}-{peso}\n")
        print(f"Grafo salvo em {nome_arquivo}.")
    except Exception as e:
        print(f"\nErro ao salvar o grafo: {str(e)}")


def salvar_grafo_em_csv(grafo, nome_arquivo):
    if '.' not in nome_arquivo:
        print("\nErro: Nome do arquivo sem extensão. Por favor, inclua a extensão do arquivo (por exemplo, novografo.csv).")
        return

    try:
        with open(nome_arquivo, 'w', newline='') as arquivo:
            escritor_csv = csv.writer(arquivo)
            for aresta in grafo.edges(data=True):
                vertice1, vertice2, peso = aresta[0], aresta[1], aresta[2].get('weight', 1)
                escritor_csv.writerow([vertice1, vertice2, peso])
        print(f"O grafo foi salvo com sucesso no arquivo {nome_arquivo}.")
    except Exception as e:
        print(f"\nErro ao salvar o grafo: {str(e)}")


def calcular_grau_maximo_minimo(grafo):
    graus = dict(grafo.degree())
    grau_maximo = max(graus.values())
    grau_minimo = min(graus.values())
    return grau_maximo, grau_minimo

def calcular_raio(grafo):
    try:
        raio = nx.radius(grafo)
        return raio
    except nx.exception.NetworkXError:
        print("O grafo não é conexo.")
        return None

def calcular_diametro(grafo):
    try:
        diametro = nx.diameter(grafo)
        return diametro
    except nx.exception.NetworkXError:
        print("O grafo não é conexo.")
        return None

def calcular_perimetro(grafo):
    try:
        perimetro = len(nx.periphery(grafo))
        return perimetro
    except nx.exception.NetworkXError:
        print("O grafo não é conexo.")
        return None

def propriedades_grafo(grafo):
    while True:
        print("\nOpções de Propriedades do Grafo:\n")

        print("1. Ordem do Grafo")
        print("2. Tamanho do Grafo")
        print("3. Grau Médio do Grafo")
        print("4. Conectividade do Grafo")
        print("5. Bipartição do Grafo")
        print("6. Árvore do Grafo")
        print("7. Número Cromático do Grafo")
        print("8. Grau Máximo e Mínimo do Grafo")
        print("9. Raio, Diâmetro e Perímetro do Grafo")
        print("10. Calcular Árvore Mínima Geradora")

        #Opções de Visualização
        print("\nOpções de Visualização do Grafo:")
        print("11. Visualizar Grafo")
        print("12. Visualizar um novo grafo por arquivo")
        
        #Opções para salvar
        print("\nOpções para Salvar o Grafo:")
        print("13. Salvar grafo em arquivo .txt")
        print("14. Salvar grafo em arquivo .csv")
        
        print("\n0. Sair")
        
        escolha = input("\nEscolha uma opção: ")

        if escolha == "0":
            break
        elif escolha == "1":
            print(f"Ordem do Grafo: {len(grafo.nodes())}")
        elif escolha == "2":
            print(f"Tamanho do Grafo: {len(grafo.edges())}")
        elif escolha == "3":
            grau_medio = sum(dict(grafo.degree()).values()) / len(grafo.nodes())
            print(f"Grau Médio do Grafo: {grau_medio}")
        elif escolha == "4":
            if nx.is_connected(grafo):
                print("O grafo é conexo.")
            else:
                print("O grafo não é conexo.")
        elif escolha == "5":
            if nx.is_bipartite(grafo):
                print("O grafo é bipartido.")
            else:
                print("O grafo não é bipartido.")
        elif escolha == "6":
            if nx.is_tree(grafo):
                print("O grafo é uma árvore.")
            else:
                print("O grafo não é uma árvore.")
        elif escolha == "7":
            num_cromatico = calcular_numero_cromatico(grafo)
            print(f"Número Cromático do Grafo: {num_cromatico}")
        elif escolha == "8":
            grau_maximo, grau_minimo = calcular_grau_maximo_minimo(grafo)
            print(f"Grau Máximo do Grafo: {grau_maximo}")
            print(f"Grau Mínimo do Grafo: {grau_minimo}")
        elif escolha == "9":
            raio = calcular_raio(grafo)
            diametro = calcular_diametro(grafo)
            perimetro = calcular_perimetro(grafo)

            if raio is not None:
                print(f"Raio do Grafo: {raio}")
                print(f"Diâmetro do Grafo: {diametro}")
                print(f"Perímetro do Grafo: {perimetro}")
        elif escolha == "10":
            calcular_arvore_minima_geradora(grafo)
        elif escolha == "11":
            visualizar_grafo(grafo)
        elif escolha == "12":
            nome_arquivo = input("Digite o nome do arquivo e a extensão: ")
            grafo = carregar_grafo_de_arquivo(nome_arquivo)
        elif escolha == "13":
            nome_arquivo = input("Digite o nome do arquivo .txt para salvar o grafo: ")
            salvar_grafo_em_arquivo(grafo, nome_arquivo)
        elif escolha == "14":
            nome_arquivo = input("Digite o nome do arquivo .csv para salvar o grafo: ")
            salvar_grafo_em_csv(grafo, nome_arquivo)
        else:
            print("\nOpção inválida. Tente novamente.")

def main():
    print("\nCriação e Propriedades de um Grafo")
    while True:
        grafo = abrir_arquivo_ou_criar_grafo()
        
        if grafo is None:
            # Usuário escolheu sair do menu
            break

        print("\nGrafo Criado!")

        for vertice, vizinhos in grafo.adjacency():
            if not vizinhos:
                print(f"Vértice {vertice}: Sem arestas.")
            else:
                arestas_info = []
                for vizinho, dados_aresta in vizinhos.items():
                    peso = dados_aresta.get('weight', 1)
                    arestas_info.append(f"{vizinho} (Peso: {peso})")
                arestas_str = ', '.join(arestas_info)
                print(f"Vértice {vertice}: Arestas para {arestas_str}")

        print("\nSelecione as opções no menu:")
        propriedades_grafo(grafo)

if __name__ == "__main__":
    main()
