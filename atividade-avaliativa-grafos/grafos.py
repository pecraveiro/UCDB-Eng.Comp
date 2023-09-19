def criar_grafo():
    grafo = {}
    while True:
        vertice = input("Digite um vértice (ou 'fim' para parar): ")
        if vertice.lower() == 'fim':
            break
        grafo[vertice] = []
    
    while True:
        aresta = input("Digite uma aresta no formato 'vértice1-vértice2' (ou 'fim' para parar): ")
        if aresta.lower() == 'fim':
            break
        vertice1, vertice2 = aresta.split('-')
        
        if vertice1 in grafo and vertice2 in grafo:
            grafo[vertice1].append(vertice2)
            grafo[vertice2].append(vertice1)
        else:
            print("Erro: Vértices não encontrados. Certifique-se de que ambos os vértices existem no grafo.")

    return grafo

def main():
    print("Criação de um Grafo")
    grafo = criar_grafo()
    
    print("\nGrafo Criado:")
    for vertice, vizinhos in grafo.items():
        print(f"Vértice {vertice}: Arestas para {', '.join(vizinhos)}")

if __name__ == "__main__":
    main()
