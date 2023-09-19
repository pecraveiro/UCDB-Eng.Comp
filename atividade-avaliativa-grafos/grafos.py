import networkx as nx
import matplotlib.pyplot as plt

def criar_grafo():
    grafo = nx.Graph()
    while True:
        vertice = input("Digite um vértice (ou 'fim' para parar): ")
        if vertice.lower() == 'fim':
            break
        grafo.add_node(vertice)
    
    while True:
        aresta = input("Digite uma aresta no formato 'vértice1-vértice2' (ou 'fim' para parar): ")
        if aresta.lower() == 'fim':
            break
        vertice1, vertice2 = aresta.split('-')
        
        if vertice1 in grafo.nodes() and vertice2 in grafo.nodes():
            grafo.add_edge(vertice1, vertice2)
        else:
            print("Erro: Vértices não encontrados. Certifique-se de que ambos os vértices existem no grafo.")

    return grafo

def visualizar_grafo(grafo):
    pos = nx.spring_layout(grafo)  # Layout para a visualização
    nx.draw(grafo, pos, with_labels=True, node_size=500, node_color='lightblue', font_size=10, font_color='black')
    plt.title("Grafo Criado")
    plt.show()

def main():
    print("Criação e Visualização de um Grafo")
    grafo = criar_grafo()
    
    print("\nGrafo Criado:")
    for vertice in grafo.nodes():
        print(f"Vértice {vertice}")

    visualizar_grafo(grafo)

if __name__ == "__main__":
    main()
