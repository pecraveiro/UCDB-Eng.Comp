import networkx as nx
import folium
import webbrowser
import os
import tkinter as tk
from tkinter import StringVar
import matplotlib.pyplot as plt

# Função para calcular a rota
def calcular_rota():
    modo = modo_var.get()
    
    # Criar o grafo do mapa da cidade (definir vértices e arestas com pesos)
    G = nx.Graph()

    # Coordenadas dos pontos
    coordenadas = {
        "A": (-28.948072281095428, -49.46718892169324),
        "B": (-28.948466591537468, -49.46675038052883),
        "C": (-28.948903517090933, -49.46621602011033),
        "D": (-28.94939101437616, -49.46569708342405),
        "E": (-28.94984986369603, -49.46518880481917),
        "F": (-28.95032207039455, -49.46468106977913),
        "F2": (-28.950789735156714, -49.46421273307969),
        "ZIG": (-28.951300192477735, -49.46390295192927),
        "G": (-28.95180844060886, -49.46576910989996),
        "H": (-28.951894118609413, -49.466091276970985),
        "I": (-28.951325208878238, -49.46757610485367),
        "J": (-28.948684109674616, -49.46799358153102),
        "K": (-28.94910852457134, -49.467535808087014),
        "L": (-28.94956603746688, -49.46707678011572),
        "M": (-28.950033170633233, -49.46654041115865),
        "N": (-28.950476578520092, -49.466039658794976),
        "O": (-28.95098808729393, -49.4655186190252),
        "P": (-28.951401033313637, -49.46505417191324),
        "R": (-28.950484885547223, -49.46705888270427),
        "S": (-28.950745543634785, -49.46694286485144),
    }

    # Adicionar vértices e arestas com pesos
    G.add_nodes_from(coordenadas.keys())

    # Definir pesos para as arestas
    if modo == 'carro':
        arestas = [
            ('A', 'B', 1),
            ('B', 'C', 1),
            ('C', 'D', 1),
            ('D', 'E', 1),
            ('E', 'F', 1),
            ('F', 'F2', 1),
            ('F2', 'ZIG', 1),
            ('ZIG', 'G', 1),
            ('G', 'H', 1),
            ('H', 'I', 1),
            
            ('A', 'J', 4),
            ('J', 'K', 3),
            ('K', 'L', 2),
            ('L', 'M', 2),
            ('M', 'R', 3),
            ('R', 'S', 3),
            ('S', 'I', 2)
        ]
    elif modo == 'a_pe':
        arestas = [
            ('A', 'J', 1),
            ('J', 'K', 1),
            ('K', 'L', 1),
            ('L', 'M', 1),
            ('M', 'R', 1),
            ('R', 'S', 1),
            ('S', 'I', 1),

            ('A', 'B', 3),
            ('B', 'C', 2),
            ('C', 'D', 4),
            ('D', 'E', 4),
            ('E', 'F', 2),
            ('F', 'F2', 3),
            ('F2', 'ZIG', 2),
            ('ZIG', 'G', 3),
            ('G', 'H', 5),
            ('H', 'I', 4)
        ]
    
    G.add_weighted_edges_from(arestas)

    # Encontre o menor caminho entre a sua casa e a UFSC
    ponto_partida = "A"
    ponto_destino = "I"
    caminho_minimo = encontrar_menor_caminho(G, ponto_partida, ponto_destino)

    # Criar um mapa Folium
    m = folium.Map(location=[-28.950, -49.4665], zoom_start=17)

    # Adicionar locais ao mapa
    for node in G.nodes():
        lat, lon = coordenadas[node]
        folium.Marker([lat, lon], tooltip=node).add_to(m)

    # Adicionar a rota do menor caminho ao mapa
    for i in range(len(caminho_minimo) - 1):
        origem = caminho_minimo[i]
        destino = caminho_minimo[i + 1]
        coords = [coordenadas[origem], coordenadas[destino]]
        folium.PolyLine(locations=coords, color='green').add_to(m)

    # Salvar o mapa em um arquivo HTML com caminho absoluto
    map_file = os.path.abspath(f'rota_menor_caminho_{modo}.html')
    m.save(map_file)

    # Abrir o arquivo HTML no Google Chrome
    chrome_path = "C:/Program Files/Google/Chrome/Application/chrome.exe"
    webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(chrome_path))
    webbrowser.get('chrome').open('file://' + map_file, new=2)

# Função para encontrar o menor caminho (BFS personalizado)
def encontrar_menor_caminho(G, origem, destino):
    fila = [(origem, [origem])]
    visitados = set()

    while fila:
        (no, caminho) = fila.pop(0)

        if no not in visitados:
            vizinhos = G[no]
            for vizinho in vizinhos:
                if vizinho == destino:
                    return caminho + [vizinho]
                else:
                    fila.append((vizinho, caminho + [vizinho]))

            visitados.add(no)


def mostrar_grafo_carro():
# Coordenadas dos pontos
    coordenadas = {
        "A": (-28.948072281095428, -49.46718892169324),
        "B": (-28.948466591537468, -49.46675038052883),
        "C": (-28.948903517090933, -49.46621602011033),
        "D": (-28.94939101437616, -49.46569708342405),
        "E": (-28.94984986369603, -49.46518880481917),
        "F": (-28.95032207039455, -49.46468106977913),
        "F2": (-28.950789735156714, -49.46421273307969),
        "ZIG": (-28.951300192477735, -49.46390295192927),
        "G": (-28.95180844060886, -49.46576910989996),
        "H": (-28.951894118609413, -49.466091276970985),
        "I": (-28.951325208878238, -49.46757610485367),
        "J": (-28.948684109674616, -49.46799358153102),
        "K": (-28.94910852457134, -49.467535808087014),
        "L": (-28.94956603746688, -49.46707678011572),
        "M": (-28.950033170633233, -49.46654041115865),
        "N": (-28.950476578520092, -49.466039658794976),
        "O": (-28.95098808729393, -49.4655186190252),
        "P": (-28.951401033313637, -49.46505417191324),
        "R": (-28.950484885547223, -49.46705888270427),
        "S": (-28.950745543634785, -49.46694286485144),
    }

    arestas = [
            ('A', 'B', 1),
            ('B', 'C', 1),
            ('C', 'D', 1),
            ('D', 'E', 1),
            ('E', 'F', 1),
            ('F', 'F2', 1),
            ('F2', 'ZIG', 1),
            ('ZIG', 'G', 1),
            ('G', 'H', 1),
            ('H', 'I', 1),
            
            ('A', 'J', 4),
            ('J', 'K', 3),
            ('K', 'L', 2),
            ('L', 'M', 2),
            ('M', 'R', 3),
            ('R', 'S', 3),
            ('S', 'I', 2)
        ]
    G = nx.Graph()
    G.add_nodes_from(coordenadas.keys())  # Adicione os nós ao grafo

    # Adicione as arestas ao grafo
    for aresta in arestas:
        G.add_edge(aresta[0], aresta[1], weight=aresta[2])

    # Desenhe o grafo usando Matplotlib
    pos = nx.spring_layout(G)  # Posições dos nós
    labels = {node: node for node in G.nodes()}  # Rótulos dos nós
    nx.draw(G, pos, with_labels=True, labels=labels)
    edge_labels = {(aresta[0], aresta[1]): aresta[2] for aresta in arestas}
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)

    plt.show()


def mostrar_grafo_a_pe():
# Coordenadas dos pontos
    coordenadas = {
        "A": (-28.948072281095428, -49.46718892169324),
        "B": (-28.948466591537468, -49.46675038052883),
        "C": (-28.948903517090933, -49.46621602011033),
        "D": (-28.94939101437616, -49.46569708342405),
        "E": (-28.94984986369603, -49.46518880481917),
        "F": (-28.95032207039455, -49.46468106977913),
        "F2": (-28.950789735156714, -49.46421273307969),
        "ZIG": (-28.951300192477735, -49.46390295192927),
        "G": (-28.95180844060886, -49.46576910989996),
        "H": (-28.951894118609413, -49.466091276970985),
        "I": (-28.951325208878238, -49.46757610485367),
        "J": (-28.948684109674616, -49.46799358153102),
        "K": (-28.94910852457134, -49.467535808087014),
        "L": (-28.94956603746688, -49.46707678011572),
        "M": (-28.950033170633233, -49.46654041115865),
        "N": (-28.950476578520092, -49.466039658794976),
        "O": (-28.95098808729393, -49.4655186190252),
        "P": (-28.951401033313637, -49.46505417191324),
        "R": (-28.950484885547223, -49.46705888270427),
        "S": (-28.950745543634785, -49.46694286485144),
    }

    arestas = [
            ('A', 'J', 1),
            ('J', 'K', 1),
            ('K', 'L', 1),
            ('L', 'M', 1),
            ('M', 'R', 1),
            ('R', 'S', 1),
            ('S', 'I', 1),

            ('A', 'B', 3),
            ('B', 'C', 2),
            ('C', 'D', 4),
            ('D', 'E', 4),
            ('E', 'F', 2),
            ('F', 'F2', 3),
            ('F2', 'ZIG', 2),
            ('ZIG', 'G', 3),
            ('G', 'H', 5),
            ('H', 'I', 4)
        ]
    G = nx.Graph()
    G.add_nodes_from(coordenadas.keys())  # Adicione os nós ao grafo

    # Adicione as arestas ao grafo
    for aresta in arestas:
        G.add_edge(aresta[0], aresta[1], weight=aresta[2])

    # Desenhe o grafo usando Matplotlib
    pos = nx.spring_layout(G)  # Posições dos nós
    labels = {node: node for node in G.nodes()}  # Rótulos dos nós
    nx.draw(G, pos, with_labels=True, labels=labels)
    edge_labels = {(aresta[0], aresta[1]): aresta[2] for aresta in arestas}
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)

    plt.show()


# Criação da janela principal
root = tk.Tk()
root.title("Calculadora de Rotas")

# Configurar o tamanho da janela e centralizá-la
largura_janela = 290
altura_janela = 150
largura_tela = root.winfo_screenwidth()
altura_tela = root.winfo_screenheight()
x = (largura_tela - largura_janela) // 2
y = (altura_tela - altura_janela) // 2
root.geometry(f'{largura_janela}x{altura_janela}+{x}+{y}')

# Variável para armazenar o modo de transporte
modo_var = StringVar(value="carro")

# Rótulo de seleção de modo
modo_label = tk.Label(root, text="Selecione o modo de transporte:")
modo_label.pack()

# Botões de seleção de modo
carro_button = tk.Radiobutton(root, text="Carro", variable=modo_var, value="carro")
a_pe_button = tk.Radiobutton(root, text="A pé", variable=modo_var, value="a_pe")
carro_button.pack()
a_pe_button.pack()

# Botão para calcular a rota
calcular_button = tk.Button(root, text="Calcular Rota", command=calcular_rota)
calcular_button.pack()

# Botão para exibir o grafo
mostrar_grafo_carro_button = tk.Button(root, text="Exibir Grafo Rota-Carro", command=mostrar_grafo_carro)
mostrar_grafo_carro_button.pack()

# Botão para exibir o grafo
mostrar_grafo_a_pe_button = tk.Button(root, text="Exibir Grafo Rota-Andando", command=mostrar_grafo_a_pe)
mostrar_grafo_a_pe_button.pack()

# Inicie a interface gráfica
root.mainloop()