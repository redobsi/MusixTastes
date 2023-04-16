const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const InfoIPC = require('./ipcs_listeners/info_ipcs');


class MainApp {
  constructor() {
    this.createWindow();
    this.listenForAppEvents();
    this.setMainListeners();
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
      },
    });

    const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    this.window.loadURL(url);

    if (isDev) {
      this.window.webContents.openDevTools();
    }
  }

  listenForAppEvents() {
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }

  setMainListeners() {
    // Create the ipcs listeners objects
    this.infoIPC = new InfoIPC();
  }
}

app.whenReady().then(() => {
  new MainApp();
});