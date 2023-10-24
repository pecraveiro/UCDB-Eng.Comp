import os
from telegram import Update
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, ConversationHandler, CallbackContext

# Defina o estado para controle de conversação (neste exemplo, não usamos estados)
UPLOADING = range(1)

# Pasta para armazenar os arquivos
UPLOADS_FOLDER = 'uploads'

# Função para iniciar o bot
def start(update: Update, context: CallbackContext):
    update.message.reply_text("Envie um arquivo CSV ou TXT para que eu o armazene.")

    return UPLOADING

# Função para lidar com o arquivo enviado
def handle_document(update: Update, context: CallbackContext):
    user = update.message.from_user
    file = update.message.document
    file_name = file.file_name
    _, file_extension = os.path.splitext(file_name)
    if file_extension.lower() in ['.csv', '.txt']:
        file = file.get_file()
        file.download(os.path.join(UPLOADS_FOLDER, file_name))

        update.message.reply_text("Arquivo recebido e armazenado com sucesso!")
    else:
        update.message.reply_text("Desculpe, só aceitamos arquivos CSV e TXT.")

def main():
    # Inicialize o bot com seu token
    updater = Updater(token='6649993652:AAFUVW-v5K0HjUaLBkDtQNF5pZAXwyagwS4', use_context=True)
    dispatcher = updater.dispatcher

    # Crie a pasta de uploads se não existir
    os.makedirs(UPLOADS_FOLDER, exist_ok=True)

    # Crie os manipuladores de comandos e mensagens
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            UPLOADING: [MessageHandler(Filters.document, handle_document)]
        },
        fallbacks=[]
    )

    # Adicione o manipulador de conversação ao despachante
    dispatcher.add_handler(conv_handler)

    # Inicie o bot
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()


#6649993652:AAFUVW-v5K0HjUaLBkDtQNF5pZAXwyagwS4