const { ipcRenderer } = require("electron");
const loadBalancer = require('electron-load-balancer')

class UtilsAPI {
  constructor() {
    this.processName = 'utils'
    this.tellMain = this.tellMain
  }

  // API Methods
  tellMain(message) {
    ipcRenderer.send("TELL_MAIN", message);
  };
}
  
module.exports = UtilsAPI;