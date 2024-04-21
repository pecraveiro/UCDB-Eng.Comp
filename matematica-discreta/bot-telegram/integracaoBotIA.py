import os
import logging
from telegram import Update
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import random  # Adicionado para escolher jogada aleatória

# Configuração do bot
TOKEN = "6558791679:AAFGyrigWHwbY8LcF9ydudPxp0fg7ap3UzQ"
MODEL_PATH = "jokenpo/keras_model.h5"

# Configuração do logger
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

# Carregar o modelo Keras
model = load_model(MODEL_PATH)

# Mapeamento das classes de saída do modelo
CLASS_MAP = {
    0: "tesoura",
    1: "papel",
    2: "pedra"
}

# Função para lidar com o comando /start
def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text('Olá! Envie uma imagem de pedra, papel ou tesoura para jogar.')

# Função para lidar com mensagens de imagem
def handle_image(update: Update, context: CallbackContext) -> None:
    # Baixar a imagem
    file_id = update.message.photo[-1].file_id
    new_file = context.bot.get_file(file_id)
    new_file.download('input_image.jpg')
    
    # Chamar a função que utiliza a IA treinada
    result = predict_winner('input_image.jpg')

    # Enviar o resultado de volta ao usuário
    update.message.reply_text(result)

# Função para prever o vencedor usando a IA treinada
def predict_winner(image_path: str) -> str:
    # Carregar a imagem e pré-processá-la para o modelo
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    # Fazer a previsão usando o modelo
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)

    # Obter a jogada prevista
    predicted_move = CLASS_MAP[predicted_class]

    # Lógica para determinar o vencedor
    user_move = image_classification_logic()  # Agora sem argumentos

    # Escolher jogada aleatória para a IA
    ai_move = random.choice(list(CLASS_MAP.values()))

    if user_move == ai_move:
        return f"Empate! Ambos jogaram {user_move}."
    elif (user_move == "pedra" and ai_move == "tesoura") or \
         (user_move == "papel" and ai_move == "pedra") or \
         (user_move == "tesoura" and ai_move == "papel"):
        return f"Você ganhou! A IA jogou {ai_move}."
    else:
        return f"Você perdeu! A IA jogou {ai_move}."

def image_classification_logic() -> str:
    # Escolher jogada aleatória para o usuário
    return random.choice(list(CLASS_MAP.values()))

def main() -> None:
    # Iniciar o bot
    updater = Updater(TOKEN)
    dp = updater.dispatcher

    # Adicionar handlers
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(MessageHandler(Filters.photo, handle_image))

    # Iniciar o bot
    updater.start_polling()

    # Manter o bot em execução até que seja interrompido
    updater.idle()

if __name__ == '__main__':
    main()
