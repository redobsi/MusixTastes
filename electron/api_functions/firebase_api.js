const { ipcRenderer } = require("electron");
const loadBalancer = require('electron-load-balancer')

class FirebaseAPI {
  constructor() {
    this.processName = 'firebase'
    this.getData = this.getData
    // Creates the renderer process
    loadBalancer.start(
      ipcRenderer,
      this.processName,
      {command:'BASIC_GET', data:{}}
    );
  }
  
  getData(data) {
    loadBalancer.sendData(
      ipcRenderer,
      this.processName,
      data
    )
  }
  
}
  
module.exports = FirebaseAPI;