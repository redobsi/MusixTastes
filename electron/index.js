const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')
const isDev = require("electron-is-dev")
require('./ipcs_listeners/info_ipcs')

function createWindow () {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  window.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  )
  // Have the DevTools Automatically open when the page load.
  if (isDev) window.webContents.openDevTools();
  

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


