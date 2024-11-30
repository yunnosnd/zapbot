import pkgs from 'whatsapp-web.js';
const { Client, LocalAuth } = pkgs;

const client = new Client({ authStrategy: new LocalAuth() });

export default client;