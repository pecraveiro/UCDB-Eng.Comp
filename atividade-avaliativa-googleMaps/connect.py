import folium

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

def mostrar_grafo(coordenadas, arestas):
    m = folium.Map(location=list(coordenadas.values())[0], zoom_start=15)

    # Adicione marcadores para todos os pontos
    for node, coords in coordenadas.items():
        folium.Marker(location=coords, popup=node).add_to(m)

    # Adicione linhas para representar as conexões
    for edge in arestas:
        start_node, end_node, _ = edge
        start_coords = coordenadas[start_node]
        end_coords = coordenadas[end_node]
        folium.PolyLine([start_coords, end_coords], color='blue').add_to(m)

    # Exiba o mapa
    m.save('mapa.html')

# Chame a função para exibir o grafo
mostrar_grafo(coordenadas, arestas)