// src/controllers/whatsappController.js
import client from '../services/whatsappClient.js';
import wss from '../services/webSocketService.js';

client.on('qr', (qr) => {
    console.log('QR RECEIVED');
    wss.clients.forEach((client) => {
        client.send(qr);
    });
    console.log('QR code gerado com sucesso!');
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('ready', () => {
    console.log('READY');
    wss.clients.forEach((client) => {
        client.send('exit');
    });
});

export default client;