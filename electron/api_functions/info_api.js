const { ipcRenderer } = require("electron");

class InfoAPI {
  constructor() {
    this.tellMain = this.tellMain
  }
  // API Methods
  tellMain(message) {
    ipcRenderer.send("tell_main", message);
  };

}
  
module.exports = InfoAPI;