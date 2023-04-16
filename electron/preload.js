const { ipcRenderer, contextBridge } = require("electron");

// Window Application Interface
const WinAPI = {
    tell_main : (message) => ipcRenderer.send("tell_main", message),
}


// Make the api accessible for the renderers
contextBridge.exposeInMainWorld("api", WinAPI)

// Renderers Listeners