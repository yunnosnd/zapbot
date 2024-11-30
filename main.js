// main.js
import client from './src/controllers/whatsappController.js';
import electronQrWindow from './src/services/electronService.js';

// Inicializa o cliente do WhatsApp Web
client.initialize().catch(async (err) => {
    console.error('Error initializing client:', err);
    const fs = await import('fs');
    fs.rmSync('.wwebjs_auth', { recursive: true, force: true });
    client.initialize();
});
