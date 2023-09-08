const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const io = require('socket.io-client');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.webContents.openDevTools();

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  createWindow();
  const socket = io.connect('http://127.0.0.1:3000'); // Conectarse al servidor WebSocket

  // Resto del código de tu aplicación de Electron, si lo tienes.
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});