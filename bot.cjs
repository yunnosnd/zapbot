const qrcodeTerminal = require('qrcode-terminal');
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({authStrategy: new LocalAuth()});

client.on('qr', async (qr) => {
    qrcodeTerminal.generate(qr, { small: true });
    qrcode.toBuffer(qr, {
        width: 10,
        height: 10,
        margin: 1,
        color: {
            dark: '#000',  // Cor do primeiro plano
            light: '#fff'  // Cor do fundo
        }
    }, (err, imgBuffer) => {
        if (err) throw err;

        // Salva a imagem em um arquivo
    require('fs').writeFileSync('.wwebjs_auth/qr_code.png', imgBuffer);
    console.log('QR code gerado com sucesso!');
    });

    // Disponibiliza a imagem do QR Code em um link para ser acessado pelo navegador
    const http = require('http');
    const fs = require('fs');
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'image/png'});
        fs.createReadStream('.wwebjs_auth/qr_code.png').pipe(res);
    });
    server.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });

    // Mostra no console o link para acessar o QR Code
    console.log('Acesse o link abaixo para escanear o QR Code:');
    console.log('http://localhost:3000');

    const notifier = require('node-notifier');
    const path = require('path');

    // Função para exibir notificação
    function showNotification(title, message) {
        notifier.notify({
            title: title,
            message: message,
            sound: true, // Som opcional
            wait: true // Espera até que o usuário clique na notificação
        });
    }

    // Exemplo de uso
    showNotification('QR Code Gerado', 'O QR code foi gerado com sucesso e está disponível.');
});

client.on('ready', () => {
    console.log('Bot está rodando')
});

client.on('message', async (msg) => {
    const chatId = msg.from;



    // if (chatId == ""+"@c.us") {
    //     await client.sendMessage(chatId, 'Olá! Eu sou o bot de atendimento da W-Sinos, em que posso te ajudar?');
    //     await client.sendMessage(chatId, '1 - Teste' + '\n' + '2 - Testado' + '\n' + '3 - Atendimento');
    // };

    // Se não for a primeira mensagem do chatid, e for 1, 2 ou 3, ele vai responder


    // if (chatId == ""+"@c.us" && msg.body == '1') {
    //     await client.sendMessage(chatId, 'Teste');
    // }
    // if (chatId == ""+"@c.us" && msg.body == '2') {
    //     await client.sendMessage(chatId, 'Testado');
    // }
    // if (chatId == ""+"@c.us" && msg.body == '3') {
    //     await client.sendMessage(chatId, 'Aguarde um momento, por favor');
    //     console.log('Aqui foi chamado o atendente');
    // }

    // if (chatId == "" && msg.body == 'ping') {
    //     await msg.reply('pong');
    // };
    // if (chatId == "" && msg.body == 'teste') {
    //     await client.sendMessage(chatId, 'Testado');
    // };
});

// Start your client
client.initialize();