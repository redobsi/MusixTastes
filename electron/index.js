const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const loadBalancer = require('electron-load-balancer')
const UtilsIPC = require('./ipcs_listeners/utils_ipcs.test');
const FirebaseIPC = require('./ipcs_listeners/firebase_ipcs')

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
        contextIsolation: true
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
        loadBalancer.stopAll();
        app.quit();

      }
    });
  }

  setMainListeners() {
    // Set up the event listeners objects to bounce between back and UI
    this.firebaseIPC = new FirebaseIPC();
    // exclusively made for testing !
    this.utilsIPC = new UtilsIPC();
    // Initialise the balancer
    loadBalancer.register(
      ipcMain,
      {
      utils : '/background_tasks/utils.html',
      firebase : '/background_tasks/firebase.html'
      },
      { debug: true })

    console.log('Registred!')
  }
}

app.whenReady().then(() => {
  new MainApp();
});