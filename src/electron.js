import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import qrcode from 'qrcode';
import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:8080');
ws.on('open', () => {
    console.log('Electron conectado ao servidor websocket do NodeJS');
});
ws.on('message', (data) => {
    const mensagem = data.toString();
    console.log('Mensagem recebida:', mensagem);
    if (mensagem === 'exit') {
        app.quit();
    }else{
        // Verifica se já existe uma janela aberta e a fecha para abrir uma nova
        if (mainWindow) {
            mainWindow.close();
        }
        createQrWindow(mensagem);
    }
});


let mainWindow;
console.log('Electron started');
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('static/qrWindow.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    Menu.setApplicationMenu(null);
}

function createQrWindow(qrString) {
    qrcode.toDataURL(qrString, {
        width: 10,
        height: 10,
        margin: 1,
        color: {
            dark: '#000',  // Cor do primeiro plano
            light: '#fff'  // Cor do fundo
        }
    }, (err, urlQr) => {
        if (err) throw err;

        app.whenReady().then(() => {
            createWindow();
            mainWindow.webContents.on('did-finish-load', () => {
                mainWindow.webContents.send('qr-code', urlQr);
            });
        });
        app.on('window-all-closed', () => {});
    });
};


