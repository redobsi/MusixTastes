const { app, ipcMain, ipcRenderer, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const loadBalancer = require('electron-load-balancer')

class MainApp {
  constructor() {
    this.createWindow();
    this.listenForAppEvents();
    this.MainRegister();
    this.DestroyRepeatedWindows();
  }

  createWindow() {
    this.window = new BrowserWindow({
    title: 'root',
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      worldSafeExecuteJavaScript: true,
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

  MainRegister() {
    ipcMain.on("TELL_MAIN", (event, args) => {
      console.log(args)
    })
    
    ipcMain.on("FIREBASE_RESULT", (event, args) => {
      console.log(args)
      this.window.webContents.send('BOUNCE_TO_RENDERER', args)
    })
    ipcMain.on('TEST', (event, args) => { console.log(args); })
    // Initialise the balancer
    loadBalancer.register(ipcMain,{
      firebase : '/background_tasks/firebase.html',
      },
      { debug: true })

    console.log('Registred!')
    
  }

  DestroyRepeatedWindows() {
    const allWindows = BrowserWindow.getAllWindows();
    const rendererProcessData = allWindows.map(window => window.webContents);
    //console.log('Renderer Process ', rendererProcessData);

    const processNames = [];
    
    rendererProcessData.forEach(webContents => {
      const processName = webContents.history[0];
      if (processName && processNames.includes(processName)) {
        webContents.destroy();
      } else {
        processNames.push(processName)
      }
    });
    setTimeout(() => this.DestroyRepeatedWindows(), 100); // 4 seconds
  };
}

app.whenReady().then(() => {
  new MainApp();
});