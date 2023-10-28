# Roteamento de Menor Caminho com NetworkX e Folium

Este é um programa Python que utiliza as bibliotecas NetworkX e Folium para calcular e visualizar o menor caminho entre dois pontos em um mapa da cidade. O programa permite ao usuário escolher entre dois modos de transporte: de carro ou a pé, e calcula o menor caminho com base nas coordenadas dos pontos e nas arestas com pesos. Desenvolvido por [Pedro M. S. Craveiro](https://linkedin.com/in/pecraveiro)

## Requisitos

- Python 3.x
- Bibliotecas: NetworkX, Folium

## Instruções de Uso

1. Execute o programa em seu ambiente Python.

2. O programa solicitará que você escolha o modo de transporte entre "carro" ou "a_pe". Digite sua escolha e pressione Enter.

3. O programa calculará o menor caminho com base no modo de transporte selecionado. A rota será destacada em verde no mapa.

4. O mapa será aberto no navegador Google Chrome, exibindo a rota do menor caminho entre os pontos de partida e destino.

## Exemplo de Uso

Aqui está um exemplo de uso do programa:

1. Execute o programa e escolha o modo de transporte digitando "carro" ou "a_pe".

2. O programa calculará o menor caminho com base no modo de transporte escolhido.

3. O mapa será aberto no Google Chrome, mostrando a rota do menor caminho destacada em verde.

4. Você pode fechar o navegador quando terminar de visualizar a rota.

## Observações

- Certifique-se de ter os requisitos instalados antes de executar o programa.

- Certifique-se de fornecer um caminho absoluto para o executável do Google Chrome (variável `chrome_path`) no código, conforme necessário.

- As coordenadas dos pontos e as arestas com pesos são definidas no código. Você pode personalizá-las de acordo com seu próprio mapa da cidade.

- O programa utiliza a biblioteca Folium para criar o mapa interativo e a biblioteca NetworkX para calcular o menor caminho.

- Este programa é uma demonstração simples de roteamento de menor caminho e pode ser expandido para casos de uso mais complexos.

- Certifique-se de respeitar as leis de trânsito e regulamentos ao usar as rotas geradas pelo programa.

## Considerações Finais

Este programa é uma introdução ao cálculo de rotas de menor caminho com Python e pode ser útil para planejamento de viagens, logística e muito mais. Sinta-se à vontade para personalizar o código e expandi-lo para atender às suas necessidades específicas.

Lembre-se de que este é um exemplo simplificado e que há muitas outras funcionalidades e otimizações possíveis ao lidar com sistemas de roteamento de maior escala.
