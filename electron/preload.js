const { contextBridge } = require("electron");
const UtilsAPI = require("./api_functions/utils_api.test");
const FirebaseAPI = require("./api_functions/firebase_api");

// Window Application Interface
class MainAPI {
    constructor() {
        this.utilsAPI = new UtilsAPI()
        this.firebaseAPI = new FirebaseAPI()
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
    utils : mainAPI.utilsAPI,
    firebase : mainAPI.firebaseAPI
})