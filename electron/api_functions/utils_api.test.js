const { ipcRenderer } = require("electron");
const loadBalancer = require('electron-load-balancer')

class UtilsAPI {
  constructor() {
    this.tellMain = this.tellMain
    this.getPassword = this.getPassword
    this.processName = 'utils'
    // Creates the renderer process
    // this.startProcess();
  }
  
  startProcess() {
    loadBalancer.start(
      ipcRenderer,
      this.processName,
      {/* Add data here if there is requirements */}
    );
  }

  stopProcess() {
    loadBalancer.stop(
      ipcRenderer,
      this.processName
    )
  }
  
  // API Methods
  tellMain(message) {
    ipcRenderer.send("tell_main", message);
  };
}
  
module.exports = UtilsAPI;