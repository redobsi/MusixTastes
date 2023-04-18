const { ipcRenderer } = require("electron");
const loadBalancer = require('electron-load-balancer')

class FirebaseAPI {
  constructor() {
    this.getMusics = this.getMusics
    this.processName = 'firebase'

    // Creates the renderer process
    this.startProcess();
  }
  
  // Possible adds : abstract and inheritance
  startProcess() {
    loadBalancer.start(
      ipcRenderer,
      this.processName,
      {/* Add data here if there is requirements */}
    );
  }

  // API Methods
  getMusics(user_name) {
    // TO ADD: get musics via the background process

  };

  /* -- JUNK CODE --
  
  stopProcess() {
    loadBalancer.stop(
      ipcRenderer,
      this.processName
    )
  }*/

}
  
module.exports = FirebaseAPI;