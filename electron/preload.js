const { ipcRenderer, contextBridge } = require("electron");
const InfoAPI = require("./api_functions/info_api")

// Window Application Interface
class MainAPI {
    constructor() {
        this.infoAPI = new InfoAPI()
        
        // Automatically set the listeners
        this.setRenderersListeners();
    }

    setRenderersListeners() {
        // Set the Renderers Listeners
    }
}

const mainAPI = new MainAPI();

// Make the api accessible for the renderers
contextBridge.exposeInMainWorld("api", {
    info : mainAPI.infoAPI
})