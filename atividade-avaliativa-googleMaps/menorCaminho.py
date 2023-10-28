import networkx as nx
import folium
import webbrowser
import os

# Função para calcular a rota
def calcular_rota(modo):
    # Criar o grafo do mapa da cidade (definir vértices e arestas com pesos)
    G = nx.Graph()

    # Coordenadas dos pontos
    coordenadas = {
        'Casa': (-28.9477102359545, -49.466776450611256),
        'Av Getúlio': (-28.94813812524216, -49.467274544883075),
        'Rotatória':(-28.951363342389588, -49.463766417736565),
        'Rua Flores de L.': (-28.948675439913085, -49.46798861761248),
        'Rua das Palmas': (-28.950037678817605, -49.46655218374597),
        'Av Cel João Fernandes': (-28.950485578398517, -49.467069377314616),
        'Entrada Faculdade': (-28.95185696149906, -49.46611579560271),
        'Entrada RU': (-28.950711860269706, -49.46688276108761),
        'Entrada Bloco A': (-28.95132400686409, -49.467536960796856)
    }

    # Adicionar vértices e arestas com pesos
    G.add_nodes_from(coordenadas.keys())

    # Definir pesos para as arestas
    if modo == 'carro':
        arestas = [
            ('Casa', 'Av Getúlio', 1),
            ('Av Getúlio', 'Rotatória', 1),
            ('Rotatória', 'Entrada Faculdade', 1),
            ('Entrada Faculdade', 'Entrada Bloco A', 1)
        ]
    elif modo == 'a_pe':
        arestas = [
            ('Casa', 'Av Getúlio', 1),
            ('Av Getúlio', 'Rua Flores de L.', 1),
            ('Rua Flores de L.', 'Rua das Palmas', 1),
            ('Rua das Palmas', 'Av Cel João Fernandes', 1),
            ('Av Cel João Fernandes', 'Entrada RU', 1),
            ('Entrada RU', 'Entrada Bloco A', 1)
        ]

    G.add_weighted_edges_from(arestas)

    # Encontre o menor caminho entre a sua casa e a UFSC
    ponto_partida = 'Casa'
    ponto_destino = 'Entrada Bloco A'
    caminho_minimo = nx.dijkstra_path(G, source=ponto_partida, target=ponto_destino)

    # Criar um mapa Folium
    m = folium.Map(location=[-28.949, -49.466], zoom_start=14)

    # Adicionar locais ao mapa
    for node in G.nodes():
        lat, lon = coordenadas[node]
        folium.Marker([lat, lon], tooltip=node).add_to(m)

    # Adicionar a rota do menor caminho ao mapa
    for i in range(len(caminho_minimo) - 1):
        origem = caminho_minimo[i]
        destino = caminho_minimo[i + 1]
        rota = nx.dijkstra_path(G, source=origem, target=destino)
        coords = [(coordenadas[node][0], coordenadas[node][1]) for node in rota]
        folium.PolyLine(locations=coords, color='green').add_to(m)

    # Salvar o mapa em um arquivo HTML com caminho absoluto
    map_file = os.path.abspath(f'rota_menor_caminho_{modo}.html')
    m.save(map_file)

    # Abrir o arquivo HTML no Google Chrome
    chrome_path = "C:/Program Files/Google/Chrome/Application/chrome.exe"  # Altere o caminho do Chrome conforme necessário
    webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(chrome_path))
    webbrowser.get('chrome').open('file://' + map_file, new=2)

# Perguntar ao usuário o modo de transporte desejado
modo = input("Escolha o modo de transporte (carro ou a_pe): ").lower()
if modo in ['carro', 'a_pe']:
    calcular_rota(modo)
else:
    print("Modo de transporte inválido. Escolha 'carro' ou 'a_pe'.")
