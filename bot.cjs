const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');


const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot está rodando')
});

client.on('message', async (msg) => {
    const chat = (await msg.getContact()).number;
    const user = chat.number;
    const chatId = msg.from;

    console.log(typeof user);
    console.log(user);

    console.log(chatId);

    if (chatId == "" && msg.body == 'ping') {
        await msg.reply('pong');
    };
    if (chatId == "" && msg.body == 'teste') {
        await client.sendMessage(chatId, 'Testado');
    };

})

// Start your client
client.initialize();